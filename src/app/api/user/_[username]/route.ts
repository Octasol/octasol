import { bigintToString } from "@/lib/utils";
import { getUserByUsername } from "@/utils/dbUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const username = req.url.split("/api/user/")[1];
    const userDbData = bigintToString(await getUserByUsername(username));
    if (!userDbData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const { githubId, githubUsername } = userDbData;

    return NextResponse.json(userDbData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
}
