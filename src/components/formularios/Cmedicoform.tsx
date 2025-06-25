"use client";

import createCmedico from "@/actions/createCmedico";
import { useActionState, useState } from "react";
import { useTranslations } from "next-intl";
import { CldUploadButton } from "next-cloudinary";

export default function Cmedico() {
  const [state, formAction] = useActionState(createCmedico, null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const t = useTranslations("Cmedico");

  const handleUploadSuccess = (result: any) => {
    setImageUrl(result.info.secure_url);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

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
              {t("medicalDocument")} {/* Cambiado de "url" */}
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
                resourceType: "auto",
                clientAllowedFormats: ["jpg", "png", "jpeg", "pdf"],
              }}
              className="w-full bg-white text-blue-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-100"
            >
              {imageUrl ? t("imageUploadedSuccess") : t("uploadButtonText")}
            </CldUploadButton>

            {uploadSuccess && (
              <div className="mt-2 p-2 bg-green-100 text-green-700 text-sm rounded text-center">
                ✓ {t("uploadConfirmation")}
              </div>
            )}

            {imageUrl && (
              <div className="mt-2">
                <img
                  src={imageUrl}
                  alt={t("medicalDocument")}
                  className="w-full h-auto max-h-40 object-contain border rounded"
                />
                <input type="hidden" name="imageUrl" value={imageUrl} />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!imageUrl}
            className="w-full bg-blue-700 hover:bg-blue-600 text-white py-1.5 px-4 rounded text-sm font-medium mt-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
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
