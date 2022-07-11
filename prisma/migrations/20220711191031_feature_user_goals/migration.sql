-- CreateTable
CREATE TABLE "Goals" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "waterIntakeGoal" INTEGER,
    "proteinIntakeGoal" INTEGER,
    "exerciseGoal" INTEGER,
    "kegelsGoal" INTEGER,
    "gardlandPoseGoal" INTEGER,

    CONSTRAINT "Goals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Goals" ADD CONSTRAINT "Goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
