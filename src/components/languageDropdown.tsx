"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type Language = {
  code: string;
  name: string;
};

type LanguageMapping = {
  [key: string]: string;
};

export default function LanguageDropdown() {
  const t = useTranslations("LanguageDropdown");
  const languages: Language[] = [
    { code: "es", name: t("spanish") },
    { code: "en", name: t("english") },
    { code: "cn", name: t("chinese") },
    { code: "ar", name: t("arabic") },
    { code: "ru", name: t("russian") },
  ];

  const languagesMapping: LanguageMapping = {
    es: t("spanish"),
    en: t("english"),
    cn: t("chinese"),
    ar: t("arabic"),
    ru: t("russian"),
  };

  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const currentLocaleKey: string =
    languagesMapping[currentLocale] || languagesMapping["en"];

  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLocaleKey);

  console.log(currentLocale);

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen((prev) => !prev);
  };

  const handleLanguageSelect = (languageName: string, languageCode: string) => {
    setSelectedLanguage(languageName);
    setIsLanguageDropdownOpen(false);

    const segments = pathname.split("/");
    if (segments[1] === currentLocale) {
      segments[1] = languageCode; // replace locale
    } else {
      segments.splice(1, 0, languageCode); // insert locale
    }

    const newPath = segments.join("/");

    router.push(newPath);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleLanguageDropdown}
        aria-expanded={isLanguageDropdownOpen}
        aria-haspopup="true"
        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
      >
        <span className="text-white font-medium">{selectedLanguage}</span>
        <svg
          className={`w-5 h-5 text-white transition-transform duration-200 ${
            isLanguageDropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isLanguageDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl overflow-hidden z-20 border border-gray-200">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.name, language.code)}
              className={`block w-full text-left px-4 py-3 text-gray-800 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200 ${
                selectedLanguage === language.name
                  ? "bg-blue-200 text-blue-800 font-medium"
                  : ""
              }`}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
