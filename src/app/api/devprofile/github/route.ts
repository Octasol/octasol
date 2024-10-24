import { NextRequest, NextResponse } from "next/server";
import { setGithubDevProfile } from "@/utils/dbUtils";
import { getUserByAuthHeader } from "@/lib/apiUtils";
import {
  getGithubGraphql,
  getRepos,
  getTotalCommits,
} from "@/utils/githubStatsHelper";

// export async function GET() {
//   try {
//     const githubDevProfile = await getAllGithubDevProfiles();
//     if (!githubDevProfile) {
//       return NextResponse.json(
//         { error: "Github Dev Profile not found" },
//         { status: 404 }
//       );
//     }

//     const serializedProfile = bigintToString(githubDevProfile).sort(
//       (prev: any, next: any) =>
//         next.followers +
//         next.forkedRepos +
//         next.forks +
//         next.mergedPullRequests +
//         next.originalRepos +
//         next.repositoriesContributedTo +
//         next.pullRequests +
//         next.stars +
//         next.totalCommits +
//         next.totalIssues -
//         (prev.followers +
//           prev.forkedRepos +
//           prev.forks +
//           prev.mergedPullRequests +
//           prev.originalRepos +
//           prev.repositoriesContributedTo +
//           prev.pullRequests +
//           prev.stars +
//           prev.totalCommits +
//           prev.totalIssues)
//     );

//     return NextResponse.json(serializedProfile);
//   } catch (error) {
//     return NextResponse.json({ error: (error as any).message }, { status: 500 });
//   }
// }

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

    const { login, id, followers } = await getUserByAuthHeader(
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
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
}
