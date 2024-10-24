import { getHackerrankStats } from "@/config/reclaim/hackerrank/service";
import { getGithubIdbyAuthHeader } from "@/lib/apiUtils";
import { bigintToString } from "@/lib/utils";
import {
  getCodeChefProfile,
  getDbUser,
  getGFGProfile,
  getGithubDevProfile,
  getLeetcodeProfile,
  getSuperteamEarnProfile,
  getUserByUsername,
} from "@/utils/dbUtils";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header is required" },
        { status: 400 }
      );
    }
    const id = await getGithubIdbyAuthHeader(authHeader);
    if (!id) {
      return NextResponse.json(
        { error: "Github ID not found" },
        { status: 404 }
      );
    }
    const userDbData = bigintToString(await getDbUser(BigInt(id)));
    if (!userDbData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({
      verifiedEmail: userDbData.verifiedEmail,
      githubId: userDbData.githubId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();
    const userDbData = bigintToString(await getUserByUsername(username));
    if (!userDbData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const githubDevProfile = bigintToString(
      await getGithubDevProfile(BigInt(userDbData.githubId))
    );
    const hackerrankProfile = await getHackerrankStats(
      userDbData.hackerrankUsername
    );
    const gfgProfile = bigintToString(
      await getGFGProfile(BigInt(userDbData.githubId))
    );
    const codechefProfile = bigintToString(
      await getCodeChefProfile(BigInt(userDbData.githubId))
    );
    const leetcodeProfile = bigintToString(
      await getLeetcodeProfile(BigInt(userDbData.githubId))
    );
    const superteamEarnProfile = bigintToString(
      await getSuperteamEarnProfile(BigInt(userDbData.githubId))
    );
    const data = {
      user: userDbData,
      github: githubDevProfile,
      hackerrank: hackerrankProfile,
      gfg: gfgProfile,
      codechef: codechefProfile,
      leetcodeProfile: leetcodeProfile,
      superteamEarnProfile: superteamEarnProfile,
    };
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
}
