export interface Profile {
  followers: number;
  forkedRepos: number;
  forks: number;
  mergedPullRequests: number;
  originalRepos: number;
  pullRequests: number;
  repositoriesContributedTo: number;
  stars: number;
  totalCommits: number;
  totalIssues: number;
  User: {
    githubUsername: string;
  };
  points: number;
}
