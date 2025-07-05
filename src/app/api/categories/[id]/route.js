import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const category = await db.category.findUnique({
      where: { id },
      include: { products: true },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las categorias por Id:", error);
    return NextResponse.json(
      { message: "No se pudieron obtener las categorias", error },
      { status: 500 }
    );
  }
}
