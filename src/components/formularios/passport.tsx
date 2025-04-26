"use client";

import createCmedico from "@/actions/createPassport";

import { useActionState } from "react";
export default function cmedico() {
  const [state, formAction] = useActionState(createCmedico, null);
  return (
    <div className="flex justify-start ml-4">
      <form
        action={formAction}
        className="flex flex-col gap-2 max-w-sm bg-blue-200 p-4 rounded"
      >
        <label> serie del documento</label>
        <input type="text" name="seriall" />

        <label>Numero de documento </label>
        <input type="text" name="numberpas" />

        <label>Fecha de emisión del documento</label>
        <input type="date" name="datepas" />

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
