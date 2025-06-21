-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;

-- CreateTable
CREATE TABLE "Cmedico" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "numberdoc" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Cmedico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cmedico_userId_key" ON "Cmedico"("userId");

-- AddForeignKey
ALTER TABLE "Cmedico" ADD CONSTRAINT "Cmedico_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
