import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { token, id } = await request.json();

    const user = await db.user.findUnique({
      where: { id },
    });

    if (
      !user ||
      !user.passwordResetToken ||
      user.passwordResetToken !== token
    ) {
      return NextResponse.json({ message: "Token inválido." }, { status: 400 });
    }

    const isExpired = new Date(user.passwordResetTokenExpires) < new Date();

    if (isExpired) {
      return NextResponse.json(
        { message: "El token ha expirado." },
        { status: 410 }
      );
    }

    return NextResponse.json(
      { message: "Token válido. Puedes continuar." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error del servidor.", error },
      { status: 500 }
    );
  }
}
