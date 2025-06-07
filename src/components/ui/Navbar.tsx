"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@heroui/button";
import LanguageDropdown from "../languageDropdown";
import { useTranslations } from "next-intl";

export const Navbar = () => {
  const t = useTranslations("Navbar");
  const { data } = useSession();

  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentLocale = path?.split("/")[1] || "es";

  const localizePath = (path: string) => `/${currentLocale}${path}`;

  if (path?.startsWith(`/${currentLocale}/auth`)) return null;

  return (
    <nav className="bg-blue-600 w-full py-4 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">
        <div className="flex-shrink-0 h-[80px] flex items-center">
          <Link href={localizePath("/")} className="h-full flex items-center">
            <img
              src="/kazan.png"
              className="h-full max-h-[80px] w-auto"
              style={{ minWidth: "100px" }}
              alt="Logo"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="md:hidden text-white focus:outline-none"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">{t("menu")}</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0">
            <li>
              <Link
                href={localizePath("/documents")}
                className={`block py-2 px-3 text-white ${
                  path?.endsWith("/documents")
                    ? "font-bold md:border-b-2 md:border-white"
                    : "hover:bg-blue-700 md:hover:bg-transparent"
                }`}
              >
                {t("documents")}
              </Link>
            </li>
            <li>
              <Link
                href={localizePath("/necesarios")}
                className={`block py-2 px-3 text-white ${
                  path?.endsWith("/necesarios")
                    ? "font-bold md:border-b-2 md:border-white"
                    : "hover:bg-blue-700 md:hover:bg-transparent"
                }`}
              >
                {t("requiredDocuments")}
              </Link>
            </li>
            <li>
              <Link
                href={localizePath("/citas")}
                className={`block py-2 px-3 text-white ${
                  path?.endsWith("/citas")
                    ? "font-bold md:border-b-2 md:border-white"
                    : "hover:bg-blue-700 md:hover:bg-transparent"
                }`}
              >
                {t("appointments")}
              </Link>
            </li>

            <Link
              href={localizePath("/codigoqr")}
              className={`block py-2 px-3 text-white ${
                path?.endsWith("/codigoqr")
                  ? "font-bold md:border-b-2 md:border-white"
                  : "hover:bg-blue-700 md:hover:bg-transparent"
              }`}
            >
              {t("qrCode")}
            </Link>

            {data && (
              <div className="hidden md:block">
                <Button
                  color="danger"
                  variant="shadow"
                  onPress={() =>
                    signOut({ callbackUrl: `/${currentLocale}/auth/sign-in` })
                  }
                  size="sm"
                  className="font-semibold"
                >
                  {t("signOut")}
                </Button>
              </div>
            )}

            {data && (
              <li className="md:hidden mt-2">
                <Button
                  color="danger"
                  variant="shadow"
                  onPress={() =>
                    signOut({ callbackUrl: `/${currentLocale}/auth/sign-in` })
                  }
                  className="w-full"
                >
                  {t("signOut")}
                </Button>
              </li>
            )}

            <LanguageDropdown />
          </ul>
        </div>
      </div>
    </nav>
  );
};
