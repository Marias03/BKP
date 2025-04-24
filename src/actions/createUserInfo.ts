"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma/client";
import { currentUser } from "../lib/dal/user";

export default async function createUserInfo(
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
      name: formData.get("name") as string,
      surname: formData.get("surname") as string,
      birthdate: formData.get("birthdate") as string,
      passportNum: formData.get("passportNum") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      nacionality: formData.get("nacionality") as string,
      imageUrl: formData.get("imageUrl") as string,
    };

    console.log(JSON.stringify(data, null, 2));

    if (!data.name || !data.surname) {
      throw new Error("Nombre y apellidos son requeridos");
    }

    await prisma.userInfo.create({
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
