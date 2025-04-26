/*
  Warnings:

  - You are about to drop the column `started` on the `Registracion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Registracion" DROP COLUMN "started";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;
