import Calendario from "@/components/calendario";
import FormCita from "@/components/formularios/FormCita";
import ListaCitas from "@/components/ListaCitas";
import prisma from "@/lib/prisma/client";

import { useState } from "react";
import ClientComponent from "./ClientComponent";

export default async function CitasComponent() {
  // Fetch de las citas desde Prisma directamente
  const citasIniciales = await prisma.cita.findMany({
    orderBy: {
      fecha: "asc",
    },
  });

  // Convertir fechas a string para la serialización

  return <ClientComponent citasIniciales={citasIniciales} />;
}
