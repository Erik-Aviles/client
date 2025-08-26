import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const suppliers = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      where: { role: "SUPPLIER" },
      include: { supplierProfile: true },
    });

    return NextResponse.json(suppliers, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los datos del proveedor:", error);
    return NextResponse.json(
      { message: "No se pudieron obtener los datos del proveedor", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const supplierData = await request.json();

    const existingSupplier = await db.user.findUnique({
      where: { id: supplierData.userId },
    });

    if (!existingSupplier) {
      return NextResponse.json(
        { data: null, message: `Usuario no existe` },
        { status: 404 }
      );
    }

    // Actualizar rol y emailVerified en User
    await db.user.update({
      where: { id: supplierData.userId },
      data: {
        emailVerified: true,
        role: "SUPPLIER",
        firstName: supplierData.firstName ?? existingSupplier.firstName,
        lastName: supplierData.lastName ?? existingSupplier.lastName,
        email: supplierData.email ?? existingSupplier.email,
        idDocument: supplierData.idDocument ?? existingSupplier.idDocument,
        imageUrl: supplierData.imageUrl ?? existingSupplier.imageUrl,
      },
    });

    const newSupplierProfile = await db.supplierProfile.create({
      data: {
        userId: supplierData.userId,
        name: supplierData.name,
        codeSupplier: supplierData.codeSupplier,
        phone: supplierData.phone,
        logoUrl: supplierData.logoUrl,
        address: supplierData.address,
        contactPerson: supplierData.contactPerson,
        contactPersonPhone: supplierData.contactPersonPhone,
        paymentTerms: supplierData.paymentTerms,
        notes: supplierData.notes,
        isActive: supplierData.isActive,
        products: supplierData.products
          ? {
              connect: supplierData.products.map((p) => ({ id: p })),
            }
          : undefined,
      },
    });
    return NextResponse.json(newSupplierProfile, { status: 201 });
  } catch (error) {
    console.error("Error al registrar el proveedor:", error);
    return NextResponse.json(
      { message: "No se pudo registrar el proveedor", error },
      { status: 500 }
    );
  }
}

//con autorizacion no implementado
export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "No autenticado" }, { status: 401 });
    }

    const body = await req.json();
    const {
      userId, // obligatorio
      name,
      codeSupplier,
      phone,
      logoUrl,
      address,
      contactPerson,
      contactPersonPhone,
      paymentTerms,
      notes,
      isActive, // normalmente false por defecto; puedes ignorarlo aquí si lo controlas tú
      products, // ver comentario más abajo
      firstName,
      lastName,
      email,
      idDocument,
      imageUrl,
    } = body;

    // El user autenticado debe ser el mismo que intenta completar su perfil
    if (!userId || session.user.id !== userId) {
      return NextResponse.json({ message: "No autorizado" }, { status: 403 });
    }

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json(
        { message: "Usuario no existe" },
        { status: 404 }
      );
    }

    // Evita duplicar SupplierProfile si ya existe
    const existingProfile = await db.supplierProfile.findUnique({
      where: { userId },
    });
    if (existingProfile) {
      return NextResponse.json(
        { message: "Ya existe un SupplierProfile para este usuario" },
        { status: 409 }
      );
    }

    // Transacción: actualiza User + crea SupplierProfile
    const result = await db.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          // eleva a SUPPLIER cuando completa su perfil
          role: "SUPPLIER",
          emailVerified: true, // si corresponde
          firstName: firstName ?? user.firstName,
          lastName: lastName ?? user.lastName,
          email: email ?? user.email,
          idDocument: idDocument ?? user.idDocument,
          imageUrl: imageUrl ?? user.imageUrl,
        },
      });

      // ⚠️ products: si es String[] en tu schema, guarda directamente.
      // Si es relación con Product, usa connect.
      const supplierProfile = await tx.supplierProfile.create({
        data: {
          userId,
          name,
          codeSupplier,
          phone,
          logoUrl,
          address,
          contactPerson,
          contactPersonPhone,
          paymentTerms,
          notes,
          isActive: typeof isActive === "boolean" ? isActive : false,
          // Opción A (String[]) — descomenta si products es String[]:
          // products: Array.isArray(products) ? products : [],
          // Opción B (Relación) — descomenta si products es relación:
          ...(Array.isArray(products) && products.length > 0
            ? { products: { connect: products.map((id) => ({ id })) } }
            : {}),
        },
      });

      return { updatedUser, supplierProfile };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("PUT /api/suppliers error:", error);
    return NextResponse.json(
      {
        message: "No se pudo completar el perfil de proveedor",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
