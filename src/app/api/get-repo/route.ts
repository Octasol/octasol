import { NextRequest, NextResponse } from "next/server";

interface RequestData {
  repo: string;
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello World" });
}


export async function POST(req: NextRequest) {
  const data: RequestData = await req.json();
  const repoName: String = data.repo;

  console.log(data);
  return NextResponse.json({ message: `Hello ${repoName}` });
}
