import { ChangeEvent, useState } from "react";

type CitaType = {
  titulo: string | null;
  fecha: string | null;
  hora: string | null;
};

export default function FormCita({
  onSubmit,
}: {
  onSubmit: (nuevaCita: any) => void;
}) {
  const [formData, setFormData] = useState({
    titulo: "",
    fecha: "",
    hora: "",
    descripcion: "",
  });

  const [errores, setErrores] = useState<CitaType>({} as CitaType);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duracion" ? parseInt(value, 10) : value,
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores: CitaType = {} as CitaType;

    // Validaciones de campos vacíos
    if (!formData.titulo.trim()) {
      nuevosErrores.titulo = "El título es obligatorio.";
    } else if (formData.titulo.trim().length < 3) {
      nuevosErrores.titulo = "El título debe tener al menos 3 caracteres.";
    }

    if (!formData.fecha) {
      nuevosErrores.fecha = "La fecha es obligatoria.";
    }

    if (!formData.hora) {
      nuevosErrores.hora = "La hora es obligatoria.";
    }

    // Validación conjunta de fecha y hora
    if (formData.fecha && formData.hora) {
      const fechaHora = new Date(`${formData.fecha}T${formData.hora}`);
      const ahora = new Date();
      if (fechaHora < ahora) {
        nuevosErrores.fecha = "No puedes agendar en el pasado.";
      }
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const inicio = new Date(`${formData.fecha}T${formData.hora}`);
    const fin = new Date(inicio.getTime() + 60000);

    const cita = {
      titulo: formData.titulo.trim(),
      descripcion: formData.descripcion.trim(),
      inicio: inicio.toISOString(),
      fin: fin.toISOString(),
    };

    if (typeof onSubmit === "function") {
      onSubmit(cita);
    }

    // Reiniciar formulario
    setFormData({
      titulo: "",
      fecha: "",
      hora: "",
      descripcion: "",
    });
    setErrores({} as CitaType);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Título */}
      <div>
        <label className="block mb-1 font-semibold">Tramite*</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Ej : Visa,Registracion"
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
          <label className="block mb-1 font-semibold">Fecha *</label>
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
          <label className="block mb-1 font-semibold">Hora *</label>
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
