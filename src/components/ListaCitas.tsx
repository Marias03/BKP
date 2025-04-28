function ListaCitas({
  appointments,
  onDelete,
}: {
  appointments: any[];
  onDelete: any;
}) {
  const formatDate = (dateString: any) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options as any);
  };

  return (
    <div>
      {appointments.length === 0 ? (
        <p className="text-center text-gray-500 py-4">No hay citas agendadas</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="py-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{appointment.title}</h3>
                  <p className="text-sm text-gray-600">
                    {formatDate(appointment.start)} - {appointment.duration} min
                  </p>
                  {appointment.description && (
                    <p className="text-sm mt-1">{appointment.description}</p>
                  )}
                </div>
                <button
                  onClick={() => onDelete(appointment.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaCitas;
