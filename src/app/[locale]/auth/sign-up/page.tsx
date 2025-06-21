import { currentUser } from "@/lib/dal/user";
import SignUpSection from "@/app/[locale]/sections/SignUpSection";
import { redirect } from "next/navigation";

type SignUpProps = {
  searchParams: Promise<{
    callbackUrl: string | undefined;
  }>;
};

export default async function SignUpPage({ searchParams }: SignUpProps) {
  const { callbackUrl } = await searchParams;
  const user = await currentUser();
  const sessionCallback = callbackUrl || "/";

  if (user) redirect("/dashboard");

  return <SignUpSection sessionCallback={sessionCallback} />;
}
