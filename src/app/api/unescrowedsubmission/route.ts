import { getUserByAuthHeader } from "@/lib/apiUtils";
import { bigintToString } from "@/lib/utils";
import { setBountySubmission } from "@/utils/dbUtils";
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

  const { link, note, wallet, id, githubId } = await req.json();

  try {
    const response = await bigintToString(
      setBountySubmission(link, note, wallet, id, githubId)
    );

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as any).message },
      { status: 500 }
    );
  }
}
