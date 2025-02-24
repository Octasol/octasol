import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getToken } from "@/lib/apiUtils";

export async function GET(req: NextRequest) {
  const token = getToken();

  try {
    const response = await axios.get(
      "https://api.github.com/app/installations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    return NextResponse.json({ installations: response.data });
  } catch (error) {
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
}
