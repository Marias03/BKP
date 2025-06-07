"use client";

import createCmedico from "@/actions/createCmedico";
import { useActionState } from "react";
import { useTranslations } from "next-intl";

export default function Cmedico() {
  const [state, formAction] = useActionState(createCmedico, null);
  const t = useTranslations("Cmedico");

  return (
    <div className="flex justify-center pt-4">
      <div className="w-full max-w-md mx-4 bg-blue-400 rounded-lg p-4">
        <h2 className="text-lg font-bold text-white text-center mb-3 border-b border-blue-300 pb-2">
          {t("title")}
        </h2>

        <form action={formAction} className="space-y-3">
          <div className="space-y-1">
            <label className="block text-white text-sm font-medium">
              {t("serial")}
            </label>
            <input
              type="text"
              name="serial"
              className="w-full p-1.5 rounded border border-gray-300 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-white text-sm font-medium">
              {t("number")}
            </label>
            <input
              type="text"
              name="numberdoc"
              className="w-full p-1.5 rounded border border-gray-300 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-white text-sm font-medium">
              {t("issueDate")}
            </label>
            <input
              type="date"
              name="datedoc"
              className="w-full p-1.5 rounded border border-gray-300 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-white text-sm font-medium">
              {t("url")}
            </label>
            <input
              type="text"
              name="imageUrl"
              className="w-full p-1.5 rounded border border-gray-300 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-600 text-white py-1.5 px-4 rounded text-sm font-medium mt-2 transition-colors"
          >
            {t("submit")}
          </button>
        </form>

        {state?.error && (
          <p className="mt-2 text-red-500 text-center text-sm">{state.error}</p>
        )}
        {state?.success && (
          <p className="mt-2 text-green-500 text-center text-sm">
            {t("success")}
          </p>
        )}
      </div>
    </div>
  );
}
