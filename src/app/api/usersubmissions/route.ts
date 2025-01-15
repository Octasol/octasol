import { getUserByAuthHeader } from "@/lib/apiUtils";
import { bigintToString } from "@/lib/utils";
import {
  getSubmissionByIdAndUsername,
  getUserByUsername,
  getUserSubmissions,
} from "@/utils/dbUtils";
import { logToDiscord } from "@/utils/logger";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const url = new URL(req.url);
    const username = url.searchParams.get("username");
    const submissionId = url.searchParams.get("id");

    if (authHeader) {
      const user = await getUserByAuthHeader(authHeader);
      if (!user) {
        return NextResponse.json(
          { error: "Invalid Authorization Header" },
          { status: 401 }
        );
      }

      const userSubmissions = bigintToString(await getUserSubmissions(user.id));

      return NextResponse.json(userSubmissions, { status: 200 });
    } else {
      const user = await getUserByUsername(username as string);
      console.log(user);

      if (submissionId) {
        const userSubmissions = bigintToString(
          await getSubmissionByIdAndUsername(
            parseInt(submissionId),
            username as string
          )
        );
        return NextResponse.json(userSubmissions, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "Submission ID is required" },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
}
