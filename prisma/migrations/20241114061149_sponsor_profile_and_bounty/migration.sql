/*
  Warnings:

  - You are about to alter the column `sponsorId` on the `Bounty` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Sponsor` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Bounty" DROP CONSTRAINT "Bounty_sponsorId_fkey";

-- AlterTable
ALTER TABLE "Bounty" ALTER COLUMN "sponsorId" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Sponsor" DROP CONSTRAINT "Sponsor_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Bounty" ADD CONSTRAINT "Bounty_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "Sponsor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
