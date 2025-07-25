import db from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

// export async function PUT(request) {
//   try {
//     const { password, id } = await request.json();
//     const user = await db.user.findUnique({
//       where: {
//         id,
//       },
//     });
//     if (!user) {
//       return NextResponse.json(
//         {
//           data: null,
//           message: "Usuario no encontrado",
//         },
//         { status: 404 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const updatedUser = await db.user.update({
//       where: {
//         id,
//       },
//       data: {
//         password: hashedPassword,
//         passwordResetToken: null,
//         passwordResetTokenExpires: null,
//       },
//     });

//     return NextResponse.json(updatedUser);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       {
//         message: "No se pudo actualizar el usuario",
//         error,
//       },
//       { status: 500 }
//     );
//   }
// }

export async function PATCH(request) {
  try {
    const { token, id, password } = await request.json();

    const user = await db.user.findUnique({ where: { id } });

   if (!user || !user.passwordResetToken) {
      return NextResponse.json(
        { message: "Token inválido o ya utilizado." },
        { status: 400 }
      );
    }

    const isExpired =
      !user.passwordResetTokenExpires || new Date(user.passwordResetTokenExpires) < new Date();

    if (isExpired) {
      return NextResponse.json(
        { message: "El token ha expirado." },
        { status: 410 }
      );
    }

    if (user.passwordResetToken !== token) {
      return NextResponse.json(
        { message: "Token inválido." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetTokenExpires: null,
      },
    });

    return NextResponse.json(
      { message: "Contraseña actualizada correctamente." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error del servidor", error },
      { status: 500 }
    );
  }
}
