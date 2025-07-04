"use server";

import { currentUser } from "@/lib/dal/user";
import prisma from "@/lib/prisma/client";

export default async function createCita(data: any) {
  const currentUserId = await currentUser();

  const cita = await prisma.cita.create({
    data: {
      ...data,
      cliente: {
        connect: {
          id: currentUserId?.id,
        },
      },
    },
  });

  return cita;
}
