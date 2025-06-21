"use client";

import { Spacer } from "@heroui/spacer";
import StyledInput from "../styled/StyledInput";
import StyledButton from "../styled/StyledButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import Link from "next/link";

type SigninFormProps = {
  label: string;
};

const SigninForm = ({ label }: SigninFormProps) => {
  const router = useRouter();

  const handleOnSumit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const response = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: true,
      callbackUrl: "/en",
    });

    console.log(response);

    if (!response?.error) {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <>
      <form onSubmit={handleOnSumit}>
        <StyledInput placeholder="Email" type="email" name="email" />
        <Spacer y={1.5} />
        <StyledInput placeholder="Password" type="password" name="password" />
        <Spacer y={2.5} />

        <StyledButton
          className="bg-blue-500 text-white"
          fullWidth
          type="submit"
        >
          {label}
        </StyledButton>
        <div className="flex items-center justify-center gap-2 w-full">
          <span className="text-gray-700">or</span>

          <Link href="/en/auth/sign-up">
            <button className="text-blue-800 hover:underline">Register</button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default SigninForm;
