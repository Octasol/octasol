/*
  Warnings:

  - Made the column `totalPoints` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emails" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "verifiedEmail" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "totalPoints" SET NOT NULL,
ALTER COLUMN "totalPoints" SET DEFAULT 0;
