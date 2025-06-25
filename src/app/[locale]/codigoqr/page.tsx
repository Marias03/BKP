import authenticate from "@/auth/authenticate";
import ChecklistSection from "@/components/checklist/CheckListSection";

export default async function CodigoQR() {
  await authenticate();

  return <ChecklistSection />;
}
