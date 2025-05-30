export function parseNumberOrNull(value) {
  if (value == null || value === "") return null;
  const numberValue = Number(value);
  return isNaN(numberValue) ? null : numberValue;
}
