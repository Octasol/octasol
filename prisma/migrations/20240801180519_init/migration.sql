/*
  Warnings:

  - You are about to drop the `devProfiles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[githubUsername]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[superteamUsername]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[leetcodeUsername]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codeforcesUsername]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hackerrankUsername]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codechefUsername]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gfgUsername]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gitlabUsername]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "codechefUsername" TEXT,
ADD COLUMN     "codeforcesUsername" TEXT,
ADD COLUMN     "gfgUsername" TEXT,
ADD COLUMN     "githubUsername" TEXT,
ADD COLUMN     "gitlabUsername" TEXT,
ADD COLUMN     "hackerrankUsername" TEXT,
ADD COLUMN     "leetcodeUsername" TEXT,
ADD COLUMN     "superteamUsername" TEXT;

-- DropTable
DROP TABLE "devProfiles";

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
