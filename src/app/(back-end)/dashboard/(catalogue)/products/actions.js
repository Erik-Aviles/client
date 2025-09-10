"use server";

import db from "@/lib/db";

export async function fetchProducts() {
  try {
    const products = await db.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return products;
  } catch (error) {
    console.error("Error al obtener productos con Prisma:", error);
    throw new Error("No se pudieron cargar los productos");
  }
}
