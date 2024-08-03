import { getGithubIdbyAuthHeader } from "@/lib/apiUtils";
import { sendMail } from "@/lib/nodemailer";
import { setOtp } from "@/lib/otpStore";
import { getDbUser, setUsername } from "@/utils/dbUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  const id = await getGithubIdbyAuthHeader(
    `${req.headers.get("Authorization")}`
  );
  const userDB = await getDbUser(id);
  try {
    if (!userDB?.emails)
      await setUsername(id, { emails: [email], email: email });
    else if (!userDB?.emails.includes(email))
      await setUsername(id, {
        emails: [...userDB.emails, email],
        email: email,
      });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  if (!id) {
    return NextResponse.json({ error: "Github ID not found" }, { status: 404 });
  }
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  setOtp(email, otp);
  await sendMail(
    email,
    "Your Octasol OTP Code",
    `Your OTP code is ${otp}\nValid for 5 minutes`
  );
  return NextResponse.json({ message: "OTP sent successfully" });
}
