import { NextRequest, NextResponse } from "next/server";
import { getAllProfiles } from "@/utils/dbUtils";

export async function GET() {
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
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
