import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const products = await db.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return NextResponse.json(
      { message: "No se pudieron obtener los productos", error },
      { status: 500 }
    );
  }
}

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

     const existingProduct = await db.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      return NextResponse.json(
        { data: null, message: "Ya existe un producto con este slug" },
        { status: 409 }
      );
    }

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
