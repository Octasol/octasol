import axios from "axios";
import { GRAPHQL_STATS_QUERY } from "./githubQueries";
import { getUserByAuthHeader } from "@/lib/apiUtils";
import { setGithubDevProfile } from "./dbUtils";
import { logToDiscord } from "./logger";

async function getRepos(page: number, authHeader: string) {
  const url = `https://api.github.com/user/repos?per_page=100&page=${page}&affiliation=owner`;
  let attempts = 0;
  const maxAttempts = 5;
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  while (attempts < maxAttempts) {
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `${authHeader}`,
          Accept: "application/vnd.github.v3+json",
        },
        timeout: 100000, // 100 seconds
      });
      return res.data;
    } catch (error) {
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

async function getTotalCommits(username: string, authHeader: string) {
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
  }
}

async function getGithubGraphql(login: string, authHeader: string) {
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

/**
 * Updates the GitHub profile statistics for a user.
 *
 * This function fetches various statistics from the GitHub API, such as the number of stars, forks,
 * repositories, commits, pull requests, and issues, and updates the user's profile with this information.
 *
 * Note: This function is now not used in the main Next.js server as the service is handled by Taskpod.
 *
 * @param accessToken - The access token for authenticating with the GitHub API.
 * @returns A promise that resolves when the profile has been updated.
 */
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

  // TODO: Refactor to fetch all required data in a single API call if possible

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
