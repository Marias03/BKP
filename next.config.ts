import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    i18n: {
      locales: ['en', 'es', 'fr'], // Tus idiomas soportados
      defaultLocale: 'en', // Idioma por defecto
    },
};

export default nextConfig;
