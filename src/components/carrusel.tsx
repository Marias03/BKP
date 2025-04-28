"use client";

import { useState, useEffect } from "react";

export default function Carrusel() {
  const imagenes = ["/1.jpg", "/2.jpg", "/3.jpg"];
  const [indiceActual, setIndiceActual] = useState(0);

  // Auto-desplazamiento cada 5 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      siguiente();
    }, 5000);
    return () => clearInterval(intervalo);
  }, [indiceActual]);

  const siguiente = () => {
    setIndiceActual((prevIndice) => (prevIndice + 1) % imagenes.length);
  };

  const anterior = () => {
    setIndiceActual(
      (prevIndice) => (prevIndice - 1 + imagenes.length) % imagenes.length
    );
  };

  return (
    <div className="relative w-full h-[90dvh] max-w-screen-2xl mx-auto">
      {/* Contenedor con tamaño fijo (16:9) y centrado */}
      <div className="w-full h-full flex items-center justify-center overflow-hidden bg-gray-100">
        <img
          src={imagenes[indiceActual]}
          alt={`Imagen ${indiceActual + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Botones de navegación */}
      <button
        onClick={anterior}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
      >
        ◀
      </button>
      <button
        onClick={siguiente}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
      >
        ▶
      </button>

      {/* Indicadores de posición (puntos) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {imagenes.map((_, index) => (
          <button
            key={index}
            onClick={() => setIndiceActual(index)}
            className={`w-3 h-3 rounded-full ${
              indiceActual === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
