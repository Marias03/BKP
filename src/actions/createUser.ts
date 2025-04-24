"use server";
import prisma from "@/lib/prisma/client";
import { createUserSquema } from "@/validators/user";
import { hash } from "bcrypt";
import { z } from "zod";

export default async function createUser(_initState: any, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password") as string;

    const secureData = createUserSquema.parse({
      email,
      password,
    });

    const hashedPassword = await hash(secureData.password, 10);

    const user = await prisma.user.findUnique({
      where: {
        email: secureData.email,
      },
    });

    if (user) {
      return {
        error: "User already exists on our system",
        success: false,
      };
    }

    const newUser = await prisma.user.create({
      data: {
        email: secureData.email,
        password: hashedPassword,
        role: "user",
      },
    });

    if (newUser) return { error: "", success: true };

    return {
      error: "User not created",
      success: false,
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        error: err.errors[0].message,
        success: false,
      };
    }

    return {
      error: err as string,
      success: true,
    };
  }
}
