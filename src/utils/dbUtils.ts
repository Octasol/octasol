import { db } from "@/lib/db";

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

export const getUser = async (githubId: any) => {
  return db.user.findUnique({
    where: {
      githubId: githubId,
    },
  });
};

export const getInstallationId = async (githubId: any) => {
  const user = await getUser(githubId);
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
interface GithubDevProfile {
  stars: number;
  forkedRepos: number;
  originalRepos: number;
  forks: number;
  followers: number;
  totalCommits: number;
  repositoriesContributedTo: number;
  pullRequests: number;
  mergedPullRequests: number;
  totalIssues: number;
}

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
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
