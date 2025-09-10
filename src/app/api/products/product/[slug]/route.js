import db from "@/lib/db";
import { parseNumberOrNull } from "@/lib/parseNumberOrNull";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = await params;
  try {
    const product = await db.product.findUnique({
      where: { slug },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el Producto por Id:", error);
    return NextResponse.json(
      { message: "No se pudo obtener el Producto", error },
      { status: 500 }
    );
  }
}
