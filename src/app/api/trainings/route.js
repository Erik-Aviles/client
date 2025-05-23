import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      title,
      expertId,
      categoryId,
      slug,
      description,
      content,
      imageUrl,
      isActive,
    } = await request.json();
    const newTraining = {
      title,
      expertId,
      categoryId,
      slug,
      description,
      content,
      imageUrl,
      isActive,
    };
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
