-- CreateEnum
CREATE TYPE "State" AS ENUM ('APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "ApprovedState" (
    "id" TEXT NOT NULL,
    "approbedById" TEXT NOT NULL,
    "state" "State" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApprovedState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApprovedState_approbedById_key" ON "ApprovedState"("approbedById");

-- AddForeignKey
ALTER TABLE "ApprovedState" ADD CONSTRAINT "ApprovedState_approbedById_fkey" FOREIGN KEY ("approbedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
