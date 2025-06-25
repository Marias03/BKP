/*
  Warnings:

  - You are about to drop the column `approbedById` on the `ApprovedState` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `ApprovedState` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `ApprovedState` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ApprovedState" DROP CONSTRAINT "ApprovedState_approbedById_fkey";

-- DropIndex
DROP INDEX "ApprovedState_approbedById_key";

-- AlterTable
ALTER TABLE "ApprovedState" DROP COLUMN "approbedById",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ApprovedState_userId_key" ON "ApprovedState"("userId");

-- AddForeignKey
ALTER TABLE "ApprovedState" ADD CONSTRAINT "ApprovedState_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
