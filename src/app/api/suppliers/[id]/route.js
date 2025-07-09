import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const supplierProfile = await db.supplierProfile.findUnique({
      where: { id },
    });

    return NextResponse.json(supplierProfile, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el proveedor por Id:", error);
    return NextResponse.json(
      { message: "No se pudo obtener el proveedor", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingSupplier = await db.supplierProfile.findUnique({
      where: { id },
    });

    if (!existingSupplier) {
      return NextResponse.json(
        {
          data: null,
          message: "Proveedor no encontradO",
        },
        { status: 404 }
      );
    }
    const deleteSupplier = await db.supplierProfile.delete({
      where: { id },
    });

    return NextResponse.json(deleteSupplier, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el Proveedor por Id:", error);
    return NextResponse.json(
      { message: "Fallo al eliminar el Proveedor", error },
      { status: 500 }
    );
  }
}
