import { getTranslation } from "@/i18n";
import { dir } from "i18next";

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t } = await getTranslation(locale);

  return (
    <div dir={dir(locale)}>
      <h1>{t("greeting")}</h1>
      <p>{t("welcome")}</p>
    </div>
  );
}
