-- DropIndex
DROP INDEX "user_info_userId_key";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;
