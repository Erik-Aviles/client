import db from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "No autenticado" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "No autorizado" }, { status: 403 });
    }

    const body = await req.json();
    const {
      // User
      email,
      password, // si aplicara
      firstName,
      lastName,
      idDocument,
      imageUrl,
      // SupplierProfile
      name,
      codeSupplier,
      phone,
      logoUrl,
      address,
      contactPerson,
      contactPersonPhone,
      paymentTerms,
      notes,
      isActive,
      products,
    } = body;

    if (!email) {
      return NextResponse.json({ message: "Email requerido" }, { status: 400 });
    }

    const emailExists = await db.user.findUnique({ where: { email } });
    if (emailExists) {
      return NextResponse.json(
        { message: "Email ya registrado" },
        { status: 409 }
      );
    }

    const result = await db.$transaction(async (tx) => {
      // TODO: si usas CredentialsProvider, hashea password
      // const hashed = await bcrypt.hash(password, 10);

      const user = await tx.user.create({
        data: {
          email,
          // password: hashed, // si aplica
          firstName: firstName ?? "",
          lastName: lastName ?? "",
          idDocument: idDocument ?? "",
          imageUrl: imageUrl ?? "",
          emailVerified: true, // admin lo crea ya verificado (opcional)
          role: "SUPPLIER",
        },
      });

      const supplierProfile = await tx.supplierProfile.create({
        data: {
          userId: user.id,
          name,
          codeSupplier,
          phone,
          logoUrl,
          address,
          contactPerson,
          contactPersonPhone,
          paymentTerms,
          notes,
          isActive: typeof isActive === "boolean" ? isActive : true,
          // Opción A (String[])
          // products: Array.isArray(products) ? products : [],
          // Opción B (Relación)
          ...(Array.isArray(products) && products.length > 0
            ? { products: { connect: products.map((id) => ({ id })) } }
            : {}),
        },
      });

      return { user, supplierProfile };
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("POST /api/suppliers/admin error:", error);
    return NextResponse.json(
      { message: "No se pudo crear el supplier", error: error.message },
      { status: 500 }
    );
  }
}
