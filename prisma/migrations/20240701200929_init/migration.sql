-- CreateTable
CREATE TABLE "User" (
    "githubId" BIGINT NOT NULL,
    "installationId" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");
