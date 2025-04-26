/*
  Warnings:

  - Added the required column `datedoc` to the `Cmedico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cmedico" ADD COLUMN     "datedoc" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;
