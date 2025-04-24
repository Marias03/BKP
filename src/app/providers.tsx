"use client";

import { HeroUIProvider } from "@heroui/system";
import { SessionProvider } from "next-auth/react";

type ProvidersProps = {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <HeroUIProvider>
    <SessionProvider>
      {children}
    </SessionProvider>
  </HeroUIProvider>
}
