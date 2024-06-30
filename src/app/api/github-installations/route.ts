import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getToken } from "../lib/utils";

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
    // console.log(response.data);
    return NextResponse.json({ installations: response.data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
