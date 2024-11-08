import { getGithubIdbyAuthHeader } from "@/lib/apiUtils";
import { sendMail } from "@/lib/nodemailer";
import { setOtp } from "@/lib/otpStore";
import { getDbUser, setUsername, getUserByEmail } from "@/utils/dbUtils";
import { logToDiscord } from "@/utils/logger";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const id = await getGithubIdbyAuthHeader(
    `${req.headers.get("Authorization")}`
  );

  if (!id) {
    return NextResponse.json({ error: "Github ID not found" }, { status: 404 });
  }

  try {
    // Check if the email is associated with another account
    const existingUser = await getUserByEmail(email);
    if (
      existingUser &&
      existingUser.githubId !== id &&
      existingUser.verifiedEmail
    ) {
      return NextResponse.json(
        { error: "Email is already associated with another account" },
        { status: 400 }
      );
    }

    const userDB = await getDbUser(BigInt(id));

    if (!userDB?.emails) {
      await setUsername(id, { emails: [email], email: email });
    } else if (!userDB?.emails.includes(email)) {
      await setUsername(id, {
        emails: [...userDB.emails, email],
        email: email,
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    await setOtp(email, otp);
    const otpPlaceholders = {
      name: "Octopod 👋",
      OTP: otp,
    };

    await sendMail(email, "Your Octasol OTP Code", otpPlaceholders);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    await logToDiscord(`send-otp for ${id}: ${(error as any).message}`, "ERROR");

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
