import { stopWords } from "../general/stopWords";

export function normalizeText(text) {
  return text
    ?.toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function removePluralEnding(word) {
  if (word.endsWith("es")) {
    return word.slice(0, -2); // Elimina "es" al final de la palabra
  } else if (word.endsWith("s")) {
    return word.slice(0, -1); // Elimina "s" al final de la palabra
  }
  return word; // Devuelve la palabra sin cambios si no termina en "s" o "es"
}
export function removeStopWords(text) {
  return text
    .split(" ")
    .filter((word) => !stopWords.includes(word.toLowerCase()))
    .join(" ");
}

export function capitalizeFirstWord(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}


export function cropText(text, limit = 50) {
  if (!text) return "";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
}
