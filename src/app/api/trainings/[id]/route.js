import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const training = await db.training.findUnique({
      where: { id },
    });

    return NextResponse.json(training, { status: 200 });
  } catch (error) {
    console.error("Error al obtener la capacitacion por Id:", error);
    return NextResponse.json(
      { message: "No se pudo obtener la capacitacion", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingTraining = await db.training.findUnique({
      where: { id },
    });

    if (!existingTraining) {
      return NextResponse.json(
        {
          data: null,
          message: "Capacitacion no encontrada",
        },
        { status: 404 }
      );
    }
    const deleteTraining = await db.training.delete({
      where: { id },
    });

    return NextResponse.json(deleteTraining, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar la Capacitacion por Id:", error);
    return NextResponse.json(
      { message: "Fallo al eliminar la Capacitacion", error },
      { status: 500 }
    );
  }
}
