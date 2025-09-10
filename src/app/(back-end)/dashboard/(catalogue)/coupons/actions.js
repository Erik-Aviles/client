"use server";

import db from "@/lib/db";

export async function fetchCoupons() {
  try {
    const coupons = await db.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });

    return coupons;
  } catch (error) {
    console.error("Error al obtener cupones con Prisma:", error);
    throw new Error("No se pudieron cargar los cupones");
  }
}
