import { db } from "@/lib/db";

export const setUser = async (
  githubId: any,
  installationId: any
): Promise<boolean> => {
  try {
    const iId = await getInstallationId(githubId);
    if (iId !== BigInt(0)) {
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
  return user?.installationId || null;
};
