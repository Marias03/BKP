import { currentUser } from "@/lib/dal/user";
import SignInSection from "@/sections/SignInSection";
import { redirect } from "next/navigation";

type SignInProps = {
  searchParams: Promise<{
    callbackUrl: string | undefined;
  }>;
}

export default async function SignInPage({ searchParams }: SignInProps) {
  const { callbackUrl } = await searchParams;
  const user = await currentUser();
  const sessionCallback = callbackUrl || "/";

  if(user) redirect("/dashboard"); 

  return <SignInSection sessionCallback={sessionCallback}/>
}
