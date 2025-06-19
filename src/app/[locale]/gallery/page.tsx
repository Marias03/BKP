"use client";
import { CldImage } from "next-cloudinary";

export default function Page() {
  return (
    <CldImage
      src="cld-sample-5" // Reemplaza con tu Public ID
      width={500}
      height={500}
      alt="Imagen de ejemplo" // ¡Obligatorio!
      crop={{ type: "auto", source: true }}
    />
  );
}
