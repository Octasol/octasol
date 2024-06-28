import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { sign } from 'jsonwebtoken';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const privateKey = readFileSync(process.env.GITHUB_PRIVATE_KEY_PATH as string);
  const appId = process.env.GITHUB_APP_ID as string;

  const payload = { iss: appId };
  const token = sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '10m' });

  try {
    const response = await axios.get('https://api.github.com/app/installations', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    console.log(response.data);
    return NextResponse.json({ installations: response.data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
