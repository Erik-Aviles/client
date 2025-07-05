export function formatDateToEcuador(date) {
  if (!date) return "";

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Guayaquil",
  };

  return new Intl.DateTimeFormat("es-EC", options).format(new Date(date));
}
