-- CreateTable
CREATE TABLE "LeetcodeProfile" (
    "githubId" BIGINT NOT NULL,
    "easyQues" INTEGER NOT NULL,
    "mediumQues" INTEGER NOT NULL,
    "hardQues" INTEGER NOT NULL,

    CONSTRAINT "LeetcodeProfile_pkey" PRIMARY KEY ("githubId")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeetcodeProfile_githubId_key" ON "LeetcodeProfile"("githubId");

-- AddForeignKey
ALTER TABLE "LeetcodeProfile" ADD CONSTRAINT "LeetcodeProfile_githubId_fkey" FOREIGN KEY ("githubId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;
