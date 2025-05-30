import db from "@/lib/db";
import { generateUniqueProductCode } from "@/lib/generateCode";
import { parseNumberOrNull } from "@/lib/parseNumberOrNull";
import { companyData } from "@/utils/general/companyData";
import { NextResponse } from "next/server";

const nameCompany = companyData?.name;

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
    const productsData = await request.json();
    const { slug, title } = productsData;

    const existingSlug = await db.product.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return NextResponse.json(
        { data: null, message: "Ya existe un producto con este slug" },
        { status: 409 }
      );
    }

    const quantity = parseNumberOrNull(productsData?.quantity);
    const stock = parseNumberOrNull(productsData?.stock);
    const price = parseNumberOrNull(productsData?.price);
    const salePrice = parseNumberOrNull(productsData?.salePrice);

    let generatedCode = "";
    let isUnique = false;
    let attempts = 0;
    while (!isUnique && attempts < 5) {
      generatedCode = generateUniqueProductCode(nameCompany, title);
      const existingCode = await db.product.findUnique({
        where: { code: generatedCode },
      });
      if (!existingCode) {
        isUnique = true;
      } else {
        attempts++;
      }
    }

    if (!isUnique) {
      return NextResponse.json(
        { message: "No se pudo generar un código único" },
        { status: 500 }
      );
    }

    const newProduct = await db.product.create({
      data: {
        title: productsData.title,
        sku: productsData.sku,
        slug: productsData.slug,
        barcode: productsData.barcode,
        description: productsData.description,
        tags: productsData.tags,
        imageUrl: productsData.imageUrl,
        isActive: productsData.isActive,
        hasDiscount: productsData.hasDiscount,
        categoryId: productsData.categoryId,
        code: generatedCode,
        quantity,
        stock,
        price,
        salePrice,
        userId: productsData?.supplierId,
      },
    });
    console.log("Nuevo producto: ", newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error al registrar el producto:", error);
    return NextResponse.json(
      { message: "No se pudo registrar el producto", error },
      { status: 500 }
    );
  }
}
