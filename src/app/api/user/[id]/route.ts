import { bigintToString } from "@/lib/utils";
import { getDbUser } from "@/utils/dbUtils";
import { logToDiscord } from "@/utils/logger";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const userDbData = bigintToString(await getDbUser(BigInt(id)));
    if (!userDbData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(userDbData);
  } catch (error) {
    await logToDiscord(`${(error as any).message}`, "ERROR");

    console.error(error);
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
}
