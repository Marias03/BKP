/*
  Warnings:

  - You are about to drop the column `strated` on the `Registracion` table. All the data in the column will be lost.
  - Added the required column `started` to the `Registracion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Registracion" DROP COLUMN "strated",
ADD COLUMN     "started" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;
