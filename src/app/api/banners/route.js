import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const banners = await db.banner.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(banners, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los banners:", error);
    return NextResponse.json(
      { message: "No se pudieron obtener los banners", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { title, link, imageUrl, isActive } = await request.json();

    const newBanner = await db.banner.create({
      data: { title, link, imageUrl, isActive },
    });
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


