"use client";

import { useTranslation as useTranslationOrg } from "react-i18next";
import { useParams } from "next/navigation";

export function useTranslation(ns: string) {
  const { locale } = useParams(); // Usa el idioma desde la URL
  const { t } = useTranslationOrg(ns);

  return { t, locale };
}
