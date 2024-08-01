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

export const setGithubUsername = async (id: any, username: any) => {
  try {
    await db.user.update({
      where: { githubId: id },
      data: {
        githubUsername: username,
      },
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
