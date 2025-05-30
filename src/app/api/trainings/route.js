import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const trainings = await db.training.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(trainings, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los datos de las capacitaciones:", error);
    return NextResponse.json(
      { message: "No se pudieron obtener los datos de las capacitaciones", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
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
    const newTraining = await db.training.create({
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
    console.log("Nueva capacitación creada:", newTraining);
    return NextResponse.json(newTraining, { status: 201 });
  } catch (error) {
    console.error("Error al crear capacitación:", error);
    return NextResponse.json(
      { message: "No se pudo crear la capacitación", error },
      { status: 500 }
    );
  }
}
