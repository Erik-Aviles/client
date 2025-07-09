import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const banner = await db.banner.findUnique({
      where: { id },
    });

    return NextResponse.json(banner, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el banner por Id:", error);
    return NextResponse.json(
      { message: "No se pudo obtener el banner", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingBanner = await db.banner.findUnique({
      where: { id },
    });

    if (!existingBanner) {
      return NextResponse.json(
        {
          data: null,
          message: "Banner no encontrado",
        },
        { status: 404 }
      );
    }
    const deleteBanner = await db.banner.delete({
      where: { id },
    });

    return NextResponse.json(deleteBanner, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el Banner por Id:", error);
    return NextResponse.json(
      { message: "Fallo al eliminar el Banner", error },
      { status: 500 }
    );
  }
}
