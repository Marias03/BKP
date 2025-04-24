"use client";
import { div } from "framer-motion/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const path = usePathname();

  if (path.startsWith("/auth/")) return null;
  else {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "#87CEEB",
          gap: "16px",
        }}
      >
        <Link href="/documents">
          <span className="text-white hover:text-blue-900 transition">
            Mis documentos
          </span>
        </Link>
        <Link href="/necesarios">
          <span className="text-white hover:text-blue-900 transition">
            Documentos necesarios
          </span>
        </Link>
        <Link href="/citas">
          <span className="text-white hover:text-blue-900 transition">
            Agendacion de citas
          </span>
        </Link>
      </div>
    );
  }
};
function useTheme() {
  throw new Error("Function not implemented.");
}
