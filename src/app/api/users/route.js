import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(request) {
  try {
    const users = await db.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return NextResponse.json(
      { message: "No se pudieron obtener los usuarios", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { name, email, password, role } = await request.json();
    const existingUser = await db.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { data: null, message: "El usuario ya existe" },
        { status: 409 }
      );
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hasedPassword,
        role,
      },
    });
    console.log("Nuevo usuario registrado: ", newUser);

    return NextResponse.json(
      { data: newUser, message: "Usuario creado exitosamnete" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error del servidor: Algo salío mal", error },
      { status: 500 }
    );
  }
}
