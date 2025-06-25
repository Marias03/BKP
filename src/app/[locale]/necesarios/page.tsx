import NecesariosSeciton from "@/components/necesarios/NecesariosSection";
import authenticate from "@/auth/authenticate";

export default async function Necesarios() {
  await authenticate();

  return <NecesariosSeciton />;
}
