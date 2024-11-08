/*
  Warnings:

  - Made the column `primaryContact` on table `Bounty` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bounty" ALTER COLUMN "primaryContact" SET NOT NULL;
