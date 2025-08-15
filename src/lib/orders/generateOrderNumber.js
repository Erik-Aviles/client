import db from "../db";

export async function generateOrderNumber() {
  const prefix = "ORD";
  const year = new Date().getFullYear();

  // Buscar la última orden del año
  const lastOrder = await db.order.findFirst({
    where: {
      orderNumber: { startsWith: `${prefix}-${year}-` },
    },
    orderBy: {
      orderNumber: "desc",
    },
  });

  let nextNumber = 1;

  if (lastOrder) {
    const lastSeq = parseInt(lastOrder.orderNumber.split("-")[2], 10);
    nextNumber = lastSeq + 1;
  }

  const paddedNumber = String(nextNumber).padStart(4, "0");
  return `${prefix}-${year}-${paddedNumber}`;
}
