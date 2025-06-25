import createCita from "@/actions/createCita";
import { CitaType, ErrorType } from "@/types/model";
import { ChangeEvent, useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import StripeModal from "@/components/StripeModal";

export default function FormCita({
  onSubmit,
}: {
  onSubmit: (nuevaCita: any) => void;
}) {
  const t = useTranslations("FormCita");
  const [direccion, setDireccion] = useState("");
  const [formData, setFormData] = useState<CitaType>({
    title: "",
    fecha: "",
    hora: "",
    descripcion: "",
    direccion: "",
  });

  const [errores, setErrores] = useState<ErrorType>({});
  const [isOpen, setOpen] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validarFormulario = (): boolean => {
    const nuevosErrores: ErrorType = {};

    if (!formData.title.trim()) {
      nuevosErrores.titulo = t("errors.title.required");
    } else if (formData.title.trim().length < 3) {
      nuevosErrores.titulo = t("errors.title.min");
    }

    if (!formData.fecha) {
      nuevosErrores.fecha = t("errors.date.required");
    } else {
      const fechaSeleccionada = new Date(formData.fecha);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      if (fechaSeleccionada < hoy) {
        nuevosErrores.fecha = t("errors.date.past");
      }
    }

    if (!formData.hora) {
      nuevosErrores.hora = t("errors.time.required");
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handlePaySuccess = async () => {
    const horaDate = new Date();
    horaDate.setHours(parseInt(formData.hora.split(":")[0]));
    horaDate.setMinutes(parseInt(formData.hora.split(":")[1]));

    const cita = {
      title: formData.title,
      fecha: new Date(formData.fecha),
      direccion,
      descripcion: formData.descripcion.trim(),
      hora: horaDate,
      inicio: new Date(`${formData.fecha}T${formData.hora}:00`).toISOString(),
      fin: new Date(
        new Date(`${formData.fecha}T${formData.hora}:00`).getTime() +
          60 * 60 * 1000
      ).toISOString(),
    };

    setOpen(false);
    const createdCita = await createCita(cita);
    onSubmit(createdCita);

    setFormData({
      title: "",
      fecha: "",
      hora: "",
      descripcion: "",
      direccion: "",
    });
    setDireccion("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    if (formData.title == "Visa") {
      setOpen(true);
    } else await handlePaySuccess();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block mb-2 font-semibold">
            {t("labels.address")}
          </label>
          <select
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">{t("placeholders.selectAddress")}</option>
            <option value="1">Gvardeiskaya 9</option>
            <option value="2">Gvardeiskaya 32</option>
            <option value="3">Universiade Village</option>
            <option value="4">Gabriloba 77</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            {t("labels.title")}*
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={t("placeholders.title")}
            className={`w-full p-2 border rounded-md ${
              errores.titulo ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errores.titulo && (
            <p className="text-red-500 text-sm mt-1">{errores.titulo}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">
              {t("labels.date")}*
            </label>
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
            <label className="block mb-1 font-semibold">
              {t("labels.time")}*
            </label>
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
          <label className="block mb-1 font-semibold">
            {t("labels.description")}
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={3}
            placeholder={t("placeholders.description")}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {formData.title != "Visa" ? t("buttons.submit") : "Оплатить"}
        </button>
      </form>
      <StripeModal
        open={isOpen}
        onClose={() => setOpen(false)}
        onSuccess={handlePaySuccess}
      />
    </>
  );
}
