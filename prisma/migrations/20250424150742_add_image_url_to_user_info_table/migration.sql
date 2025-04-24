/*
  Warnings:

  - Added the required column `imageUrl` to the `user_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_info" ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;
