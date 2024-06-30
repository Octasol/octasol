import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/lib/apiUtils";
import axios from "axios";

interface RequestData {
  repo: string;
  installationId: number;
}

export async function POST(req: NextRequest) {
  const data: RequestData = await req.json();
  const repoName: String = data.repo;
  const installationId: number = data.installationId;

  const accessToken = await getAccessToken(installationId);

  const reposResponse = await axios.get(
    "https://api.github.com/installation/repositories",
    {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  const repositories = reposResponse.data.repositories;

  if (!repositories) {
    return NextResponse.json(
      { error: "No repositories found" },
      { status: 404 }
    );
  }
  const repo = repositories.find((repo: any) => repo.name === repoName);

  if (!repo) {
    return NextResponse.json(
      { error: "Repository not found" },
      { status: 404 }
    );
  }

  const issuesResponse = await axios.get(
    `https://api.github.com/repos/${repo.full_name}/issues`,
    {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );
  return NextResponse.json(issuesResponse.data);
}
