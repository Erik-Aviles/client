import db from "@/lib/db";
import { parseNumberOrNull } from "@/lib/parseNumberOrNull";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = await params;
  try {
    const product = await db.product.findUnique({
      where: { slug },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el Producto por Id:", error);
    return NextResponse.json(
      { message: "No se pudo obtener el Producto", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Producto no encontrado",
        },
        { status: 404 }
      );
    }
    const deleteProduct = await db.product.delete({
      where: { id },
    });

    return NextResponse.json(deleteProduct, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el Producto por Id:", error);
    return NextResponse.json(
      { message: "Fallo al eliminar el Producto", error },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;

  try {
    const {
      title,
      sku,
      slug,
      barcode,
      description,
      price,
      salePrice,
      quantity,
      tags,
      hasDiscount,
      imageUrl,
      isActive,
      categoryId,
      userId,
    } = await request.json();

    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Producto no encontrado",
        },
        { status: 404 }
      );
    }

    if (slug) {
      const slugExists = await db.product.findFirst({
        where: {
          slug,
          NOT: { id }, // Excluye el producto actual
        },
      });

      if (slugExists) {
        return NextResponse.json(
          { message: "El nombre ya está en uso por otro producto" },
          { status: 400 }
        );
      }
    }
    
    if (categoryId) {
      const categoryExists = await db.category.findUnique({
        where: { id: categoryId },
      });
      if (!categoryExists) {
        return NextResponse.json(
          { message: "Categoría no encontrada" },
          { status: 400 }
        );
      }
    }

    if (userId) {
      const userExists = await db.user.findUnique({
        where: { id: userId },
      });
      if (!userExists) {
        return NextResponse.json(
          { message: "Proveedor no encontrado" },
          { status: 400 }
        );
      }
    }
    const quantityNumber = parseNumberOrNull(quantity);

    const updateData = {
      title,
      sku,
      slug,
      barcode,
      description,
      price,
      salePrice,
      quantity: quantityNumber,
      stock: quantityNumber,
      tags,
      hasDiscount,
      imageUrl,
      isActive,
    };

    if (categoryId) updateData.categoryId = categoryId;
    if (userId) updateData.userId = userId;

    const updateProduct = await db.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updateProduct, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar el Producto por Id:", error);
    return NextResponse.json(
      { message: "Fallo al actualizar el Producto", error },
      { status: 500 }
    );
  }
}
