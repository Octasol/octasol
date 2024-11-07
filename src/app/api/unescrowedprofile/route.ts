import { setUnscrowedBounty } from "@/utils/dbUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, ...profile } = await req.json();
  const bounty = profile;
  try {
    const status = await setUnscrowedBounty(userId, bounty);
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
