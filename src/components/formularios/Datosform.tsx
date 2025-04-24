"use client";

import createUserInfo from "@/actions/createUserInfo";
import { useActionState } from "react";

export default function Datos() {
  const [state, formAction] = useActionState(createUserInfo, null);
  return (
    <div className="flex justify-start ml-4">
      <form
        action={formAction}
        className="flex flex-col gap-2 max-w-sm bg-blue-200 p-4 rounded"
      >
        <label>Nombres </label>
        <input type="text" name="name" />

        <label>Apellidos: </label>
        <input type="text" name="surname" />

        <label>Fecha de nacimiento </label>
        <input type="date" name="birthdate" />
        <label>Numero de Pasaporte </label>
        <input type="text" name="passportNum" />
        <label>Numero de Telefono </label>
        <input type="text" name="phoneNumber" />
        <label>Nacionalidad </label>
        <input type="text" name="nacionality" />

        <label>Url </label>
        <input type="text" name="imageUrl" />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>

        {state?.error && <p className="text-red-500">{state.error}</p>}
        {state?.success && (
          <p className="text-green-500">Data saved successfully!</p>
        )}
      </form>
    </div>
  );
}
