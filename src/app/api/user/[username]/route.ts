import { getUser } from "@/utils/dbUtils";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const data = req.url.split("/api/user/")[1];
    const user = await getUser(data);
    console.log(user);

    return NextResponse.json({ req: data });
  } catch (e) {
    console.log(e);
  }
}
