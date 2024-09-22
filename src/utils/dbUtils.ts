import { db } from "@/lib/db";
import { GithubDevProfile, UserDB } from "@/lib/types";

export const initializeUser = async (githubId: bigint) => {
  try {
    await db.user.upsert({
      where: { githubId: githubId },
      update: {},
      create: { githubId: githubId, installationId: 0 },
    });
    return true;
  } catch (err) {
    console.error(err);
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
  } catch (err) {
    console.error(err);
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
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const setGithubDevProfile = async (
  id: any,
  profile: GithubDevProfile
) => {
  try {
    await db.githubDevProfile.upsert({
      where: { githubId: id },
      update: {
        ...profile,
      },
      create: {
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
    updateTotalPoints(id);
    return true;
  } catch (err) {
    console.error(err);
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
    console.error("Error fetching profiles:", error);
    throw error;
  }
};

export const getGithubUsername = async (id: bigint) => {
  const user = await getDbUser(BigInt(id));
  return user?.githubUsername || "";
};

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
    updateTotalPoints(id);
    return true;
  } catch (err) {
    console.error(err);
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

export const updateTotalPoints = async (id: bigint) => {
  const hackerrankProfile = await getHackerrankProfile(id);
  const githubDevProfile = await getGithubDevProfile(id);
  const gfgProfile = await getGFGProfile(id);
  const codeChefProfile = await getCodeChefProfile(id);
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

  if (user?.totalPoints && totalPoints == user.totalPoints) {
    return false;
  }

  await db.user.update({
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
    updateTotalPoints(githubId);
    return true;
  } catch (err) {
    console.error(err);
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
    updateTotalPoints(githubId);
    return true;
  } catch (err) {
    console.error(err);
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
    updateTotalPoints(githubId);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
