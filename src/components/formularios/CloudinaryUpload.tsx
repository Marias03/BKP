"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function CloudinaryUpload({
  onImageUploaded,
  label,
}: {
  onImageUploaded: (url: string) => void;
  label: string;
}) {
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = (result: any) => {
    if (result?.event === "success") {
      setImageUrl(result.info.secure_url);
      onImageUploaded(result.info.secure_url);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        signatureEndpoint="/api/sign-cloudinary-params"
        options={{
          sources: ["local"],
          multiple: false,
          maxFileSize: 5242880, // 5MB
        }}
        onUpload={handleUpload}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="w-full bg-gray-100 hover:bg-gray-200 p-2 rounded border"
          >
            {imageUrl ? "✓ Imagen cargada" : "Seleccionar imagen"}
          </button>
        )}
      </CldUploadWidget>

      {imageUrl && <input type="hidden" name="imageUrl" value={imageUrl} />}
    </div>
  );
}
