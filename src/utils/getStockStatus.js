export const getStockStatus = (quantity) => {
  if (quantity === 0) return "agotado";
  if (quantity === 1) return "critico";
  if (quantity === 2) return "bajo";
  return "";
};

export function displayByMap(value, map, defaultText = "", normalize = true) {
  const key = normalize ? String(value).toLowerCase() : value;
  return map?.[key] ?? defaultText;
}

export function getTextColorClass(value, colorMap = {}, defaultClass = "text-slate-500") {
  return colorMap?.[value] ?? defaultClass;
}