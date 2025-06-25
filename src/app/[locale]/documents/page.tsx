import DocumentsSection from "@/components/documents/DocumentSection";
import authenticate from "@/auth/authenticate";

export default async function Documents() {
  await authenticate();

  return <DocumentsSection />;
}
