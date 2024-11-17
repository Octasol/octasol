import { getUserByAuthHeader } from "@/lib/apiUtils";
import { bigintToString } from "@/lib/utils";
import { getUnscrowedBounty, setUnscrowedBounty } from "@/utils/dbUtils";
import { NextRequest, NextResponse } from "next/server";

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
    console.log("response", response);

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
