"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma/client";
import { currentUser } from "../lib/dal/user";
import { serialize } from "v8";

export default async function createFingerPrints(
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

    const data = {
      serialf: formData.get("serialf") as string,
      numberf: formData.get("numberf") as string,
      datef: formData.get("datef") as string,
      emision: formData.get("emision") as string,
      imageUrl: formData.get("imageUrl") as string,
    };

    console.log(JSON.stringify(data, null, 2));

    if (!data.serialf || !data.datef) {
      throw new Error("Nombre y apellidos son requeridos");
    }

    await prisma.fingerPrints.create({
      data: {
        ...data,
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
