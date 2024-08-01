-- CreateTable
CREATE TABLE "devProfiles" (
    "githubUsername" TEXT NOT NULL,
    "superteamUsername" TEXT,
    "leetcodeUsername" TEXT,
    "codeforcesUsername" TEXT,
    "hackerrankUsername" TEXT,
    "codechefUsername" TEXT,
    "gfgUsername" TEXT,
    "gitlabUsername" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "devProfiles_githubUsername_key" ON "devProfiles"("githubUsername");

-- CreateIndex
CREATE UNIQUE INDEX "devProfiles_superteamUsername_key" ON "devProfiles"("superteamUsername");

-- CreateIndex
CREATE UNIQUE INDEX "devProfiles_leetcodeUsername_key" ON "devProfiles"("leetcodeUsername");

-- CreateIndex
CREATE UNIQUE INDEX "devProfiles_codeforcesUsername_key" ON "devProfiles"("codeforcesUsername");

-- CreateIndex
CREATE UNIQUE INDEX "devProfiles_hackerrankUsername_key" ON "devProfiles"("hackerrankUsername");

-- CreateIndex
CREATE UNIQUE INDEX "devProfiles_codechefUsername_key" ON "devProfiles"("codechefUsername");

-- CreateIndex
CREATE UNIQUE INDEX "devProfiles_gfgUsername_key" ON "devProfiles"("gfgUsername");

-- CreateIndex
CREATE UNIQUE INDEX "devProfiles_gitlabUsername_key" ON "devProfiles"("gitlabUsername");
