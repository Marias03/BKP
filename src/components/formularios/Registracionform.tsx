"use client";

import createRegistration from "@/actions/createRegistration";
import { useActionState, useState } from "react";
import { useTranslations } from "next-intl";
import { CldUploadButton } from "next-cloudinary";

export default function Registracion() {
  const [state, formAction] = useActionState(createRegistration, null);
  const [imageUrl, setImageUrl] = useState("");
  const t = useTranslations("Registracion");

  const handleUploadSuccess = (result: any) => {
    console.log(result);
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
            {t("residence")}
          </label>
          <input
            type="text"
            name="residence"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            {t("city")}
          </label>
          <input
            type="text"
            name="city"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            {t("address")}
          </label>
          <input
            type="text"
            name="adress"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            {t("apartmentNumber")}
          </label>
          <input
            type="text"
            name="apartamentNumber"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="block text-white text-sm font-medium">
              {t("validFrom")}
            </label>
            <input
              type="date"
              name="validation"
              className="w-full p-1 rounded border border-gray-300 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-white text-sm font-medium">
              {t("validUntil")}
            </label>
            <input
              type="date"
              name="finished"
              className="w-full p-1 rounded border border-gray-300 text-sm"
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
                alt="Preview"
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
