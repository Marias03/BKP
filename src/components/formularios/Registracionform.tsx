"use client";

import createRegistration from "@/actions/createRegistration";
import { useActionState } from "react";
export default function registracion() {
  const [state, formAction] = useActionState(createRegistration, null);
  return (
    <div className="flex justify-start ml-4">
      <form
        action={formAction}
        className="flex flex-col gap-2 max-w-sm bg-blue-200 p-4 rounded"
      >
        <label> residencia actual</label>
        <input type="text" name="residence" />

        <label>Ciudad </label>
        <input type="text" name="city" />

        <label>direccion </label>
        <input type="text" name="adress" />

        <label> Numero de apartamento (habitacion)</label>
        <input type="text" name="apartamentNumber" />

        <label>Período de validez del registro migratorio: Desde:</label>
        <input type="date" name="validation" />

        <label>hasta</label>
        <input type="date" name="finish" />

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
