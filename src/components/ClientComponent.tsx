"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import ListaCitas from "./ListaCitas";
import Calendario from "./calendario";
import FormCita from "./formularios/FormCita";

export default function ClientComponent({
  citasIniciales,
}: {
  citasIniciales: any[];
}) {
  const t = useTranslations("Citas");
  const [citas, setCitas] = useState<any[]>(citasIniciales);
  const [vista, setVista] = useState("lista");

  const agregarCita = async (nuevaCita: any) => {
    const response = await fetch("/api/citas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaCita),
    });

    const citaCreada = await response.json();
    setCitas([...citas, citaCreada]);
  };

  const eliminarCita = async (id: any) => {
    await fetch(`/api/citas/${id}`, {
      method: "DELETE",
    });
    setCitas(citas.filter((cita: any) => cita.id !== id));
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8">{t("title")}</h1>

      <div className="flex gap-4 mb-6 justify-center">
        <button
          onClick={() => setVista("lista")}
          className={`px-4 py-2 rounded-lg ${
            vista === "lista" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {t("viewList")}
        </button>
        <button
          onClick={() => setVista("calendario")}
          className={`px-4 py-2 rounded-lg ${
            vista === "calendario" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {t("viewCalendar")}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          {vista === "lista" ? (
            <ListaCitas appointments={citas} onDelete={eliminarCita} />
          ) : (
            <Calendario appointments={citas} />
          )}
        </div>

        <div className="bg-blue-500 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{t("newAppointment")}</h2>
          <FormCita onSubmit={agregarCita} />
        </div>
      </div>
    </div>
  );
}
