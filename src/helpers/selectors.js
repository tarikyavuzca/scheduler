export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter((e) => e.name === day);

  let appointments = [];

  if (filteredAppointments.length) {
    appointments = filteredAppointments[0].appointments.map(
      (index) => state.appointments[index]
    );
  }

  return appointments;
}
