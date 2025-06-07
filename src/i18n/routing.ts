import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "ru", "cn", "ar"],

  defaultLocale: "en",
});
