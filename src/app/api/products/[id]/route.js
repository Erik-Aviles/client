import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const product = await db.product.findUnique({
      where: { id },
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

export async function DELETE(request, { params: { id } }) {
  try {
    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Producto no encontrado",
        },
        { status: 404 }
      );
    }
    const deleteProduct = await db.product.delete({
      where: { id },
    });

    return NextResponse.json(deleteProduct, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el Producto por Id:", error);
    return NextResponse.json(
      { message: "Fallo al eliminar el Producto", error },
      { status: 500 }
    );
  }
}
