/*
  Warnings:

  - The primary key for the `FingerPrints` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `d` on the `FingerPrints` table. All the data in the column will be lost.
  - The required column `id` was added to the `FingerPrints` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "FingerPrints" DROP CONSTRAINT "FingerPrints_pkey",
DROP COLUMN "d",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "FingerPrints_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;
