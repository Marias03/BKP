"use client";

import createPassport from "@/actions/createPassport";
import { useActionState } from "react";
import { useTranslations } from "next-intl";

export default function Passport() {
  const [state, formAction] = useActionState(createPassport, null);
  const t = useTranslations("Passport");

  return (
    <div className="flex justify-center pt-4">
      <form
        action={formAction}
        className="flex flex-col gap-2 w-full max-w-sm bg-blue-400 p-4 rounded-md"
      >
        <h1 className="text-lg font-bold text-white text-center mb-2">
          {t("title")}
        </h1>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            {t("serial")}
          </label>
          <input
            type="text"
            name="seriall"
            className="w-full p-1.5 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            {t("number")}
          </label>
          <input
            type="text"
            name="numberpas"
            className="w-full p-1.5 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            {t("issuedBy")}
          </label>
          <input
            type="text"
            name="emisionp"
            className="w-full p-1.5 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            {t("issueDate")}
          </label>
          <input
            type="date"
            name="datepas"
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
          className="mt-2 bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          {t("submit")}
        </button>

        {state?.error && (
          <p className="text-red-500 text-center text-sm mt-1">{state.error}</p>
        )}
        {state?.success && (
          <p className="text-green-500 text-center text-sm mt-1">
            {t("success")}
          </p>
        )}
      </form>
    </div>
  );
}
