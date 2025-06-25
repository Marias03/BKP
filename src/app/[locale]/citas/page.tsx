import authenticate from "@/auth/authenticate";
import CitasComponent from "@/components/CitasComponent";

export default async function CitasPage() {
  await authenticate();

  return <CitasComponent />;
}
