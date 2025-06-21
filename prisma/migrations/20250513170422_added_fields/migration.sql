/*
  Warnings:

  - Added the required column `fin` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inicio` to the `Cita` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cita" ADD COLUMN     "fin" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hora" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "inicio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "title" TEXT,
ALTER COLUMN "actualizadoEn" DROP NOT NULL;
