"use server";

import prisma from "@/lib/prisma/client";

export default async function createQRCode(userId: string) {
    const [_, qrcode] = await prisma.$transaction([
        prisma.qrcode.updateMany({
            where: {
                userId,
            },
            data: {
                active: false,
            },
        }),
        prisma.qrcode.create({
            data: {
                user: {
                    connect: { id: userId},
                },
                token: encodeURIComponent(crypto.randomUUID()),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
            }
        })
    ]);

    return qrcode;
};
