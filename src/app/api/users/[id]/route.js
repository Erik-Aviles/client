import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const user = await db.user.findUnique({
      where: { id },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    return NextResponse.json(
      { message: "No se pudieron obtener los datos del usuario", error },
      { status: 500 }
    );
  }
}
