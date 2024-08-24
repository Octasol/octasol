import { getGithubIdbyAuthHeader } from "@/lib/apiUtils";
import { bigintToString } from "@/lib/utils";
import { getDbUser } from "@/utils/dbUtils";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header is required" },
        { status: 400 }
      );
    }
    const id = await getGithubIdbyAuthHeader(authHeader);
    if (!id) {
      return NextResponse.json(
        { error: "Github ID not found" },
        { status: 404 }
      );
    }
    const userDbData = bigintToString(await getDbUser(BigInt(id)));
    if (!userDbData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({
      verifiedEmail: userDbData.verifiedEmail,
      githubId: userDbData.githubId,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
