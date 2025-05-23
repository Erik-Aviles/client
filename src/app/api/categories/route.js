import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, slug, description, imageUrl, marketIds, isActive } =
      await request.json();
    const newCategory = {
      title,
      slug,
      description,
      imageUrl,
      marketIds,
      isActive,
    };
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
