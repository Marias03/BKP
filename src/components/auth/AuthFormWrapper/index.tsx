"use client";

import React from "react";

type AuthFormSectionProps = {
  children: React.ReactNode;
};

function AuthFormWrapper({ children }: AuthFormSectionProps) {
  return (
    <main className="h-[100dvh] relative overflow-hidden flex flex-col bg-blue-100">
      <section className="flex-grow flex items-center justify-center">
        {children}
      </section>

      <div className="flex self-center p-10 gap-x-2">
       
      </div>
    </main>
  );
}

export default AuthFormWrapper;
