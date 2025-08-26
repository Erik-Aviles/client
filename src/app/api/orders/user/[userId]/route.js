import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userId } = await params;
  try {
    const orders = await db.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { coupon: true, orderItems: true },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las ordenes por userId:", error);
    return NextResponse.json(
      { message: "No se pudo obtener las ordenes", error },
      { status: 500 }
    );
  }
}
