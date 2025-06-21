import Contenido from "@/components/contenido";
import { currentUser } from "@/lib/dal/user";

export default async function Profile() {
  const user = await currentUser();

  return <Contenido user={user} />
}
