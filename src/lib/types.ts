export interface Profile {
  githubUsername: string;
  totalPoints: number;
  rank: number;
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

export interface RadarObject {
  githubUsername?: string;
  githubPoints?: number;
  hackerrankPoints?: number;
  gfgPoints?: number;
  codechefPoints?: number;
  leetcodePoints?: number;
  superteamEarnPoints?: number;
}

export enum QueuePriority {
  High = "high",
  Low = "low",
}

export interface Sponsor {
  id: number;
  githubId: string;
  name: string;
  description: string;
  type: string;
  image: string;
  link: string;
  discord: string;
  telegram: string;
  twitter: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface Bounty {
  id: number;
  bountyname: string;
  bountyDescription: string;
  price: number;
  primaryContact: string;
  skills: string[];
  sponsor: Sponsor;
  sponsorId: number;
  status: number;
  time: string;
  timeExtendedTo: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
