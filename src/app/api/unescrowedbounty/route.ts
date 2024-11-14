import { bigintToString } from "@/lib/utils";
import { getUnscrowedBounty } from "@/utils/dbUtils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const bounties = bigintToString(await getUnscrowedBounty());
    return NextResponse.json({
      bounties: bounties,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as any).message },
      { status: 500 }
    );
  }
}
