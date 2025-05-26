import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const markets = await db.market.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(markets, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los mercados:", error);
    return NextResponse.json(
      { message: "No se pudieron obtener los mercados", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { title, motto, slug, logoUrl, description, categoryIds, isActive } =
      await request.json();

    const existingMarket = await db.market.findUnique({
      where: { slug },
    });

    if (existingMarket) {
      return NextResponse.json(
        { data: null, message: "Ya existe un mercado con este slug" },
        { status: 409 }
      );
    }
    
    const newMarket = await db.market.create({
      data: {
        title,
        motto,
        slug,
        logoUrl,
        description,
        categoryIds,
        isActive,
      },
    });
    console.log("Nueva mercado creado:", newMarket);
    return NextResponse.json(newMarket, { status: 201 });
  } catch (error) {
    console.error("Error al crear mercado:", error);
    return NextResponse.json(
      { message: "No se pudo crear el mercado", error },
      { status: 500 }
    );
  }
}
