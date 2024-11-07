import { db } from "@/lib/db";
import { GithubDevProfile, UserDB } from "@/lib/types";
import { logToDiscord } from "./logger";

export const initializeUser = async (
  githubId: bigint,
  email?: string | null
) => {
  try {
    const existingUser = await db.user.findUnique({
      where: { githubId: githubId },
    });

    let result;
    if (!existingUser) {
      result = await db.user.create({
        data: {
          githubId: githubId,
          installationId: 0,
          ...(email
            ? { email: email, verifiedEmail: true, emails: [email] }
            : {}),
        },
      });

      await logToDiscord(
        `Triggered initializeUser for id: ${githubId}`,
        "INFO"
      );
    } else {
      result = existingUser;
    }
    return true;
  } catch (error) {
    await logToDiscord(
      `dbUtils/initializeUser: ${(error as any).message}`,
      "ERROR"
    );
    console.error(error);
    return false;
  }
};

export const setUser = async (
  githubId: any,
  installationId: any
): Promise<boolean> => {
  try {
    const iId = await getInstallationId(githubId);
    if (iId !== 0) {
      return false;
    }
    await db.user.upsert({
      where: { githubId: githubId },
      update: {
        installationId: installationId,
      },
      create: { githubId: githubId, installationId: installationId },
    });
    return true;
  } catch (error) {
    await logToDiscord(`dbUtils/setUser:${(error as any).message}`, "ERROR");
    console.error(error);
    return false;
  }
};

export const getDbUser = async (githubId: bigint) => {
  return db.user.findUnique({
    where: {
      githubId: githubId,
    },
  });
};

export const getUserByUsername = async (githubUsername: string) => {
  return db.user.findUnique({
    where: {
      githubUsername: githubUsername,
    },
  });
};

export const getInstallationId = async (githubId: bigint) => {
  const user = await getDbUser(githubId);
  return user?.installationId || 0;
};

export const setUsername = async (id: bigint, username: UserDB) => {
  try {
    await db.user.update({
      where: { githubId: id },
      data: {
        ...username,
      },
    });

    await logToDiscord(
      `Updated ${JSON.stringify(username)} for id: ${id}`,
      "INFO"
    );
    return true;
  } catch (error) {
    await logToDiscord(
      `dbUtils/setUsername: ${(error as any).message}`,
      "ERROR"
    );
    console.error(error);
    return false;
  }
};

export const setGithubDevProfile = async (
  id: any,
  profile: GithubDevProfile
) => {
  try {
    const existingProfile = await db.githubDevProfile.findUnique({
      where: { githubId: id },
    });

    if (existingProfile) {
      await db.githubDevProfile.update({
        where: { githubId: id },
        data: {
          ...profile,
        },
      });
    } else {
      await db.githubDevProfile.create({
        data: {
          githubId: id,
          stars: profile.stars,
          forkedRepos: profile.forkedRepos,
          originalRepos: profile.originalRepos,
          forks: profile.forks,
          followers: profile.followers,
          totalCommits: profile.totalCommits,
          repositoriesContributedTo: profile.repositoriesContributedTo,
          pullRequests: profile.pullRequests,
          mergedPullRequests: profile.mergedPullRequests,
          totalIssues: profile.totalIssues,
        },
      });
    }
    await updateTotalPoints(id).then(() => {
      logToDiscord(`Updated Github data for id: ${id}`, "INFO");
    });
    return true;
  } catch (error) {
    await logToDiscord(
      `dbUtils/setGithubDevProfile: ${(error as any).message}`,
      "ERROR"
    );
    console.error(error);
    return false;
  }
};

export const getGithubDevProfile = async (id: bigint) => {
  return db.githubDevProfile.findUnique({
    where: {
      githubId: id,
    },
  });
};

export const getAllGithubDevProfiles = async () => {
  try {
    const profiles = await db.githubDevProfile.findMany({
      include: {
        User: {
          select: {
            githubUsername: true,
          },
        },
      },
    });

    return profiles.map((profile) => ({
      ...profile,
      githubUsername: profile.User?.githubUsername || null,
    }));
  } catch (error) {
    await logToDiscord(
      `dbUtils/getAllGithubDevProfiles: ${(error as any).message}`,
      "ERROR"
    );

    console.error("Error fetching GitHub dev profiles:", error);
    throw error;
  }
};

export const getAllProfiles = async () => {
  try {
    const profiles = await db.user.findMany({
      select: {
        githubUsername: true,
        totalPoints: true,
      },
    });

    return profiles.map((profile) => ({
      ...profile,
    }));
  } catch (error) {
    await logToDiscord(
      `dbUtils/getAllProfiles: ${(error as any).message}`,
      "ERROR"
    );

    console.error("Error fetching profiles:", error);
    throw error;
  }
};

export const getGithubUsername = async (id: bigint) => {
  const user = await getDbUser(BigInt(id));
  return user?.githubUsername || "";
};

/**
 * Note: This function is not used anywhere in the codebase.
 */
export const setHackerrankProfile = async (id: bigint, profile: any) => {
  try {
    await db.hackerrankProfile.upsert({
      where: { githubId: id },
      update: {
        ...profile,
      },
      create: {
        githubId: id,
        ...profile,
      },
    });
    await updateTotalPoints(id).then(() => {
      logToDiscord(`Updated Hackerrank data for id: ${id}`, "INFO");
    });
    return true;
  } catch (error) {
    await logToDiscord(
      `dbUtils/setHackerrankProfile: ${(error as any).message}`,
      "ERROR"
    );
    console.error(error);
    return false;
  }
};

export const setUnscrowedBounty = async (id: bigint, bounty: any) => {
  try {
    await db.unescrowed.upsert({
      where: { githubId: id },
      update: {
        ...bounty,
      },
      create: {
        githubId: id,
        ...bounty,
      },
    });
    return true;
  } catch (error) {
    await logToDiscord(
      `dbUtils/setUnscrowedBounty: ${(error as any).message}`,
      "ERROR"
    );
    console.error(error);
    return false;
  }
};

export const getHackerrankProfile = async (id: bigint) => {
  return db.hackerrankProfile.findUnique({
    where: {
      githubId: id,
    },
  });
};

export const getGFGProfile = async (id: bigint) => {
  return db.gFGProfile.findUnique({
    where: {
      githubId: id,
    },
  });
};

export const getCodeChefProfile = async (id: bigint) => {
  return db.codeChefProfile.findUnique({
    where: {
      githubId: id,
    },
  });
};

export const getLeetcodeProfile = async (id: bigint) => {
  return db.leetcodeProfile.findUnique({
    where: {
      githubId: id,
    },
  });
};

export const getSuperteamEarnProfile = async (id: bigint) => {
  return db.superteamEarnProfile.findUnique({
    where: {
      githubId: id,
    },
  });
};

export const updateTotalPoints = async (id: bigint) => {
  await logToDiscord(`Updating total points initialized for id: ${id}`, "INFO");
  const hackerrankProfile = await getHackerrankProfile(id);
  const githubDevProfile = await getGithubDevProfile(id);
  const gfgProfile = await getGFGProfile(id);
  const codeChefProfile = await getCodeChefProfile(id);
  const leetcodeProfile = await getLeetcodeProfile(id);
  const superteamEarnProfile = await getSuperteamEarnProfile(id);
  const user = await getDbUser(BigInt(id));
  let totalPoints = 0;

  if (hackerrankProfile) {
    totalPoints += hackerrankProfile.currentPoints;
    totalPoints += hackerrankProfile.stars * 100;
  }

  if (githubDevProfile) {
    totalPoints += githubDevProfile.stars * 100;
    totalPoints += githubDevProfile.forks * 50;
    totalPoints += githubDevProfile.originalRepos * 50;
    totalPoints += githubDevProfile.followers * 50;
    totalPoints += githubDevProfile.totalCommits * 10;
    totalPoints += githubDevProfile.repositoriesContributedTo * 20;
    totalPoints += githubDevProfile.pullRequests * 20;
    totalPoints += githubDevProfile.mergedPullRequests * 50;
    totalPoints += githubDevProfile.totalIssues * 10;
  }

  if (gfgProfile) {
    totalPoints += gfgProfile.score;
    totalPoints += gfgProfile.problemsSolved * 10;
  }

  if (codeChefProfile) {
    totalPoints += codeChefProfile.currentRating;
  }

  if (leetcodeProfile) {
    totalPoints += leetcodeProfile.easyQues * 10;
    totalPoints += leetcodeProfile.mediumQues * 30;
    totalPoints += leetcodeProfile.hardQues * 50;
  }

  if (superteamEarnProfile) {
    totalPoints += superteamEarnProfile.participations * 10;
    totalPoints += superteamEarnProfile.wins * 100;
    totalPoints += superteamEarnProfile.totalWinnings * 2;
  }

  if (totalPoints == user?.totalPoints) {
    await logToDiscord(
      `Total points (${totalPoints}) already up to date for id: ${id}`,
      "INFO"
    );
    return false;
  }

  await logToDiscord(`Updating total points triggered for id: ${id}`, "INFO");

  return await db.user.update({
    where: { githubId: id },
    data: {
      totalPoints: totalPoints,
    },
  });
};

export async function getUserByEmail(email: string) {
  return db.user.findFirst({
    where: {
      email: email,
    },
  });
}

export async function setHackerrankDatabyGithubId(
  githubId: any,
  currentPoints: number,
  stars: number
) {
  try {
    await db.hackerrankProfile.upsert({
      where: { githubId: githubId },
      update: {
        currentPoints: currentPoints,
        stars: stars,
      },
      create: {
        githubId: githubId,
        currentPoints: currentPoints,
        stars: stars,
      },
    });
    await updateTotalPoints(githubId).then(() => {
      logToDiscord(`Updated Hackerrank data for id: ${githubId}`, "INFO");
    });
    return true;
  } catch (error) {
    await logToDiscord(
      `dbUtils/setHackerrankDatabyGithubId: ${(error as any).message}`,
      "ERROR"
    );
    console.error(error);
    return false;
  }
}

export async function setGFGDatabyGithubId(
  githubId: any,
  score: number,
  problemsSolved: number
) {
  try {
    await db.gFGProfile.upsert({
      where: { githubId: githubId },
      update: {
        score: score,
        problemsSolved: problemsSolved,
      },
      create: {
        githubId: githubId,
        score: score,
        problemsSolved: problemsSolved,
      },
    });
    await updateTotalPoints(githubId).then(() => {
      logToDiscord(`Updated GFG data for id: ${githubId}`, "INFO");
    });
    return true;
  } catch (error) {
    await logToDiscord(
      `dbUtils/setGFGDatabyGithubId: ${(error as any).message}`,
      "ERROR"
    );
    console.error(error);
    return false;
  }
}

export async function setCodeChefDatabyGithubId(
  githubId: any,
  currentRating: number
) {
  try {
    await db.codeChefProfile.upsert({
      where: { githubId: githubId },
      update: {
        currentRating: currentRating,
      },
      create: {
        githubId: githubId,
        currentRating: currentRating,
      },
    });
    await updateTotalPoints(githubId).then(() => {
      logToDiscord(`Updated Codechef data for id: ${githubId}`, "INFO");
    });
    return true;
  } catch (error) {
    await logToDiscord(
      `dbUtils/setCodeChefDatabyGithubId: ${(error as any).message}`,
      "ERROR"
    );
    console.error(error);
    return false;
  }
}

export async function setLeetCodeDatabyGithubId(
  githubId: any,
  easyQues: number,
  mediumQues: number,
  hardQues: number
) {
  try {
    await db.leetcodeProfile.upsert({
      where: { githubId: githubId },
      update: {
        easyQues: easyQues,
        mediumQues: mediumQues,
        hardQues: hardQues,
      },
      create: {
        githubId: githubId,
        easyQues: easyQues,
        mediumQues: mediumQues,
        hardQues: hardQues,
      },
    });
    await updateTotalPoints(githubId).then(() => {
      logToDiscord(`Updated Leetcode data for id: ${githubId}`, "INFO");
    });
    return true;
  } catch (error) {
    await logToDiscord(
      `dbUtils/setLeetCodeDatabyGithubId: ${(error as any).message}`,
      "ERROR"
    );
    console.error(error);
    return false;
  }
}

export async function setSuperteamEarnDatabyGithubId(
  githubId: any,
  participations: number,
  wins: number,
  totalWinnings: number
) {
  try {
    await db.superteamEarnProfile.upsert({
      where: { githubId: githubId },
      update: {
        participations: participations,
        wins: wins,
        totalWinnings: totalWinnings,
      },
      create: {
        githubId: githubId,
        participations: participations,
        wins: wins,
        totalWinnings: totalWinnings,
      },
    });
    await updateTotalPoints(githubId).then(() => {
      logToDiscord(`Updated Superteam Earn data for id: ${githubId}`, "INFO");
    });
    return true;
  } catch (error) {
    await logToDiscord(
      `dbUtils/setSuperteamEarnDatabyGithubId: ${(error as any).message}`,
      "ERROR"
    );
    console.error(error);
    return false;
  }
}

export const getUserProfileForRadarChart = async (githubUsername: string) => {
  try {
    const user = await db.user.findUnique({
      where: { githubUsername },
      select: {
        githubUsername: true,
        GithubDevProfile: true,
        HackerrankProfile: true,
        GFGProfile: true,
        CodeChefProfile: true,
        LeetcodeProfile: true,
        SuperteamEarnProfile: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    let githubPoints = 0;
    let hackerrankPoints = 0;
    let gfgPoints = 0;
    let codechefPoints = 0;
    let leetcodePoints = 0;
    let superteamEarnPoints = 0;

    const {
      GithubDevProfile,
      HackerrankProfile,
      GFGProfile,
      CodeChefProfile,
      LeetcodeProfile,
      SuperteamEarnProfile,
    } = user;

    if (HackerrankProfile) {
      hackerrankPoints += HackerrankProfile.currentPoints;
      hackerrankPoints += HackerrankProfile.stars * 100;
    }

    if (GithubDevProfile) {
      githubPoints += GithubDevProfile.stars * 100;
      githubPoints += GithubDevProfile.forks * 50;
      githubPoints += GithubDevProfile.originalRepos * 50;
      githubPoints += GithubDevProfile.followers * 50;
      githubPoints += GithubDevProfile.totalCommits * 10;
      githubPoints += GithubDevProfile.repositoriesContributedTo * 20;
      githubPoints += GithubDevProfile.pullRequests * 20;
      githubPoints += GithubDevProfile.mergedPullRequests * 50;
      githubPoints += GithubDevProfile.totalIssues * 10;
    }

    if (GFGProfile) {
      gfgPoints += GFGProfile.score;
      gfgPoints += GFGProfile.problemsSolved * 10;
    }

    if (CodeChefProfile) {
      codechefPoints += CodeChefProfile.currentRating;
    }

    if (LeetcodeProfile) {
      leetcodePoints += LeetcodeProfile.easyQues * 10;
      leetcodePoints += LeetcodeProfile.mediumQues * 30;
      leetcodePoints += LeetcodeProfile.hardQues * 50;
    }

    if (SuperteamEarnProfile) {
      superteamEarnPoints += SuperteamEarnProfile.participations * 10;
      superteamEarnPoints += SuperteamEarnProfile.wins * 100;
      superteamEarnPoints += SuperteamEarnProfile.totalWinnings * 2;
    }

    return {
      githubUsername: user.githubUsername,
      githubPoints,
      hackerrankPoints,
      gfgPoints,
      codechefPoints,
      leetcodePoints,
      superteamEarnPoints,
    };
  } catch (error) {
    await logToDiscord(
      `dbUtils/getUserProfileForRadarChart: ${(error as any).message}`,
      "ERROR"
    );

    console.error("Error fetching user profile for radar chart:", error);
    throw error;
  }
};
