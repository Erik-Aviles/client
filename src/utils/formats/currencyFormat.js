// Helpers
export const fmt = (v) => {
  const n = Number(v ?? 0);
  return n.toLocaleString("es-EC", { style: "currency", currency: "USD" });
};
