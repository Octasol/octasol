import { db } from "./db";

export const setOtp = async (email: string, otp: string) => {
  const expiresAtNs = Date.now() + 15 * 60 * 1000 * 1_000_000; // Set expiration time to 15 minutes from now in nanoseconds

  const emailOtp = `${otp}-${expiresAtNs}`;

  await db.user.update({
    where: { email },
    data: { emailOtp },
  });

};

export const getOtp = async (email: string): Promise<string | null> => {
  const user = await db.user.findUnique({ where: { email } });

  if (!user || !user.emailOtp) {
    return null;
  }

  const [otp, expiresAtNs] = user.emailOtp.split("-");
  const expiresAt = Number(expiresAtNs);

  if (Date.now() > expiresAt) {
    await db.user.update({
      where: { email },
      data: { emailOtp: null },
    });
    return null;
  }

 
  return otp;
};

export const deleteOtp = async (email: string) => {
  await db.user.update({
    where: { email },
    data: { emailOtp: null },
  });

};
