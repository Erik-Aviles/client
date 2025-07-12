import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const category = await db.category.findUnique({
      where: { id },
      include: { products: true },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las categorias por Id:", error);
    return NextResponse.json(
      { message: "No se pudieron obtener las categorias", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingCategory = await db.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: "Categoria no encontrada",
        },
        { status: 404 }
      );
    }
    const deleteCategory = await db.category.delete({
      where: { id },
    });

    return NextResponse.json(deleteCategory, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar la categoria por Id:", error);
    return NextResponse.json(
      { message: "Fallo al eliminar la categoria", error },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params: { id } }) {
  try {
    const { title, slug, description, imageUrl, isActive } =
      await request.json();

    const existingCategory = await db.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { data: null, message: "Categoria no encontrada" },
        { status: 404 }
      );
    }

    const updateCategory = await db.category.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        imageUrl,
        isActive,
      },
    });
    return NextResponse.json(updateCategory, { status: 201 });
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    return NextResponse.json(
      { message: "No se pudo actualizar la categoría", error },
      { status: 500 }
    );
  }
}
