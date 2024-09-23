export interface Profile {
  githubUsername: string;
  totalPoints: number;
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

export interface QuestionData {
  count: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
}

export interface DataObject {
  githubId?: string;
  stars?: number;
  forks?: number;
  forkedRepos?: number;
  originalRepos?: number;
  followers?: number;
  totalCommits?: number;
  repositoriesContributedTo?: number;
  pullRequests?: number;
  mergedPullRequests?: number;
  totalIssues?: number;
  currentPoints?: number;
  currentRating?: number;
  problemsSolved?: number;
  score?: number;
  easyQues?: number;
  mediumQues?: number;
  hardQues?: number;
  participations?: number;
  totalWinnings?: number;
  wins?: number;
}
