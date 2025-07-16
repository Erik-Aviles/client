import db from "@/lib/db";
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

    const existingUser = await db.user.findUnique({
      where: { id },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "El usuario ya tiene un perfil de proveedor asignado" },
        { status: 400 }
      );
    }

    const newSupplier = await db.user.create({
      data: {
        name: supplierData.name,
        email: supplierData.email,
        role: "SUPPLIER",
        isActive: supplierData.isActive,
        supplierProfile: {
          create: {
            name: supplierData.name,
            codeSupplier: supplierData.codeSupplier,
            idDocument: supplierData.idDocument,
            phone: supplierData.phone,
            profileImageUrl: supplierData.profileImageUrl,
            address: supplierData.address,
            contactPerson: supplierData.contactPerson,
            contactPersonPhone: supplierData.contactPersonPhone,
            paymentTerms: supplierData.paymentTerms,
            notes: supplierData.notes,
            products: supplierData.products,
            isActive: supplierData.isActive,
          },
        },
      },
    });
    console.log("Nuevo proveedor creado:", newSupplier);
    return NextResponse.json(newSupplier, { status: 201 });
  } catch (error) {
    console.error("Error al registrar el proveedor:", error);
    return NextResponse.json(
      { message: "No se pudo registrar el proveedor", error },
      { status: 500 }
    );
  }
}
