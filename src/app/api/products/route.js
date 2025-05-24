import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
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
      taxes,
      imageUrl,
      isActive,
      categoryId,
      supplierId,
    } = await request.json();

    const newProduct = await db.product.create({
      data: {
        title,
        sku,
        slug,
        barcode,
        description,
        price,
        salePrice,
        quantity,
        tags,
        taxes,
        imageUrl,
        isActive,
        categoryId,
        supplierId,
      },
    });
    console.log("Nuevo producto creado:", newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error al registrar el producto:", error);
    return NextResponse.json(
      { message: "No se pudo registrar el producto", error },
      { status: 500 }
    );
  }
}
