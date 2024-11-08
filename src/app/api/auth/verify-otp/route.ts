import { getGithubIdbyAuthHeader } from "@/lib/apiUtils";
import { deleteOtp, getOtp } from "@/lib/otpStore";
import { getDbUser, setUsername } from "@/utils/dbUtils";
import { logToDiscord } from "@/utils/logger";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json(
      { error: "Both email and OTP are required." },
      { status: 400 }
    );
  }

  const id = await getGithubIdbyAuthHeader(
    `${req.headers.get("Authorization")}`
  );

  if (!id) {
    return NextResponse.json({ error: "Github ID not found" }, { status: 404 });
  }

  const userDB = await getDbUser(BigInt(id));
  if (!userDB) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const storedOtp = await getOtp(email);

  if (!storedOtp) {
    return NextResponse.json(
      { error: "No OTP found for this email" },
      { status: 400 }
    );
  }

  if (storedOtp === otp) {
    // Check if OTP is valid and not expired
    deleteOtp(email);

    try {
      await setUsername(id, { verifiedEmail: true, email: email });
    } catch (error) {
      await logToDiscord(`verify-otp for ${id}: ${(error as any).message}`, "ERROR");

      return NextResponse.json(
        { error: "Failed to update user status." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "OTP verified successfully" });
  }

  return NextResponse.json(
    { error: "Invalid or expired OTP. Please try again." },
    { status: 400 }
  );
}
