"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma/client";
import { currentUser } from "../lib/dal/user";

export default async function createVisa(
  _initialData: any,
  formData: FormData
) {
  try {
    const user = await currentUser();

    if (!user)
      return {
        success: false,
        error: "No current user",
      };

    await prisma.visa.create({
      data: {
        namev: formData.get("namev") as string,
        surnamev: formData.get("surnamev") as string,
        nump: formData.get("nump") as string,
        emisiondate: formData.get("emisiondate") as string,
        entry: formData.get("entry") as string,
        until: formData.get("until") as string,
        imageUrl: formData.get("imageUrl") as string,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    revalidatePath("/datos");
    return { success: true, message: "Datos guardados correctamente" };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al guardar los datos",
    };
  }
}
