import Contenido from "@/components/contenido";
import { currentUser } from "@/lib/dal/user";
import authenticate from "@/auth/authenticate";
import { redirect } from "next/navigation";

export default async function Profile() {
  await authenticate();

  const user = await currentUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  return <Contenido user={user} />;
}
