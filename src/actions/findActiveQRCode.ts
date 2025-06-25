"use server";

import prisma from "@/lib/prisma/client";

export default async function findActiveQRCode(userId: string) {
    const qrcode = await prisma.qrcode.findFirst({
      where: {
        userId,
        active: true
      },
    });

    if(!qrcode || (qrcode.expiresAt && qrcode.expiresAt < new Date())) {
      return null;
    }

    return qrcode;
}
