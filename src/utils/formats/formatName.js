export function formatName(name) {
  if (!name) return ""; // manejar valores nulos o vacíos
  return name.split(" ").join("-").toLowerCase();
}
