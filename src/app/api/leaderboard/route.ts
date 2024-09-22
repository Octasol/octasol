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

    return NextResponse.json(serializedProfile);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
