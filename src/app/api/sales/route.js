import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const sales = await db.sale.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(sales, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las ventas:", error);
    return NextResponse.json(
      { message: "No se pudieron obtener las ventas", error },
      { status: 500 }
    );
  }
}
