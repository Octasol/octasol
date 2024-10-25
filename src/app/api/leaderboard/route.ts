import { NextRequest, NextResponse } from "next/server";
import { getAllProfiles } from "@/utils/dbUtils";
import { unstable_noStore as noStore } from "next/cache";
import { logToDiscord } from "@/utils/logger";

export async function POST(req: NextRequest) {
  try {
    const allProfiles = await getAllProfiles();
    if (!allProfiles) {
      return NextResponse.json(
        { error: "Profiles not found" },
        { status: 404 }
      );
    }

    const serializedProfile = allProfiles.sort(
      (prev: any, next: any) => next.totalPoints - prev.totalPoints
    );

    // Set caching headers to prevent caching
    const response = NextResponse.json(serializedProfile);
    return response;
  } catch (error) {
    await logToDiscord(`${(error as any).message}`, "ERROR");

    console.error(error);
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
}
