import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { GRAPHQL_STATS_QUERY } from "./queries";
import {
  getAllGithubDevProfiles,
  getDbUser,
  setGithubDevProfile,
  setUsername,
} from "@/utils/dbUtils";
import { bigintToString } from "@/lib/utils";
import {
  getGithubIdbyAuthHeader,
  getGithubProfileWithGithubID,
  getUserByAuthHeader,
} from "@/lib/apiUtils";

export async function GET() {
  try {
    const githubDevProfile = await getAllGithubDevProfiles();
    if (!githubDevProfile) {
      return NextResponse.json(
        { error: "Github Dev Profile not found" },
        { status: 404 }
      );
    }

    const serializedProfile = bigintToString(githubDevProfile).sort(
      (prev: any, next: any) =>
        next.followers +
        next.forkedRepos +
        next.forks +
        next.mergedPullRequests +
        next.originalRepos +
        next.repositoriesContributedTo +
        next.pullRequests +
        next.stars +
        next.totalCommits +
        next.totalIssues -
        (prev.followers +
          prev.forkedRepos +
          prev.forks +
          prev.mergedPullRequests +
          prev.originalRepos +
          prev.repositoriesContributedTo +
          prev.pullRequests +
          prev.stars +
          prev.totalCommits +
          prev.totalIssues)
    );

    return NextResponse.json(serializedProfile);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let page = 1;
    let stars = 0;
    let forked_repos = 0;
    let original_repos = 0;
    let forks = 0;
    let next = true;
    while (next) {
      const repos = await getRepos(page, `${req.headers.get("Authorization")}`);
      for (let repo of repos) {
        stars += repo.stargazers_count;
        if (repo.fork) {
          forked_repos++;
        } else {
          original_repos++;
        }
        forks += repo.forks_count;
      }
      page++;
      if (repos.length < 100) {
        next = false;
      }
    }

    const { email, login, id, followers } = await getUserByAuthHeader(
      `${req.headers.get("Authorization")}`
    );

    const totalCommits = await getTotalCommits(
      login,
      `${req.headers.get("Authorization")}`
    );
    const { user } = await getGithubGraphql(
      login,
      `${req.headers.get("Authorization")}`
    );

    const repositoriesContributedTo = user.repositoriesContributedTo.totalCount;
    const pullRequests = user.pullRequests.totalCount;
    const mergedPullRequests = user.mergedPullRequests.totalCount;
    const totalIssues =
      user.openIssues.totalCount + user.closedIssues.totalCount;
    const userDB = await getDbUser(BigInt(id));

    if (!userDB?.emails)
      await setUsername(id, { githubUsername: login, emails: [email] });
    else if (!userDB?.emails.includes(email) && email)
      await setUsername(id, {
        githubUsername: login,
        emails: [...userDB.emails, email],
      });
    else if (!userDB?.githubUsername)
      await setUsername(id, { githubUsername: login });
    await setGithubDevProfile(id, {
      stars: stars,
      forkedRepos: forked_repos,
      originalRepos: original_repos,
      forks: forks,
      followers: followers,
      totalCommits: totalCommits,
      repositoriesContributedTo: repositoriesContributedTo,
      pullRequests: pullRequests,
      mergedPullRequests: mergedPullRequests,
      totalIssues: totalIssues,
    });
    return NextResponse.json({
      stars,
      forked_repos,
      original_repos,
      forks,
      followers,
      githubId: id,
      username: login,
      totalCommits,
      repositoriesContributedTo,
      pullRequests,
      mergedPullRequests,
      totalIssues,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function getRepos(page: number, authHeader: string) {
  const url = `https://api.github.com/user/repos?per_page=100&page=${page}&affiliation=owner`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `${authHeader}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  return res.data;
}

async function getTotalCommits(username: string, authHeader: string) {
  const url = `https://api.github.com/search/commits?q=author:${username}`;
  const res = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${authHeader}`,
      Accept: "application/vnd.github.cloak-preview",
    },
  });
  return res.data.total_count;
}

async function getGithubGraphql(login: string, autHeader: string) {
  const res = await axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers: {
      Authorization: `${autHeader}`,
      Accept: "application/vnd.github.v3+json",
    },
    data: {
      query: GRAPHQL_STATS_QUERY,
      variables: {
        login: login,
        includeMergedPullRequests: true,
        includeDiscussions: true,
        includeDiscussionsAnswers: true,
      },
    },
  });
  return res.data.data;
}
