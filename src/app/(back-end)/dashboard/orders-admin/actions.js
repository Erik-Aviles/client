"use server";

import db from "@/lib/db";

export async function fetchOrders() {
  try {
    const orders = await db.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        orderItems: true,
      },
    });

    return orders;
  } catch (error) {
    console.error("Error al obtener pedidos con Prisma:", error);
    throw new Error("No se pudieron cargar los pedidos");
  }
}
