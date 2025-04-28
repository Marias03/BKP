"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const path = usePathname();

  if (path?.startsWith("/auth/")) return null;

  return (
    <nav className="w-full bg-blue-50 py-4 font-sans">
      {" "}
      {/* Fondo azul claro y fuente elegante */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center space-x-10">
          <Link href="/documents">
            <span
              className={`
              text-lg px-4 py-2 font-light tracking-wide transition-colors
              ${
                path === "/documents"
                  ? "text-blue-900 font-medium border-b border-blue-900"
                  : "text-blue-600 hover:text-blue-800"
              }
            `}
            >
              Mis documentos
            </span>
          </Link>

          <Link href="/necesarios">
            <span
              className={`
              text-lg px-4 py-2 font-light tracking-wide transition-colors
              ${
                path === "/necesarios"
                  ? "text-blue-900 font-medium border-b border-blue-900"
                  : "text-blue-600 hover:text-blue-800"
              }
            `}
            >
              Documentos necesarios
            </span>
          </Link>

          <Link href="/citas">
            <span
              className={`
              text-lg px-4 py-2 font-light tracking-wide transition-colors
              ${
                path === "/citas"
                  ? "text-blue-900 font-medium border-b border-blue-900"
                  : "text-blue-600 hover:text-blue-800"
              }
            `}
            >
              Agendación de citas
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
