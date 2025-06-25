"use client";

import { useTranslations } from "next-intl";

export default function OfferPage() {
  const t = useTranslations("offer");
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
      <div className="prose prose-sm">
        <p>{t("content")}</p>
      </div>
    </div>
  );
}
