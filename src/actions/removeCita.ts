"use server";

import prisma from "@/lib/prisma/client";

export async function removeCita(id: number) {
  const res = await prisma.cita.delete({
    where: { id: id },
  });

  return {
    success: !!res,
  };
}
