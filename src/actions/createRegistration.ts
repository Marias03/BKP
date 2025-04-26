"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma/client";
import { currentUser } from "../lib/dal/user";

export default async function createRegistration(
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
      residence: formData.get("residence") as string,
      city: formData.get("city") as string,
      adress: formData.get("adress") as string,
      apartamentNumber: formData.get("apartamentNumber") as string,
      validation: formData.get("validation") as string,
      finished: formData.get("finished") as string,
      imageUrl: formData.get("imageUrl") as string,
    };

    console.log(JSON.stringify(data, null, 2));

    if (!data.residence || !data.apartamentNumber) {
      throw new Error("Nombre y apellidos son requeridos");
    }

    console.log(user);

    await prisma.registracion.create({
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
