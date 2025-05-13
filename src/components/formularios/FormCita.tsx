import createCita from "@/actions/createCita";
import prisma from "@/lib/prisma/client";
import { CitaType, ErrorType } from "@/types/model";
import { ChangeEvent, useState, FormEvent } from "react";

export default function FormCita({
  onSubmit,
}: {
  onSubmit: (nuevaCita: any) => void;
}) {
  const [direccion, setDireccion] = useState("");

  const [formData, setFormData] = useState<CitaType>({
    title: "",
    fecha: "",
    hora: "",
    descripcion: "",
    direccion: "",
  });

  const [errores, setErrores] = useState<ErrorType>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validarFormulario = (): boolean => {
    const nuevosErrores: ErrorType = {};

    // Validación de título
    if (!formData.title.trim()) {
      nuevosErrores.titulo = "El título es obligatorio.";
    } else if (formData.title.trim().length < 3) {
      nuevosErrores.titulo = "El título debe tener al menos 3 caracteres.";
    }

    // Validación de fecha
    if (!formData.fecha) {
      nuevosErrores.fecha = "La fecha es obligatoria.";
    } else {
      const fechaSeleccionada = new Date(formData.fecha);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      if (fechaSeleccionada < hoy) {
        nuevosErrores.fecha = "No puedes agendar en el pasado.";
      }
    }

    // Validación de hora
    if (!formData.hora) {
      nuevosErrores.hora = "La hora es obligatoria.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const horaDate = new Date();
    horaDate.setHours(parseInt(formData.hora.split(":")[0]));
    horaDate.setMinutes(parseInt(formData.hora.split(":")[1]));
    // Crear objeto de cita con formato correcto
    const cita = {
      title: formData.title,
      fecha: new Date(formData.fecha), // Formato YYYY-MM-DD
      direccion: direccion,
      descripcion: formData.descripcion.trim(),
      hora: horaDate,
      inicio: new Date(`${formData.fecha}T${formData.hora}:00`).toISOString(),
      fin: new Date(
        new Date(`${formData.fecha}T${formData.hora}:00`).getTime() +
          60 * 60 * 1000
      ).toISOString(),
    };

    console.log(cita);

    await createCita(cita);
    onSubmit(cita);
    setFormData({
      title: "",
      fecha: "",
      hora: "",
      descripcion: "",
      direccion: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <div>
        <label className="block mb-1 font-semibold">Trámite*</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ej: Visa, Registración"
          className={`w-full p-2 border rounded-md ${
            errores.titulo ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errores.titulo && (
          <p className="text-red-500 text-sm mt-1">{errores.titulo}</p>
        )}
      </div>

      {/* Fecha y Hora */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Fecha*</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className={`w-full p-2 border rounded-md ${
              errores.fecha ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errores.fecha && (
            <p className="text-red-500 text-sm mt-1">{errores.fecha}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Hora*</label>
          <input
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              errores.hora ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errores.hora && (
            <p className="text-red-500 text-sm mt-1">{errores.hora}</p>
          )}
        </div>
      </div>

      {/* Descripción */}
      <div>
        <label className="block mb-1 font-semibold">Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows={3}
          placeholder="Detalles adicionales..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Agendar Cita
      </button>
    </form>
  );
}
