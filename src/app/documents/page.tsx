"use client";
import { useState } from "react";
import Datos from "@/components/formularios/Datosform";
import Registracion from "@/components/formularios/Registracionform";
import Cmedico from "@/components/formularios/Cmedicoform";
import Passport from "@/components/formularios/passport";
import FingerPrints from "@/components/formularios/fingerprintsfrom";
import Visa from "@/components/formularios/visaform";

export default function Documents() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Datos personales", component: <Datos /> },
    { name: "Registración", component: <Registracion /> },
    { name: "Certificado médico", component: <Cmedico /> },
    { name: "Pasaporte", component: <Passport /> },
    { name: "Huellas dactilares", component: <FingerPrints /> },
    { name: "Visa", component: <Visa /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Navbar Vertical - Muy ancho */}
      <div className="w-full lg:w-2/5 xl:w-5/12 bg-blue-100 border-r border-blue-200 p-8">
        <div className="text-center mb-8">
          {" "}
          {/* Contenedor centrado */}
          <h1 className="text-3xl font-light text-blue-800">Mis documentos</h1>
          <p className="text-xl text-blue-700  mt-2 italic">
            ¿Qué te gustaría actualizar hoy?
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-8 py-4 text-xl font-light text-left rounded-xl transition-all duration-300
                        ${
                          activeTab === index
                            ? "bg-blue-700  text-white shadow-md"
                            : "text-blue-600 hover:bg-blue-200"
                        }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-8 lg:p-12 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-blue-100">
            {tabs[activeTab].component}
          </div>
        </div>
      </div>
    </div>
  );
}
