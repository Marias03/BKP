"use client";

import createFingerPrints from "@/actions/createFingerPrints";
import { useActionState } from "react";

export default function FingerPrints() {
  const [state, formAction] = useActionState(createFingerPrints, null);
  return (
    <div className="flex justify-center pt-4">
      <form
        action={formAction}
        className="flex flex-col gap-2 w-full max-w-sm bg-blue-400  p-4 rounded-md"
      >
        <h1 className="text-lg font-bold text-white text-center mb-2">
          Actualiza tus Huellas dactilares
        </h1>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Serie del documento:
          </label>
          <input
            type="text"
            name="serialf"
            className="w-full p-1.5 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Número de documento:
          </label>
          <input
            type="text"
            name="numberf"
            className="w-full p-1.5 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Fecha de emisión:
          </label>
          <input
            type="date"
            name="datef"
            className="w-full p-1.5 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Emitido por:
          </label>
          <input
            type="text"
            name="emision"
            className="w-full p-1.5 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            URL del documento:
          </label>
          <input
            type="text"
            name="imageUrl"
            className="w-full p-1.5 rounded border border-gray-300 text-sm"
          />
        </div>

        <button
          type="submit"
          className="mt-2 bg-blue-700  text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          Guardar
        </button>

        {state?.error && (
          <p className="text-red-500 text-center text-sm mt-1">{state.error}</p>
        )}
        {state?.success && (
          <p className="text-green-500 text-center text-sm mt-1">
            ¡Huellas dactilares registradas exitosamente!
          </p>
        )}
      </form>
    </div>
  );
}
