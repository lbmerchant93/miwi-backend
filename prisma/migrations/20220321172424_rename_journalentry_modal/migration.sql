/*
  Warnings:

  - You are about to drop the `journalentries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "journalentries";

-- CreateTable
CREATE TABLE "JournalEntry" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TEXT NOT NULL,
    "exercise" INTEGER NOT NULL,
    "garlandPose" INTEGER NOT NULL,
    "kegels" INTEGER NOT NULL,
    "prenatalVitamins" BOOLEAN NOT NULL,
    "probiotics" BOOLEAN NOT NULL,
    "proteinIntake" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "waterIntake" INTEGER NOT NULL,

    CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("id")
);
