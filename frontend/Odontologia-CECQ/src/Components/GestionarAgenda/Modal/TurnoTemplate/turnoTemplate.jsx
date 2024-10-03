export const turnoTemplate = (formData, agendaSeleccionado) => ({
  "horaInicio": formData.horaInicio,
  "horaFin": formData.horaFin,
  "diaSemana": formData.diaSemana,
  "agenda": agendaSeleccionado,
});