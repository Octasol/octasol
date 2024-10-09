import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getAccessToken } from "@/lib/apiUtils";

/**
 * 
 * @param req NextRequest
 * @returns Next JSON response
 * @note This function required env variables like GITHUB_PRIVATE_KEY_FILE_NAME & GITHUB_APP_ID
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const installationId = searchParams.get("installationId");

  if (!installationId) {
    return NextResponse.json(
      { error: "Installation ID is required" },
      { status: 400 }
    );
  }

  try {
    
    const accessToken = await getAccessToken(Number(installationId));

    const reposResponse = await axios.get(
      "https://api.github.com/installation/repositories",
      {
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    return NextResponse.json({ repositories: reposResponse.data.repositories });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
