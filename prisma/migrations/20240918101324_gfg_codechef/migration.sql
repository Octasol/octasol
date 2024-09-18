-- CreateTable
CREATE TABLE "GFGProfile" (
    "githubId" BIGINT NOT NULL,
    "score" INTEGER NOT NULL,
    "problemsSolved" INTEGER NOT NULL,

    CONSTRAINT "GFGProfile_pkey" PRIMARY KEY ("githubId")
);

-- CreateTable
CREATE TABLE "CodeChef" (
    "githubId" BIGINT NOT NULL,
    "currentRating" INTEGER NOT NULL,

    CONSTRAINT "CodeChef_pkey" PRIMARY KEY ("githubId")
);

-- CreateIndex
CREATE UNIQUE INDEX "GFGProfile_githubId_key" ON "GFGProfile"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "CodeChef_githubId_key" ON "CodeChef"("githubId");

-- AddForeignKey
ALTER TABLE "GFGProfile" ADD CONSTRAINT "GFGProfile_githubId_fkey" FOREIGN KEY ("githubId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeChef" ADD CONSTRAINT "CodeChef_githubId_fkey" FOREIGN KEY ("githubId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;
