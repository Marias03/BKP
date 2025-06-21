"use client";

import Navbar from "@/components/ui/Navbarsingin";
import React from "react";

type AuthFormSectionProps = {
  children: React.ReactNode;
};

function AuthFormWrapper({ children }: AuthFormSectionProps) {
  return (
    <main className="h-[100dvh] relative overflow-hidden flex flex-col">
      <section className="flex-grow flex items-center justify-center">
        {children}
      </section>

      <div className="flex self-center p-10 gap-x-2"></div>
    </main>
  );
}

export default AuthFormWrapper;
