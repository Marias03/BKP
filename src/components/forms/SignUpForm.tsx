"use client";

import { Spacer } from "@heroui/spacer";
import StyledInput from "../styled/StyledInput";
import StyledButton from "../styled/StyledButton";
import { useActionState, useEffect, useState } from "react";
import createUser from "@/actions/createUser";



type SigninFormProps = {
  label: string;
}

const SignupForm = ({ label }: SigninFormProps) => {
  const [currentError, setCurrentError] = useState<string>("");
  const [{
    error,
    success,
  }, formAction, isPending] = useActionState(createUser, {
    error: "",
    success: false,
  });

  useEffect(() => {
    if(error) {
      setCurrentError(error as string);
      return;
    } else if (!isPending && success){
      setCurrentError("");
    }
  }, [isPending, success, error]);


  return (
    <>
      
      <form action={formAction}>
  
        <StyledInput placeholder="Email" type="email" name="email"/>
        <Spacer y={1.5} />
        <StyledInput placeholder="Password" type="password" name="password"/>
        <Spacer y={2.5} />
        {currentError && <p className="pb-5 text-red-800">{currentError}</p>}
        <StyledButton fullWidth color="skyblue" type="submit">
          {label}
        </StyledButton>
      </form>
    </>
  );
};

export default SignupForm;