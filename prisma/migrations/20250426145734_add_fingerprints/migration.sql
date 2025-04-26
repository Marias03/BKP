-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;

-- CreateTable
CREATE TABLE "FingerPrints" (
    "d" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serialf" TEXT NOT NULL,
    "numberf" TEXT NOT NULL,
    "datef" TEXT NOT NULL,
    "emision" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "FingerPrints_pkey" PRIMARY KEY ("d")
);

-- CreateIndex
CREATE UNIQUE INDEX "FingerPrints_userId_key" ON "FingerPrints"("userId");

-- AddForeignKey
ALTER TABLE "FingerPrints" ADD CONSTRAINT "FingerPrints_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
