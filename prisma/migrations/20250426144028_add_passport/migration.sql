-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;

-- CreateTable
CREATE TABLE "Passport" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seriall" TEXT NOT NULL,
    "numberpas" TEXT NOT NULL,
    "datepas" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Passport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Passport_userId_key" ON "Passport"("userId");

-- AddForeignKey
ALTER TABLE "Passport" ADD CONSTRAINT "Passport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
