/*
  Warnings:

  - Added the required column `direccion` to the `Cita` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cita" ADD COLUMN     "direccion" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;
