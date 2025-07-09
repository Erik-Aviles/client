import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const market = await db.market.findUnique({
      where: { id },
    });

    return NextResponse.json(market, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el negocio por Id:", error);
    return NextResponse.json(
      { message: "No se pudo obtener el negocio", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingMarket = await db.market.findUnique({
      where: { id },
    });

    if (!existingMarket) {
      return NextResponse.json(
        {
          data: null,
          message: "Negocio no encontrado",
        },
        { status: 404 }
      );
    }
    const deleteMarket = await db.market.delete({
      where: { id },
    });

    return NextResponse.json(deleteMarket, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el Negocio por Id:", error);
    return NextResponse.json(
      { message: "Fallo al eliminar el Negocio", error },
      { status: 500 }
    );
  }
}
