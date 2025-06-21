/*
  Warnings:

  - You are about to drop the column `Finished` on the `Registracion` table. All the data in the column will be lost.
  - Added the required column `finished` to the `Registracion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residence` to the `Registracion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Registracion" DROP COLUMN "Finished",
ADD COLUMN     "finished" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "residence" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;
