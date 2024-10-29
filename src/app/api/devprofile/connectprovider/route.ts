import { NextRequest, NextResponse } from "next/server";
import { signWithProviderID } from "@/config/reclaim/reclaimService";
import { getHackerrankStats } from "@/config/reclaim/hackerrank/service";
import QRCode from "qrcode";
import { providers } from "@/providers/constants";
import { getGithubIdbyAccessToken } from "@/lib/apiUtils";
import { logToDiscord } from "@/utils/logger";

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username") || "";
  let data = await getHackerrankStats(username);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { userId, providerName } = await req.json();
  const githubId = await getGithubIdbyAccessToken(userId);
  const providerId = providers[providerName];
  try {
    const signedUrl = await signWithProviderID(
      githubId,
      providerId,
      providerName
    );
    const qrCode = await QRCode.toDataURL(signedUrl);
    return NextResponse.json({ success: true, url: signedUrl, qr: qrCode });
  } catch (error) {
    await logToDiscord(`devprofile/connectprovider: ${(error as any).message}`, "ERROR");

    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: (error as any).message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
