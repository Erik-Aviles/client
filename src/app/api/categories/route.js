import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, slug, description, imageUrl, isActive } =
      await request.json();
    const newCategory = await db.category.create({
      data: {
        title,
        slug,
        description,
        imageUrl,
        isActive,
      },
    });
    console.log("Nueva categoría creada:", newCategory);
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error al crear categoría:", error);
    return NextResponse.json(
      { message: "No se pudo crear la categoría", error },
      { status: 500 }
    );
  }
}
