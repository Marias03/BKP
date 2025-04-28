"use server";
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { fallbackLng, languages, defaultNS } from "./settings";

const initI18next = async (lng: string, ns: string | string[]) => {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../public/locales/${language}/${namespace}.json`)
      )
    )
    .init({
      lng,
      fallbackLng,
      supportedLngs: languages,
      ns,
      defaultNS,
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
    });

  return i18nInstance;
};

export async function getTranslation(
  lng: string,
  ns: string | string[] = defaultNS
) {
  const i18nInstance = await initI18next(lng, ns);
  return {
    t: i18nInstance.getFixedT(lng, ns),
  };
}
