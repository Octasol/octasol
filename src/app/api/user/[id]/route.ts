import { bigintToString } from "@/lib/utils";
import { getDbUser } from "@/utils/dbUtils";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const userDbData = bigintToString(await getDbUser(BigInt(id)));
    console.log(userDbData);

    if (!userDbData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(userDbData);
    return NextResponse.json(userDbData);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
