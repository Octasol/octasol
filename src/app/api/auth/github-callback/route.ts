import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const installationId = searchParams.get('installation_id');

  // You can save this installation ID in your database or perform other actions
  console.log('Installation ID:', installationId);
  // return NextResponse.json({ installationId });
  return NextResponse.redirect(new URL('/dashboard', req.url));
}
