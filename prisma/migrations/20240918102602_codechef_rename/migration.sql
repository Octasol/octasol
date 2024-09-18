/*
  Warnings:

  - You are about to drop the `CodeChef` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CodeChef" DROP CONSTRAINT "CodeChef_githubId_fkey";

-- DropTable
DROP TABLE "CodeChef";

-- CreateTable
CREATE TABLE "CodeChefProfile" (
    "githubId" BIGINT NOT NULL,
    "currentRating" INTEGER NOT NULL,

    CONSTRAINT "CodeChefProfile_pkey" PRIMARY KEY ("githubId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CodeChefProfile_githubId_key" ON "CodeChefProfile"("githubId");

-- AddForeignKey
ALTER TABLE "CodeChefProfile" ADD CONSTRAINT "CodeChefProfile_githubId_fkey" FOREIGN KEY ("githubId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;
