import authenticate from "@/auth/authenticate";
import CheckList from "@/components/CheckList";

export default async function CheckListPage() {
  await authenticate();

  return <CheckList />;
}
