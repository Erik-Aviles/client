/**
 * Convierte una cadena en formato ISO 8601 a un objeto Date válido.
 * Si no incluye hora, se agrega la hora actual en UTC.
 *
 * @param {string} isoString - Fecha en formato ISO (con o sin hora)
 * @returns {Date} Objeto Date válido
 */

export function parseISODate(isoString) {
  if (!isoString) return null;

  let finalString = isoString;

  // Si la cadena es solo una fecha (YYYY-MM-DD), agregar hora UTC actual
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoString)) {
    const now = new Date();
    const hours = now.getUTCHours().toString().padStart(2, "0");
    const minutes = now.getUTCMinutes().toString().padStart(2, "0");
    const seconds = now.getUTCSeconds().toString().padStart(2, "0");

    finalString = `${isoString}T${hours}:${minutes}:${seconds}Z`; // Z = UTC
  }

  const date = new Date(finalString);

  if (isNaN(date.getTime())) {
    throw new Error("Fecha no válida (debe estar en formato ISO 8601)");
  }

  return date;
}
