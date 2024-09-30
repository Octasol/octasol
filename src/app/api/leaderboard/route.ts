import { NextRequest, NextResponse } from "next/server";
import { getAllProfiles } from "@/utils/dbUtils";
import { unstable_noStore as noStore } from "next/cache";

export async function GET(req: NextRequest) {
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
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
