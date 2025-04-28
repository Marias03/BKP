"use client";

import createUserInfo from "@/actions/createUserInfo";
import { useActionState } from "react";

export default function Datos() {
  const [state, formAction] = useActionState(createUserInfo, null);
  return (
    <div className="flex justify-center pt-4">
      {" "}
      {/* Removido min-h-screen y ajustado padding-top */}
      <form
        action={formAction}
        className="flex flex-col gap-2 w-full max-w-sm bg-blue-400 p-4 rounded-md mt-2"
      >
        <h1 className="text-lg font-bold text-white text-center mb-2">
          Escribe tus datos personales
        </h1>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Nombre:
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Apellidos:
          </label>
          <input
            type="text"
            name="surname"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Fecha nacimiento:
          </label>
          <input
            type="date"
            name="birthdate"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Pasaporte:
          </label>
          <input
            type="text"
            name="passportNum"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Teléfono:
          </label>
          <input
            type="text"
            name="phoneNumber"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Nacionalidad:
          </label>
          <input
            type="text"
            name="nacionality"
            className="w-full p-1 rounded border border-gray-300 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">Url:</label>
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
          Enviar
        </button>

        {state?.error && (
          <p className="text-red-500 text-center text-sm mt-1">{state.error}</p>
        )}
        {state?.success && (
          <p className="text-green-500 text-center text-sm mt-1">
            ¡Datos guardados!
          </p>
        )}
      </form>
    </div>
  );
}
