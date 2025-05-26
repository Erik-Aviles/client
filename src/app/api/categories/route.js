import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const categories = await db.category.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las categorias:", error);
    return NextResponse.json(
      { message: "No se pudieron obtener las categorias", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { title, slug, description, imageUrl, isActive } =
      await request.json();

    const existingCategory = await db.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return NextResponse.json(
        { data: null, message: "Ya existe una categoría con este slug" },
        { status: 409 }
      );
    }

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
