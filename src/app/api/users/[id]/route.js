import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        imageUrl: true,
        idDocument: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        profile: true,
        supplierProfile: {
          include: {
            products: true,
          },
        },
        staffProfile: true,
        profile: true,
        orders: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    return NextResponse.json(
      { message: "No se pudieron obtener los datos del usuario", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const existingUser = await db.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { data: null, message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const deleteUser = await db.user.delete({
      where: { id },
    });

    return NextResponse.json(deleteUser, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return NextResponse.json(
      { message: "Fallo al eliminar el usuario", error: error.message },
      { status: 500 }
    );
  }
}
