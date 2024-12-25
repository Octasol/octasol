import { getUserByAuthHeader } from "@/lib/apiUtils";
import { adminGithub } from "@/lib/constants";
import { bigintToString } from "@/lib/utils";
import {
  getUnscrowedBounty,
  getUnscrowedBountyById,
  setUnscrowedBounty,
} from "@/utils/dbUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const bountyId = searchParams.get("id");

  if (!bountyId) {
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
  } else {
    try {
      const bounty = bigintToString(
        await getUnscrowedBountyById(parseInt(bountyId))
      );
      return NextResponse.json({ response: bounty }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: (error as any).message },
        { status: 500 }
      );
    }
  }
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json(
      { error: "Authorization header is required" },
      { status: 400 }
    );
  }
  const user = await getUserByAuthHeader(authHeader);
  if (!user) {
    return NextResponse.json(
      { error: "Invalid Authorization Header" },
      { status: 401 }
    );
  }
  // AUTH FOR ADMIN
  if (!adminGithub.includes((user.login as string).toLowerCase())) {
    return NextResponse.json(
      { error: "You are not authorized to perform this action" },
      { status: 401 }
    );
  }
  const { sponsorid, ...profile } = await req.json();
  const bounty = {
    bountyname: profile.bountyname,
    price: profile.price,
    skills: profile.skills,
    time: profile.time,
    contact: profile.contact,
    bountyDescription: profile.bountyDescription,
  };
  try {
    const response = bigintToString(
      await setUnscrowedBounty(sponsorid, bounty)
    );

    return NextResponse.json({
      success: true,
      sponsorid: sponsorid,
      response: response,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as any).message },
      { status: 500 }
    );
  }
}
