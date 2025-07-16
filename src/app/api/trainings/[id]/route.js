import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;
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

export async function DELETE(request, { params }) {
  const { id } = await params;
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

export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    const {
      title,
      categoryId,
      slug,
      description,
      content,
      imageUrl,
      isActive,
    } = await request.json();

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
    const updateTraining = await db.training.update({
      where: { id },
      data: {
        title,
        categoryId,
        slug,
        description,
        content,
        imageUrl,
        isActive,
      },
    });

    return NextResponse.json(updateTraining, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar la Capacitacion por Id:", error);
    return NextResponse.json(
      { message: "Fallo al actualizar la Capacitacion", error },
      { status: 500 }
    );
  }
}
