type OtpEntry = {
  otp: string;
  timeoutId: NodeJS.Timeout;
};

const otps: { [key: string]: OtpEntry } = {};

export const setOtp = (email: string, otp: string) => {
  // Clear any existing timeout for this email
  if (otps[email]) {
    clearTimeout(otps[email].timeoutId);
  }

  // Set a new timeout to delete the OTP after 5 minutes (300,000 ms)
  const timeoutId = setTimeout(() => {
    delete otps[email];
    console.log(`OTP for ${email} has expired and been deleted.`);
  }, 3 * 60 * 1000); // 5 minutes

  otps[email] = { otp, timeoutId };
};

export const getOtp = (email: string) => {
  return otps[email]?.otp;
};

export const deleteOtp = (email: string) => {
  if (otps[email]) {
    clearTimeout(otps[email].timeoutId);
    delete otps[email];
  }
};
