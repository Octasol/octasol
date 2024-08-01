/*
  Warnings:

  - Added the required column `forks` to the `GithubDevProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GithubDevProfile" ADD COLUMN     "forks" INTEGER NOT NULL;
