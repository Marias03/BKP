-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'available',
    "description" TEXT,
    "address" TEXT,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Appointment_fecha_status_idx" ON "Appointment"("fecha", "status");
