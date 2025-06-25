"use server";
import prisma from "@/lib/prisma/client";
import { State } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function approveDocuments(userId: string){
  const res = await prisma.approvedState.upsert({
    where: { userId },
    update: { state: State.APPROVED },
    create: {
      user: {
        connect: {
            id: userId,
        }
      },
      state: State.APPROVED,
    }
  });

  revalidatePath("/")

  return {
    success: !!res,
  }
}
