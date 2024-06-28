import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { sign } from 'jsonwebtoken';
import axios from 'axios';

export async function GET(req: NextRequest) {
    const privateKey = readFileSync(process.env.GITHUB_PRIVATE_KEY_PATH as string);
    const appId = process.env.GITHUB_APP_ID as string;
  
    const payload = { iss: appId };
    const token = sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '10m' });
  const { searchParams } = new URL(req.url);
  const installationId = searchParams.get('installationId');

  if (!installationId) {
    return NextResponse.json({ error: 'Installation ID is required' }, { status: 400 });
  }

  try {
    // Fetch the installation access token
    const tokenResponse = await axios.post(
      `https://api.github.com/app/installations/${installationId}/access_tokens`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    const accessToken = tokenResponse.data.token;

    // Fetch the repositories
    const reposResponse = await axios.get('https://api.github.com/installation/repositories', {
      headers: {
        // Authorization: `Bearer ${token}`,
        Authorization: `token ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    return NextResponse.json({ repositories: reposResponse.data.repositories });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
