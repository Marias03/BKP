"use server";

import { currentUser } from "@/lib/dal/user";
import { redirect } from "next/navigation";

export default async function authenticate() {
  const user = await currentUser();

  if (!user) {
    redirect("/en/auth/sign-in");
  }
}
