export const languages = ["es", "en"] as const;

export const fallbackLng = "es";
export const defaultNS = "common";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    ns,
    defaultNS,
  };
}
