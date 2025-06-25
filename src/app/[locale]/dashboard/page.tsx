import Contenido from "@/components/contenido";
import { currentUser } from "@/lib/dal/user";
import authenticate from "@/auth/authenticate";

export default async function Profile() {
  await authenticate();

  const user = await currentUser();

  return <Contenido user={user} />;
}
