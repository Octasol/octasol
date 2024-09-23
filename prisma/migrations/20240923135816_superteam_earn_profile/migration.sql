-- CreateTable
CREATE TABLE "SuperteamEarnProfile" (
    "githubId" BIGINT NOT NULL,
    "participations" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "totalWinnings" INTEGER NOT NULL,

    CONSTRAINT "SuperteamEarnProfile_pkey" PRIMARY KEY ("githubId")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperteamEarnProfile_githubId_key" ON "SuperteamEarnProfile"("githubId");

-- AddForeignKey
ALTER TABLE "SuperteamEarnProfile" ADD CONSTRAINT "SuperteamEarnProfile_githubId_fkey" FOREIGN KEY ("githubId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;
