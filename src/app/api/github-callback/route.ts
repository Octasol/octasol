import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const installationId = searchParams.get('installation_id');

  // You can save this installation ID in your database or perform other actions

  return NextResponse.json({ installationId });
}
