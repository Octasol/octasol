import { getGithubIdbyAuthHeader } from "@/lib/apiUtils";
import { deleteOtp, getOtp } from "@/lib/otpStore";
import { getDbUser, setUsername } from "@/utils/dbUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();
  if (!email || !otp) {
    return NextResponse.json(
      { error: "Email and OTP are required" },
      { status: 400 }
    );
  }
  const id = await getGithubIdbyAuthHeader(
    `${req.headers.get("Authorization")}`
  );
  if (!id) {
    return NextResponse.json({ error: "Github ID not found" }, { status: 404 });
  }
  const userDB = await getDbUser(id);
  const storedOtp = getOtp(email);
  if (storedOtp === otp) {
    deleteOtp(email);
    try {
      await setUsername(id, { verifiedEmail: true });
    } catch (error: any) {
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "OTP verified successfully" });
  }
  return NextResponse.json(
    { error: "Invalid OTP. Please try again." },
    { status: 400 }
  );
}
