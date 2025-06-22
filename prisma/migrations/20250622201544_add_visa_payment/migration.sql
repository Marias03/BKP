-- CreateTable
CREATE TABLE "VisaPayment" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisaPayment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VisaPayment" ADD CONSTRAINT "VisaPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
