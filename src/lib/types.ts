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

export interface GithubDevProfile {
  stars: number;
  forkedRepos: number;
  originalRepos: number;
  forks: number;
  followers: number;
  totalCommits: number;
  repositoriesContributedTo: number;
  pullRequests: number;
  mergedPullRequests: number;
  totalIssues: number;
}

export interface UserDB {
  githubId?: number;
  installationId?: number;
  githubUsername?: string;
  superteamUsername?: string;
  leetcodeUsername?: string;
  codeforcesUsername?: string;
  hackerrankUsername?: string;
  codechefUsername?: string;
  gfgUsername?: string;
  gitlabUsername?: string;
  email?: string;
  emails?: string[];
  verifiedEmail?: boolean;
  totalPoints?: number;
}

export interface userNames {
  githubUsername: string;
  superteamUsername: string;
  leetcodeUsername: string;
  codeforcesUsername: string;
  hackerrankUsername: string;
  codechefUsername: string;
  gfgUsername: string;
  gitlabUsername: string;
}
