"use client";

import createVisa from "@/actions/createVisa";
import { useActionState } from "react";
export default function registracion() {
  const [state, formAction] = useActionState(createVisa, null);
  return (
    <div className="flex justify-start ml-4">
      <form
        action={formAction}
        className="flex flex-col gap-2 max-w-sm bg-blue-200 p-4 rounded"
      >
        <label> Nombres</label>
        <input type="text" name="namev" />

        <label>Apellidos </label>
        <input type="text" name="surnamev" />

        <label>Numero de pasaporte </label>
        <input type="text" name="nump" />

        <label>Fecha de emision </label>
        <input type="date" name="emisiondate" />

        <label> Desde</label>
        <input type="date" name="entry" />

        <label>Hasta</label>
        <input type="date" name="Until" />

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
