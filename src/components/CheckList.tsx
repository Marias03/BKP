"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

type Option = "recien_llegado" | "estudiante_antiguo";

export const CheckList: React.FC = () => {
  const t = useTranslations("CheckList");

  const [selectedOption, setSelectedOption] =
    useState<Option>("recien_llegado");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [allCompleted, setAllCompleted] = useState(false);

  const items = t.raw(selectedOption) as string[];

  const handleCheckboxChange = (item: string) => {
    const newCheckedItems = { ...checkedItems, [item]: !checkedItems[item] };
    setCheckedItems(newCheckedItems);

    const allChecked = items.every((it) => newCheckedItems[it]);
    setAllCompleted(allChecked);
  };

  const handleReset = () => {
    setCheckedItems({});
    setAllCompleted(false);
  };

  if (allCompleted) {
    return (
      <div className="max-w-xl mx-auto p-8 bg-green-50 border-2 border-green-200 rounded-2xl text-center">
        <div className="mb-6">
          <svg
            className="w-16 h-16 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-4">
          {t("all_completed")}
        </h3>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          {t("restart")}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t("title")}</h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <div className="mb-6">
        <select
          className="w-full px-4 py-3 border border-gray-200 rounded-lg"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value as Option)}
        >
          <option value="recien_llegado">{t("options.recien_llegado")}</option>
          <option value="estudiante_antiguo">
            {t("options.estudiante_antiguo")}
          </option>
        </select>
      </div>

      <ul className="space-y-4">
        {items.map((item, index) => (
          <li
            key={index}
            className={`p-4 rounded-xl min-h-[72px] flex items-center ${
              checkedItems[item] ? "bg-green-50" : "bg-gray-50"
            }`}
          >
            <label className="flex items-center space-x-4 cursor-pointer w-full">
              <input
                type="checkbox"
                checked={!!checkedItems[item]}
                onChange={() => handleCheckboxChange(item)}
                className="flex-shrink-0 w-6 h-6 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span
                className={`flex-grow ${
                  checkedItems[item] ? "line-through text-green-700" : ""
                }`}
              >
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckList;
