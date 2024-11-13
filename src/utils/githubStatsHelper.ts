import axios from "axios";
import { GRAPHQL_STATS_QUERY } from "./githubQueries";
import { getUserByAuthHeader } from "@/lib/apiUtils";
import { setGithubDevProfile } from "./dbUtils";
import { logToDiscord } from "./logger";

export async function getRepos(page: number, authHeader: string) {
  const url = `https://api.github.com/user/repos?per_page=100&page=${page}&affiliation=owner`;
  let attempts = 0;
  const maxAttempts = 1;
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  while (attempts < maxAttempts) {
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `${authHeader}`,
          Accept: "application/vnd.github.v3+json",
        },
      });
      return res.data;
    } catch (error) {
      // todo: if error is 401, logout user or refresh token
      await logToDiscord(
        `githubStatsHelper/getRepos: ${(error as any).message}`,
        "ERROR"
      );

      attempts++;
      console.error(`Attempt ${attempts} failed: ${(error as any).message}`);
      if (attempts >= maxAttempts) {
        throw new Error("Failed to fetch repositories after multiple attempts");
      }
      await delay(1000); // wait for 1 second before retrying
    }
  }
}

export async function getTotalCommits(username: string, authHeader: string) {
  const url = `https://api.github.com/search/commits?q=author:${username}`;
  try {
    const res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authHeader}`,
        Accept: "application/vnd.github.cloak-preview",
      },
    });
    return res.data.total_count;
  } catch (error) {
    await logToDiscord(
      `githubStatsHelper/getTotalCommits: ${(error as any).message}`,
      "ERROR"
    );

    console.error("Error fetching total commits:", (error as any).message);
    throw new Error("Failed to fetch total commits");
    throw new Error("Failed to fetch total commits");
  }
}

export async function getGithubGraphql(login: string, authHeader: string) {
  try {
    const res = await axios({
      url: "https://api.github.com/graphql",
      method: "post",
      headers: {
        Authorization: `${authHeader}`,
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
  } catch (error) {
    await logToDiscord(
      `githubStatsHelper/getGithubGraphql: ${(error as any).message}`,
      "ERROR"
    );

    console.error(
      "Error fetching GitHub GraphQL data:",
      (error as any).message
    );
    throw new Error("Failed to fetch GitHub GraphQL data");
  }
}

export const updateGithubProfile = async (accessToken: string) => {
  let page = 1;
  let stars = 0;
  let forked_repos = 0;
  let original_repos = 0;
  let forks = 0;
  let next = true;
  while (next) {
    const repos = await getRepos(page, `Bearer ${accessToken}`);
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

  const { login, id, followers } = await getUserByAuthHeader(
    `Bearer ${accessToken}`
  );

  const totalCommits = await getTotalCommits(login, `Bearer ${accessToken}`);
  const { user } = await getGithubGraphql(login, `Bearer ${accessToken}`);

  const repositoriesContributedTo = user.repositoriesContributedTo.totalCount;
  const pullRequests = user.pullRequests.totalCount;
  const mergedPullRequests = user.mergedPullRequests.totalCount;
  const totalIssues = user.openIssues.totalCount + user.closedIssues.totalCount;

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
};
