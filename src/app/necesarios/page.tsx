"use client";
import { useState } from "react";

export default function Necesarios() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "Requisitos para realizar la Visa",
      content: [
        "Pasaporte original + 2 copias de la página principal",
        "2 copias de la última visa realizada",
        "1 copia de todas las páginas selladas o con otras visas",
        "Registración original + 2 copias",
        "Carta de migración original + 2 copias",
        "Certificado estudiantil emitido por el decanato",
        "Recibo de pago",
        "2 fotos a color, 3x4",
      ],
    },
    {
      title: "Requisitos para realizar La Registración",
      content: [
        "Pasaporte original",
        "Carta de migración original",
        "Certificado de estudio",
        "Última registración realizada",
      ],
    },
    {
      title: "Requisitos para la realizacion del Certificado Médico Estatal",
      content: [
        "Pasaporte original",
        "Registración",
        "Carta de migración",
        "Traducción notariada de la primera página del pasaporte",
        <span key="cost">
          Costo de exámenes:{" "}
          <span className="font-medium text-blue-700">7200 RUB</span>
        </span>,
      ],
    },
    {
      title: "Requisitos para la realizacion de Las Huellas Dactilares",
      content: [
        "Pasaporte original",
        "Traducción notariada de la primera página del pasaporte",
        "Registración",
        "Carta de migración",
        "Resultados de exámenes médicos estatales",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Navbar Vertical */}
      <div className="w-full lg:w-2/5 xl:w-5/12 bg-blue-100 border-r border-blue-200 p-8 flex flex-col items-center">
        <div className="text-center mb-8 w-full max-w-xs">
          <h1 className="text-3xl font-light text-blue-800">
            Elige tu necesidad
          </h1>
          <p className="text-xl text-blue-600 mt-2 italic">
            ¿Qué trámite necesitas?
          </p>
        </div>

        <div className="flex flex-col space-y-4 w-full max-w-xs">
          {[
            "Visa",
            "Registración",
            "Certificado Médico",
            "Huellas Dactilares",
          ].map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 text-lg font-light text-center rounded-xl transition-all duration-300
                        ${
                          activeTab === index
                            ? "bg-blue-600 text-white shadow-md"
                            : "text-blue-700 hover:bg-blue-200"
                        }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Área de Contenido */}
      <div className="flex-1 p-6 lg:p-10 overflow-auto flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-blue-100 mx-auto">
            <h2 className="text-xl font-semibold text-blue-800 mb-6 text-center border-b border-blue-100 pb-3">
              {tabs[activeTab].title}
            </h2>
            <ul className="space-y-3 text-blue-900/90 list-disc pl-6 max-w-lg mx-auto">
              {tabs[activeTab].content.map((item, index) => (
                <li key={index} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
