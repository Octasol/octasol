import { getUserByAuthHeader } from "@/lib/apiUtils";
import { adminGithub } from "@/lib/constants";
import { bigintToString } from "@/lib/utils";
import { getSponsorProfile, setSponsorProfile } from "@/utils/dbUtils";
import { NextRequest, NextResponse } from "next/server";

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
  const { userId, ...profile } = await req.json();
  const sponsor = profile;
  try {
    const response = bigintToString(await setSponsorProfile(userId, sponsor));

    return NextResponse.json({
      success: true,
      userId: userId,
      response: response,
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
