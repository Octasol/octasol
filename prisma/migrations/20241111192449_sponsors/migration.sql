/*
  Warnings:

  - A unique constraint covering the columns `[githubId]` on the table `Sponsor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Sponsor_githubId_key" ON "Sponsor"("githubId");
