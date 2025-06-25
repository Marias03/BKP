"use client";

import { Spacer } from "@heroui/spacer";
import StyledInput from "../styled/StyledInput";
import StyledButton from "../styled/StyledButton";
import { useActionState, useEffect, useState } from "react";
import createUser from "@/actions/createUser";
import { useRouter } from "@/i18n/navigation";

type SigninFormProps = {
  label: string;
};

const SignupForm = ({ label }: SigninFormProps) => {
  const router = useRouter();
  const [currentError, setCurrentError] = useState<string>("");
  const [{ error, success }, formAction, isPending] = useActionState(
    createUser,
    {
      error: "",
      success: false,
    }
  );

  useEffect(() => {
    if (error) {
      setCurrentError(error as string);
      return;
    } else if (!isPending && success) {
      setCurrentError("");
      router.push("/auth/sign-in");
    }
  }, [isPending, success, error]);

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10">
        <img
          src="/fsing-up.jpeg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <form action={formAction} className="relative z-10">
        {" "}
        <StyledInput placeholder="Email" type="email" name="email" />
        <Spacer y={1.5} />
        <StyledInput placeholder="Password" type="password" name="password" />
        <Spacer y={2.5} />
        {currentError && <p className="pb-5 text-red-800">{currentError}</p>}
        <StyledButton fullWidth color="skyblue" type="submit">
          {label}
        </StyledButton>
      </form>
    </div>
  );
};

export default SignupForm;
