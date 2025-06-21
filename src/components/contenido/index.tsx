"use client";

import { UserType } from "@/lib/dal/user";
import { Button } from "@heroui/button";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function Contenido({ user }: { user: UserType | null }) {
  const t = useTranslations("Contenido");
  return (
    <div>
      <form>
        <input type="date" />
      </form>

      <Button
        color="danger"
        variant="shadow"
        onPress={() => signOut({ callbackUrl: "/auth/signin" })}
        className="font-semibold"
      >
        {t("signOut")}
      </Button>
    </div>
  );
}
