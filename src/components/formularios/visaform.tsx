"use client";

import createVisa from "@/actions/createVisa";
import { useActionState, useState } from "react";
import { useTranslations } from "next-intl";
import { CldUploadButton } from "next-cloudinary";

export default function Visa() {
  const [state, formAction] = useActionState(createVisa, null);
  const [imageUrl, setImageUrl] = useState("");
  const t = useTranslations("Visa");

  const handleUploadSuccess = (result: any) => {
    setImageUrl(result.info.secure_url);
  };

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
            {t("name")}
          </label>
          <input
            type="text"
            name="namev"
            className="w-full p-1.5 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            {t("surname")}
          </label>
          <input
            type="text"
            name="surnamev"
            className="w-full p-1.5 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            {t("passportNumber")}
          </label>
          <input
            type="text"
            name="nump"
            className="w-full p-1.5 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            {t("emissionDate")}
          </label>
          <input
            type="date"
            name="emisiondate"
            className="w-full p-1.5 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="block text-white text-sm font-medium">
              {t("entry")}
            </label>
            <input
              type="date"
              name="entry"
              className="w-full p-1.5 rounded border border-gray-300 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-white text-sm font-medium">
              {t("until")}
            </label>
            <input
              type="date"
              name="until"
              className="w-full p-1.5 rounded border border-gray-300 text-sm"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            {t("uploadImage")}
          </label>
          <CldUploadButton
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onSuccess={handleUploadSuccess}
            signatureEndpoint="/api/sign-cloudinary-params"
            options={{
              multiple: false,
              sources: ["local"],
              maxFiles: 1,
              cropping: true,
            }}
            className="w-full bg-white text-blue-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-100"
          >
            {imageUrl ? t("imageUploadedSuccess") : t("uploadButtonText")}
          </CldUploadButton>
          {imageUrl && (
            <div className="mt-2">
              <img
                src={imageUrl}
                alt="Visa Preview"
                className="w-full h-auto max-h-40 object-contain border rounded"
              />
              <input type="hidden" name="imageUrl" value={imageUrl} />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!imageUrl}
          className="mt-2 bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
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
