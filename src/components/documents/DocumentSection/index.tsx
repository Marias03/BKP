"use client";

import { useState } from "react";
import Datos from "@/components/formularios/Datosform";
import Registracion from "@/components/formularios/Registracionform";
import Cmedico from "@/components/formularios/Cmedicoform";
import Passport from "@/components/formularios/passport";
import FingerPrints from "@/components/formularios/fingerprintsfrom";
import Visa from "@/components/formularios/visaform";
import { useTranslations } from "next-intl";

export default function DocumentsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const t = useTranslations("Documents");

  const tabs = [
    { name: t("personalData"), component: <Datos /> },
    { name: t("registration"), component: <Registracion /> },
    { name: t("medicalCertificate"), component: <Cmedico /> },
    { name: t("passport"), component: <Passport /> },
    { name: t("fingerprints"), component: <FingerPrints /> },
    { name: t("visa"), component: <Visa /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <div className="w-full lg:w-2/5 xl:w-5/12 bg-blue-100 border-r border-blue-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-blue-800">{t("title")}</h1>
          <p className="text-xl text-blue-700 mt-2 italic">{t("subtitle")}</p>
        </div>

        <div className="flex flex-col space-y-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-8 py-4 text-xl font-light text-left rounded-xl transition-all duration-300
                ${
                  activeTab === index
                    ? "bg-blue-700 text-white shadow-md"
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
