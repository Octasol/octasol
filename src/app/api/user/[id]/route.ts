import { bigintToString } from "@/lib/utils";
import { getDbUser } from "@/utils/dbUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const username = req.url.split("/api/user/")[1];

    const userDbData = bigintToString(await getDbUser(username));
    if (!userDbData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log(userDbData);

    return NextResponse.json(userDbData);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
