import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const supplier = await db.user.findUnique({
      where: { id },
      include: { supplierProfile: true, products: true },
    });

    return NextResponse.json(supplier, { status: 200 });
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
    const existingUser = await db.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "Proveedor no encontradO",
        },
        { status: 404 }
      );
    }
    const deleteUser = await db.user.delete({
      where: { id },
    });

    return NextResponse.json(deleteUser, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el Proveedor por Id:", error);
    return NextResponse.json(
      { message: "Fallo al eliminar el Proveedor", error },
      { status: 500 }
    );
  }
}
