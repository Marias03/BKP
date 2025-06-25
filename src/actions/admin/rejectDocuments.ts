"use server";
import prisma from "@/lib/prisma/client";
import { State } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function rejectDocuments(userId: string){
   const res = await prisma.approvedState.upsert({
    where: { userId },
    update: { state: State.REJECTED },
    create: {
      user: {
        connect: {
            id: userId,
        }
      },
      state: State.REJECTED,
    }
  });
  
  revalidatePath("/")

  return {
    success: !!res,
  }
}
