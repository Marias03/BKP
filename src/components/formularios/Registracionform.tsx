"use client";

import createRegistration from "@/actions/createRegistration";
import { useActionState } from "react";

export default function Registracion() {
  const [state, formAction] = useActionState(createRegistration, null);
  return (
    <div className="flex justify-center pt-4">
      <form
        action={formAction}
        className="flex flex-col gap-2 w-full max-w-sm bg-blue-400 p-4 rounded-md"
      >
        <h1 className="text-lg font-bold text-white text-center mb-2">
          Añade tu registracion
        </h1>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Residencia actual:
          </label>
          <input
            type="text"
            name="residence"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Ciudad:
          </label>
          <input
            type="text"
            name="city"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Dirección:
          </label>
          <input
            type="text"
            name="adress"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Número de apartamento/habitación:
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
              Validez desde:
            </label>
            <input
              type="date"
              name="validation"
              className="w-full p-1 rounded border border-gray-300 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-white text-sm font-medium">
              Hasta:
            </label>
            <input
              type="date"
              name="finished"
              className="w-full p-1 rounded border border-gray-300 text-sm"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">URL:</label>
          <input
            type="text"
            name="imageUrl"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <button
          type="submit"
          className="mt-2 bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          Enviar
        </button>

        {state?.error && (
          <p className="text-red-500 text-center text-sm mt-1">{state.error}</p>
        )}
        {state?.success && (
          <p className="text-green-500 text-center text-sm mt-1">
            ¡Registro guardado!
          </p>
        )}
      </form>
    </div>
  );
}
