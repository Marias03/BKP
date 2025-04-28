"use client";

import createVisa from "@/actions/createVisa";
import { useActionState } from "react";

export default function Visa() {
  const [state, formAction] = useActionState(createVisa, null);
  return (
    <div className="flex justify-center pt-4">
      <form
        action={formAction}
        className="flex flex-col gap-2 w-full max-w-sm bg-blue-400 p-4 rounded-md"
      >
        <h1 className="text-lg font-bold text-white text-center mb-2">
          Actualiza tu visa
        </h1>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Nombres:
          </label>
          <input
            type="text"
            name="namev"
            className="w-full p-1.5 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Apellidos:
          </label>
          <input
            type="text"
            name="surnamev"
            className="w-full p-1.5 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Número de pasaporte:
          </label>
          <input
            type="text"
            name="nump"
            className="w-full p-1.5 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Fecha de emisión:
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
              Válida desde:
            </label>
            <input
              type="date"
              name="entry"
              className="w-full p-1.5 rounded border border-gray-300 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-white text-sm font-medium">
              Hasta:
            </label>
            <input
              type="date"
              name="Until"
              className="w-full p-1.5 rounded border border-gray-300 text-sm"
            />
          </div>
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
          className="mt-2 bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          Guardar
        </button>

        {state?.error && (
          <p className="text-red-500 text-center text-sm mt-1">{state.error}</p>
        )}
        {state?.success && (
          <p className="text-green-500 text-center text-sm mt-1">
            ¡Solicitud de visa registrada exitosamente!
          </p>
        )}
      </form>
    </div>
  );
}
