import { getUserByAuthHeader } from "@/lib/apiUtils";
import { bigintToString } from "@/lib/utils";
import { getUserSubmissions } from "@/utils/dbUtils";
import { logToDiscord } from "@/utils/logger";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
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

    // console.log("User", user);

    const userSubmissions = bigintToString(
      await getUserSubmissions(user.githubId)
    );

    return NextResponse.json(userSubmissions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
}
