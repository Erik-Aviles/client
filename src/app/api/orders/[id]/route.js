import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const order = await db.order.findUnique({
      where: { id },
      include: { coupon: true, orderItems: true },
    });

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error al obtener la orden por Id:", error);
    return NextResponse.json(
      { message: "No se pudo obtener la orden", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    const existingOrder = await db.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      return NextResponse.json(
        {
          data: null,
          message: "Orden no encontrada",
        },
        { status: 404 }
      );
    }
    const deleteOrder = await db.order.delete({
      where: { id },
    });

    return NextResponse.json(deleteOrder, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar la orden por Id:", error);
    return NextResponse.json(
      { message: "Fallo al eliminar la orden", error },
      { status: 500 }
    );
  }
}

/* export async function PUT(request, { params }) {
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
} */
