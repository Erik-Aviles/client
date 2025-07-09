import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const staff = await db.staff.findUnique({
      where: { id },
    });

    return NextResponse.json(staff, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el Personal por Id:", error);
    return NextResponse.json(
      { message: "No se pudo obtener el Personal", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingStaff = await db.staff.findUnique({
      where: { id },
    });

    if (!existingStaff) {
      return NextResponse.json(
        {
          data: null,
          message: "Personal no encontrado",
        },
        { status: 404 }
      );
    }
    const deleteStaff = await db.staff.delete({
      where: { id },
    });

    return NextResponse.json(deleteStaff, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el personal por Id:", error);
    return NextResponse.json(
      { message: "Fallo al eliminar el personal", error },
      { status: 500 }
    );
  }
}
