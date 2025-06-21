-- DropIndex
DROP INDEX "Cmedico_userId_key";

-- DropIndex
DROP INDEX "FingerPrints_userId_key";

-- DropIndex
DROP INDEX "Passport_userId_key";

-- DropIndex
DROP INDEX "Registracion_userId_key";

-- DropIndex
DROP INDEX "Visa_userId_key";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;
