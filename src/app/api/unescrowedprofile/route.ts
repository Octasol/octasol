import { bigintToString } from "@/lib/utils";
import { getSponsorProfile, setUnscrowedBounty } from "@/utils/dbUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, ...profile } = await req.json();
  const sponsor = profile;
  try {
    const status = await setUnscrowedBounty(userId, sponsor);
    console.log("status", status);

    return NextResponse.json({
      success: true,
      userId: userId,
      profile: profile,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as any).message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    console.log("userId", userId);
    if (userId !== "") {
      const sponsor = bigintToString(await getSponsorProfile(userId as any));
      console.log("sponsor", sponsor);

      return NextResponse.json({
        success: true,
        userId: userId,
        sponsor: sponsor,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as any).message },
      { status: 500 }
    );
  }
}
