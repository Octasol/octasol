import { bigintToString } from "@/lib/utils";
import { getUserProfileForRadarChart } from "@/utils/dbUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const githubUsername = searchParams.get("username");

    if (!githubUsername) {
      return NextResponse.json(
        { error: "GitHub username not provided" },
        { status: 400 }
      );
    }

    const radarData = await getUserProfileForRadarChart(githubUsername);

    if (!radarData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(bigintToString(radarData));
  } catch (error) {
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
}
