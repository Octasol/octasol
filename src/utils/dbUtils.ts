import { db } from "@/lib/db";
import { GithubDevProfile } from "@/lib/types";

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

export const getDbUser = async (githubId: any) => {
  return db.user.findUnique({
    where: {
      githubId: githubId,
    },
  });
};

export const getUserByUsername = async (githubUsername: any) => {
  return db.user.findUnique({
    where: {
      githubUsername: githubUsername,
    },
  });
};

export const getInstallationId = async (githubId: any) => {
  const user = await getDbUser(githubId);
  return user?.installationId || 0;
};

export const setUsername = async (id: any, username: object) => {
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

export const getGithubDevProfile = async (id: any) => {
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
export const getGithubUsername = async (id: any) => {
  const user = await getDbUser(id);
  return user?.githubUsername || "";
};

export const setHackerrankProfile = async (id: any, profile: any) => {
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

export const getHackerrankProfile = async (id: any) => {
  return db.hackerrankProfile.findUnique({
    where: {
      githubId: id,
    },
  });
};

export const updateTotalPoints = async (id: any) => {
  const hackerrankProfile = await getHackerrankProfile(id);
  const githubDevProfile = await getGithubDevProfile(id);
  const user = await getDbUser(id);
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
