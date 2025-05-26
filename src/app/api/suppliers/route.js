import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const suppliers = await db.supplierProfile.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(suppliers, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los datos de los proveedores:", error);
    return NextResponse.json(
      { message: "No se pudieron obtener los datos de los proveedores", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const {
      name,
      idDocument,
      codeSupplier,
      phone,
      profileImageUrl,
      email,
      role,
      address,
      contactPerson,
      contactPersonPhone,
      paymentTerms,
      notes,
      isActive,
    } = await request.json();

    const newSupplier = await db.supplierProfile.create({
      data: {
        name,
        idDocument,
        codeSupplier,
        phone,
        profileImageUrl,
        email,
        role,
        address,
        contactPerson,
        contactPersonPhone,
        paymentTerms,
        notes,
        isActive,
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
