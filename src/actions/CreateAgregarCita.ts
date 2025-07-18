"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma/client";
import { currentUser } from "../lib/dal/user";

export default async function createAgregarcita(
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
      fecha: formData.get(" fecha") as string,
      descripcion: formData.get("descripcion") as string,
      direccion: formData.get("direccion") as string,
      creadoEn: formData.get("creadoen") as string,
      actualizadoEn: formData.get("actializadoen") as string,
    };

    console.log(JSON.stringify(data, null, 2));

    if (!data.fecha || !data.actualizadoEn) {
      throw new Error("Fecha es requerida ");
    }

  

    revalidatePath("/datos");
    return { success: true, message: "Datos guardados correctamente" };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al guardar los datos",
    };
  }
}
