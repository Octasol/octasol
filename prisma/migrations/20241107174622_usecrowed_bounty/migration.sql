-- CreateTable
CREATE TABLE "Unescrowed" (
    "githubId" BIGINT NOT NULL,
    "subHeading" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "twitter" TEXT NOT NULL,
    "telegram" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "bountyname" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "bountyDescription" TEXT NOT NULL,
    "skills" TEXT[],
    "time" TEXT NOT NULL,
    "contact" TEXT NOT NULL,

    CONSTRAINT "Unescrowed_pkey" PRIMARY KEY ("githubId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Unescrowed_githubId_key" ON "Unescrowed"("githubId");

-- AddForeignKey
ALTER TABLE "Unescrowed" ADD CONSTRAINT "Unescrowed_githubId_fkey" FOREIGN KEY ("githubId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;
