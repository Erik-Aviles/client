import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, motto, slug, logoUrl, description, isActive } =
      await request.json();
    const newMarket = {
      title,
      motto,
      slug,
      logoUrl,
      description,
      isActive,
    };
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
