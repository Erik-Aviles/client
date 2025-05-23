import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, link, imageUrl, isActive } = await request.json();

    const newBanner = {
      title,
      link,
      imageUrl,
      isActive,
    };
    console.log("Nuevo banner creado: ", newBanner);
    return NextResponse.json(newBanner, { status: 201 });
  } catch (error) {
    console.error("Error al crear el banner: ", error);
    return NextResponse.json(
      { message: "No se pudo crear el banner ", error },
      { status: 500 }
    );
  }
}
