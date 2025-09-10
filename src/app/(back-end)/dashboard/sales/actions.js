"use server";

import db from "@/lib/db";

export async function fetchSales() {
  try {
    const sales = await db.sale.findMany({
      orderBy: { createdAt: "desc" },
    });

    return sales;
  } catch (error) {
    console.error("Error al obtener ventas con Prisma:", error);
    throw new Error("No se pudieron cargar las ventas");
  }
}
