import { currentUser } from "@/lib/dal/user";
import SignInSection from "@/app/[locale]/sections/SignInSection";
import { redirect } from "next/navigation";

type SignInProps = {
  searchParams: Promise<{
    callbackUrl: string | undefined;
  }>;
};

export default async function SignInPage({ searchParams }: SignInProps) {
  const { callbackUrl } = await searchParams;
  const user = await currentUser();
  const sessionCallback = callbackUrl || "/";

  if (user) redirect("/");

  return <SignInSection sessionCallback={sessionCallback} redirectAdmin />;
}
