import db from "@/lib/db";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import base64url from "base64url";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { companyData } from "@/utils/general/companyData";
import { EmailTemplate } from "@/components/email-template";

const nameCompany = companyData?.name;

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { lastName, firstName, email, password, role } = await request.json();
    const existingUser = await db.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { data: null, message: `El usuario con (${email}) ya existe` },
        { status: 409 }
      );
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    //Generate Token
    const rawToken = uuidv4();
    const token = base64url.encode(rawToken);

    const newUser = await db.user.create({
      data: {
        lastName,
        firstName,
        email,
        password: hasedPassword,
        role,
        verificationToken: token,
      },
    });

    if (role === "SUPPLIER") {
      const userId = newUser.id;
      const linkText = "Verificar cuenta";
      const subject = `Verificar cuenta - ${nameCompany}`;
      const description =
        "Gracias por crear una cuenta con nosotros. Haga clic en el enlace a continuación para completar su proceso de incorporación. Gracias.";
      const redirectUrl = `onboarding/${userId}?token=${token}`;
      const sendMail = await resend.emails.send({
        from: "Multivendor <brd@resend.dev>",
        to: "boderoracing2016@gmail.com",
        subject: subject,
        react: EmailTemplate({
          firstName,
          lastName,
          redirectUrl,
          linkText,
          description,
          subject,
        }),
      });
    }

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
