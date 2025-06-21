-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;

-- CreateTable
CREATE TABLE "Registracion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "apartamentNumber" TEXT NOT NULL,
    "validation" TEXT NOT NULL,
    "strated" TIMESTAMP(3) NOT NULL,
    "Finished" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Registracion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Registracion_userId_key" ON "Registracion"("userId");

-- AddForeignKey
ALTER TABLE "Registracion" ADD CONSTRAINT "Registracion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
