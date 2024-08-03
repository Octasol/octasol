-- CreateTable
CREATE TABLE "HackerrankProfile" (
    "githubId" BIGINT NOT NULL,
    "currentPoints" INTEGER NOT NULL,
    "stars" INTEGER NOT NULL,

    CONSTRAINT "HackerrankProfile_pkey" PRIMARY KEY ("githubId")
);

-- CreateIndex
CREATE UNIQUE INDEX "HackerrankProfile_githubId_key" ON "HackerrankProfile"("githubId");

-- AddForeignKey
ALTER TABLE "HackerrankProfile" ADD CONSTRAINT "HackerrankProfile_githubId_fkey" FOREIGN KEY ("githubId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;
