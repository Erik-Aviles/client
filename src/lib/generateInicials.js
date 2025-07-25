export function generateInicials(text = "") {
  if (!text.trim()) return "";

  const words = text.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0][0].toLowerCase();
  }

  const first = words[0][0];
  const last = words[words.length - 1][0];

  return (first + last).toUpperCase();
}
