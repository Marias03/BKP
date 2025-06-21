"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma/client";
import { currentUser } from "../lib/dal/user";
import { serialize } from "v8";

export default async function createPassport(
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

    await prisma.passport.create({
      data: {
        seriall: formData.get("seriall") as string,
        numberpas: formData.get("numberpas") as string,
        datepas: formData.get("datepas") as string,
        emisionp: formData.get("emisionp") as string,
        imageUrl: formData.get("imageUrl") as string,
        userId: user.id || "",
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
