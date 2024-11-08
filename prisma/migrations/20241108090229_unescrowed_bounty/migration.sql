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

    CONSTRAINT "Unescrowed_pkey" PRIMARY KEY ("githubId")
);

-- CreateTable
CREATE TABLE "Bounty" (
    "id" SERIAL NOT NULL,
    "bountyname" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "bountyDescription" TEXT NOT NULL,
    "skills" TEXT[],
    "time" TEXT NOT NULL,
    "contact" TEXT NOT NULL,

    CONSTRAINT "Bounty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnescrowedBounty" (
    "githubId" BIGINT NOT NULL,
    "bountyId" INTEGER NOT NULL,

    CONSTRAINT "UnescrowedBounty_pkey" PRIMARY KEY ("githubId","bountyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Unescrowed_githubId_key" ON "Unescrowed"("githubId");

-- AddForeignKey
ALTER TABLE "Unescrowed" ADD CONSTRAINT "Unescrowed_githubId_fkey" FOREIGN KEY ("githubId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnescrowedBounty" ADD CONSTRAINT "UnescrowedBounty_githubId_fkey" FOREIGN KEY ("githubId") REFERENCES "Unescrowed"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnescrowedBounty" ADD CONSTRAINT "UnescrowedBounty_bountyId_fkey" FOREIGN KEY ("bountyId") REFERENCES "Bounty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
