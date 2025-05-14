export function generateCouponCode(title, expirationDate) {
  const date = new Date(expirationDate);
  const formattedTitle = title?.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

  const year = date.getFullYear().toString().slice(-2); // Solo los dos últimos dígitos
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Mes en dos dígitos
  const day = date.getDate().toString().padStart(2, "0"); // Día en dos dígitos

  const formattedDate = `${year}${month}${day}`; // Ej: "250403"

  const randomSuffix = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  const couponCode = `${formattedTitle}-${formattedDate}@${randomSuffix}`;
  return couponCode;
}