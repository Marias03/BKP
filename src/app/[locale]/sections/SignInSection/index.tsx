"use client";

import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import Image from "next/image";
import { Card, CardBody, CardHeader } from "@heroui/card";
import StyledButton from "@/components/styled/StyledButton";
import { signIn } from "next-auth/react";
import SigninForm from "@/components/forms/SignInForm";

export default function SignInSection({ sessionCallback }: { sessionCallback: string; }) {
  return (
    <AuthFormWrapper>
      <Card className="w-[550px] shadow p-5">
        <CardHeader className="flex flex-col justify-center items-center mt-6 mb-4">
          <h1 className="text-3xl font-semibold">Welcome</h1>
          <p className="text-sm font-normal">Sign in</p>
        </CardHeader>
        <CardBody className="flex justify-center">
          <SigninForm label="Login" />
        </CardBody>
        
      </Card>
    </AuthFormWrapper>
  );
};
