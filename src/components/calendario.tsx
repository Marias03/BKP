function Calendario({ appointments }: { appointments: any[] }) {
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  // Función para generar un mes de calendario
  const generateCalendar = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const weeks = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const days = [];

      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startDay) || day > daysInMonth) {
          days.push(null);
        } else {
          const currentDate = new Date(year, month, day);
          const hasAppointment = appointments.some((appt) => {
            const apptDate = new Date(appt.start);
            return (
              apptDate.getDate() === day &&
              apptDate.getMonth() === month &&
              apptDate.getFullYear() === year
            );
          });

          days.push({
            day,
            hasAppointment,
            date: currentDate,
          });
          day++;
        }
      }

      weeks.push(days);
      if (day > daysInMonth) break;
    }

    return weeks;
  };

  const calendarWeeks = generateCalendar();

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-medium py-2">
            {day}
          </div>
        ))}
      </div>

      {calendarWeeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 gap-1">
          {week.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className={`border rounded min-h-16 p-1 ${
                day ? "bg-white" : "bg-gray-50"
              }`}
            >
              {day && (
                <>
                  <div className="text-right">{day.day}</div>
                  {day.hasAppointment && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="mt-4 flex items-center justify-center">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
          <span className="text-sm">Cita programada</span>
        </div>
      </div>
    </div>
  );
}

export default Calendario;
