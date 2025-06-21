"use client";

import createUserInfo from "@/actions/createUserInfo";
import { useActionState } from "react";
import { useTranslations } from "next-intl";

export default function Datos() {
  const [state, formAction] = useActionState(createUserInfo, null);
  const t = useTranslations("Datos");

  return (
    <div className="flex justify-center pt-4">
      <form
        action={formAction}
        className="flex flex-col gap-2 w-full max-w-sm bg-blue-400 p-4 rounded-md mt-2"
      >
        <h1 className="text-lg font-bold text-white text-center mb-2">
          {t("title")}
        </h1>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            {t("name")}
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            {t("surname")}
          </label>
          <input
            type="text"
            name="surname"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            {t("birthdate")}
          </label>
          <input
            type="date"
            name="birthdate"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            {t("passport")}
          </label>
          <input
            type="text"
            name="passportNum"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            {t("phone")}
          </label>
          <input
            type="text"
            name="phoneNumber"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            {t("nationality")}
          </label>
          <input
            type="text"
            name="nacionality"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            {t("url")}
          </label>
          <input
            type="text"
            name="imageUrl"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <button
          type="submit"
          className="mt-2 bg-blue-800 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-600 transition-colors"
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
