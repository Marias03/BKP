"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Necesarios() {
  const [activeTab, setActiveTab] = useState(0);
  const t = useTranslations("Necesarios");

  const tabs = [
    {
      title: t("visa.title"),
      content: [
        t("visa.items.0"),
        t("visa.items.1"),
        t("visa.items.2"),
        t("visa.items.3"),
        t("visa.items.4"),
        t("visa.items.5"),
        t("visa.items.6"),
        t("visa.items.7"),
      ],
    },
    {
      title: t("registration.title"),
      content: [
        t("registration.items.0"),
        t("registration.items.1"),
        t("registration.items.2"),
        t("registration.items.3"),
      ],
    },
    {
      title: t("medical.title"),
      content: [
        t("medical.items.0"),
        t("medical.items.1"),
        t("medical.items.2"),
        t("medical.items.3"),
        <span key="cost">
          {t("medical.items.4.label")}{" "}
          <span className="font-medium text-blue-700">
            {t("medical.items.4.value")}
          </span>
        </span>,
      ],
    },
    {
      title: t("fingerprints.title"),
      content: [
        t("fingerprints.items.0"),
        t("fingerprints.items.1"),
        t("fingerprints.items.2"),
        t("fingerprints.items.3"),
        t("fingerprints.items.4"),
      ],
    },
  ];

  const tabLabels = [
    t("labels.visa"),
    t("labels.registration"),
    t("labels.medical"),
    t("labels.fingerprints"),
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Navbar Vertical */}
      <div className="w-full lg:w-2/5 xl:w-5/12 bg-blue-100 border-r border-blue-200 p-8 flex flex-col items-center">
        <div className="text-center mb-8 w-full max-w-xs">
          <h1 className="text-3xl font-light text-blue-800">
            {t("header.title")}
          </h1>
          <p className="text-xl text-blue-600 mt-2 italic">
            {t("header.subtitle")}
          </p>
        </div>

        <div className="flex flex-col space-y-4 w-full max-w-xs">
          {tabLabels.map((tab, index) => (
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
