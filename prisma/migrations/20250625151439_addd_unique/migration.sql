/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Qrcode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Qrcode_token_key" ON "Qrcode"("token");
