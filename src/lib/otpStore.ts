import { db } from "./db";

export const setOtp = async (email: string, otp: string) => {
  const expiresAtNs = Date.now() + 15 * 60 * 1000 * 1_000_000; // Set expiration time to 15 minutes from now in nanoseconds

  const emailOtp = `${otp}-${expiresAtNs}`;

  await db.user.update({
    where: { email },
    data: { emailOtp },
  });

  //   console.log(
  //     `OTP for ${email} set successfully. Expires at ${new Date(
  //       expiresAtNs / 1_000_000
  //     ).toISOString()}`
  //   );
};

export const getOtp = async (email: string): Promise<string | null> => {
  const user = await db.user.findUnique({ where: { email } });

  if (!user || !user.emailOtp) {
    // console.log(`No OTP found for ${email}`);
    return null;
  }

  const [otp, expiresAtNs] = user.emailOtp.split("-");
  const expiresAt = Number(expiresAtNs);

  // Check if the OTP has expired
  if (Date.now() > expiresAt) {
    await db.user.update({
      where: { email },
      data: { emailOtp: null },
    });
    // console.log(`OTP for ${email} has expired and been deleted.`);
    return null;
  }

  //   console.log(`Retrieved OTP for ${email}: ${otp}`);
  return otp;
};

export const deleteOtp = async (email: string) => {
  await db.user.update({
    where: { email },
    data: { emailOtp: null },
  });

  //   console.log(`OTP for ${email} deleted successfully.`);
};
