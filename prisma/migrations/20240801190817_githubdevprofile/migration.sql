-- CreateTable
CREATE TABLE "GithubDevProfile" (
    "githubId" BIGINT NOT NULL,
    "stars" INTEGER NOT NULL,
    "forkedRepos" INTEGER NOT NULL,
    "originalRepos" INTEGER NOT NULL,
    "followers" INTEGER NOT NULL,
    "totalCommits" INTEGER NOT NULL,
    "repositoriesContributedTo" INTEGER NOT NULL,
    "pullRequests" INTEGER NOT NULL,
    "mergedPullRequests" INTEGER NOT NULL,
    "totalIssues" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "GithubDevProfile_githubId_key" ON "GithubDevProfile"("githubId");
