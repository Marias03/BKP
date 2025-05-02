"use client";

import Calendario from "@/components/calendario";
import FormCita from "@/components/formularios/FormCita";
import ListaCitas from "@/components/ListaCitas";
import { useState, useEffect } from "react";

export default function CitasComponent() {
  const [citas, setCitas] = useState<any[]>([]);
  const [vista, setVista] = useState("lista");
  const [direccion, setDireccion] = useState("");
  // Cargar citas del localStorage
  useEffect(() => {
    const citasGuardadas = localStorage.getItem("citas");
    if (citasGuardadas) {
      setCitas(JSON.parse(citasGuardadas));
    }
  }, []);

  // Guardar citas cuando cambian
  useEffect(() => {
    localStorage.setItem("citas", JSON.stringify(citas));
  }, [citas]);

  const agregarCita = (nuevaCita: any) => {
    setCitas([
      ...citas,
      {
        ...nuevaCita,
        id: Date.now().toString(),
      },
    ]);
  };

  const eliminarCita = (id: any) => {
    setCitas(citas.filter((cita: any) => cita.id !== id));
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8">
        {" "}
        Agendacion de citas
      </h1>

      <div className="flex gap-4 mb-6 justify-center">
        <button
          onClick={() => setVista("lista")}
          className={`px-4 py-2 rounded-lg ${
            vista === "lista" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Ver Lista
        </button>
        <button
          onClick={() => setVista("calendario")}
          className={`px-4 py-2 rounded-lg ${
            vista === "calendario" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Ver Calendario
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

        <div className="bg-blue 500  p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Agendar Nueva Cita</h2>
          <h2 className="text-xl font-semibold mb-4"></h2>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Dirección</label>
            <select
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Seleccione una dirección</option>
              <option value="1">Gvardeiskaya 9</option>
              <option value="2">Gvardeiskaya 32</option>
              <option value="3">Universiade Village</option>
              <option value="4">Gabriloba 77</option>
            </select>
          </div>
          <FormCita onSubmit={agregarCita} />
        </div>
      </div>
    </div>
  );
}
