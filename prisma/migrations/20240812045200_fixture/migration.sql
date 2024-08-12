-- CreateTable
CREATE TABLE "User" (
    "githubId" BIGINT NOT NULL,
    "installationId" BIGINT NOT NULL,
    "githubUsername" TEXT,
    "superteamUsername" TEXT,
    "leetcodeUsername" TEXT,
    "codeforcesUsername" TEXT,
    "hackerrankUsername" TEXT,
    "codechefUsername" TEXT,
    "gfgUsername" TEXT,
    "gitlabUsername" TEXT,
    "email" TEXT,
    "emails" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "verifiedEmail" BOOLEAN NOT NULL DEFAULT false,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "emailOtp" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("githubId")
);

-- CreateTable
CREATE TABLE "GithubDevProfile" (
    "githubId" BIGINT NOT NULL,
    "stars" INTEGER NOT NULL,
    "forks" INTEGER NOT NULL,
    "forkedRepos" INTEGER NOT NULL,
    "originalRepos" INTEGER NOT NULL,
    "followers" INTEGER NOT NULL,
    "totalCommits" INTEGER NOT NULL,
    "repositoriesContributedTo" INTEGER NOT NULL,
    "pullRequests" INTEGER NOT NULL,
    "mergedPullRequests" INTEGER NOT NULL,
    "totalIssues" INTEGER NOT NULL,

    CONSTRAINT "GithubDevProfile_pkey" PRIMARY KEY ("githubId")
);

-- CreateTable
CREATE TABLE "HackerrankProfile" (
    "githubId" BIGINT NOT NULL,
    "currentPoints" INTEGER NOT NULL,
    "stars" INTEGER NOT NULL,

    CONSTRAINT "HackerrankProfile_pkey" PRIMARY KEY ("githubId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "User_githubUsername_key" ON "User"("githubUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_superteamUsername_key" ON "User"("superteamUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_leetcodeUsername_key" ON "User"("leetcodeUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_codeforcesUsername_key" ON "User"("codeforcesUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_hackerrankUsername_key" ON "User"("hackerrankUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_codechefUsername_key" ON "User"("codechefUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_gfgUsername_key" ON "User"("gfgUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_gitlabUsername_key" ON "User"("gitlabUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GithubDevProfile_githubId_key" ON "GithubDevProfile"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "HackerrankProfile_githubId_key" ON "HackerrankProfile"("githubId");

-- AddForeignKey
ALTER TABLE "GithubDevProfile" ADD CONSTRAINT "GithubDevProfile_githubId_fkey" FOREIGN KEY ("githubId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HackerrankProfile" ADD CONSTRAINT "HackerrankProfile_githubId_fkey" FOREIGN KEY ("githubId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;
