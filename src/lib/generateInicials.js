export function generateInicials(firstName = "", lastName = "") {
  const firstWord = firstName.trim().split(/\s+/)[0] || "";
  const lastWord = lastName.trim().split(/\s+/)[0] || "";

  const first = firstWord[0] || "";
  const last = lastWord[0] || "";

  if (!first && !last) return "";

  return (first + last).toUpperCase();
}
