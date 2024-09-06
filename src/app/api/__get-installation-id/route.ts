import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const sessionAccessToken = data.accessToken;

    return NextResponse.json({sessionAccessToken})
}