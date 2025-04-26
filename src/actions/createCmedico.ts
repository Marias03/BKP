"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma/client";
import { currentUser } from "../lib/dal/user";
import { serialize } from "v8";

export default async function createCmedico(
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
      serial: formData.get("serial") as string,
      numberdoc: formData.get("numberdoc") as string,
      datedoc: formData.get("datedoc") as string,
      imageUrl: formData.get("imageUrl") as string,
    };

    console.log(JSON.stringify(data, null, 2));

    if (!data.serial || !data.datedoc) {
      throw new Error("Nombre y apellidos son requeridos");
    }

    await prisma.cmedico.create({
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
