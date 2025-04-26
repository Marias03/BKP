-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;

-- CreateTable
CREATE TABLE "Visa" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "namev" TEXT NOT NULL,
    "surnamev" TEXT NOT NULL,
    "nump" TEXT NOT NULL,
    "emisiondate" TEXT NOT NULL,
    "entry" TEXT NOT NULL,
    "until" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Visa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Visa_userId_key" ON "Visa"("userId");

-- AddForeignKey
ALTER TABLE "Visa" ADD CONSTRAINT "Visa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
