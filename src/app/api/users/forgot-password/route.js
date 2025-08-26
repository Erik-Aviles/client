import db from "@/lib/db";
import { Resend } from "resend";
import base64url from "base64url";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { companyData } from "@/utils/general/companyData";
import { EmailTemplate } from "@/components/email-template";

const nameCompany = companyData?.name;

export async function PUT(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { email } = await request.json();

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: `Usuario no encontrado`,
        },
        { status: 404 }
      );
    }

    const rawToken = uuidv4();

    const token = base64url.encode(rawToken);

    const tokenExpiration = new Date(Date.now() + 1000 * 60 * 5);

    const updatedUser = await db.user.update({
      where: {
        email,
      },
      data: {
        passwordResetToken: token,
        passwordResetTokenExpires: tokenExpiration,
      },
    });

    const userId = existingUser.id;
    const name = existingUser.name;
    const description =
      "Haga clic en el enlace a continuación para completar el proceso de restablecimieno de contraseña. El enlace es valido dentro de 15 minutos de su envio. Gracias por su comprencion!";
    const linkText = "Restablecer contraseña";
    const subject = `Restablecer tu contraseña - ${nameCompany}`;
    const redirectUrl = `reset-password?token=${token}&id=${userId}`;
    const sendMail = await resend.emails.send({
      from: `${nameCompany} <brd@resend.dev>`,
      to: "boderoracing2016@gmail.com",
      subject: subject,
      react: EmailTemplate({
        name,
        redirectUrl,
        linkText,
        description,
        subject,
      }),
    });

    return NextResponse.json(
      {
        data: null,
        message: "Usuario actualizado con éxito",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Error del servidor: Algo salió mal",
      },
      { status: 500 }
    );
  }
}
export async function GET(request) {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "No se pudieron obtener los usuarios",
        error,
      },
      { status: 500 }
    );
  }
}
