/*
  Warnings:

  - You are about to drop the column `duracion` on the `Cita` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cita" DROP COLUMN "duracion";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;
