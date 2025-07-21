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
      where: { id: supplierData.userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { data: null, message: `Usuario no existe` },
        { status: 404 }
      );
    }

    const updatedUser = await db.user.update({
      where: { id: supplierData.userId },
      data: {
        emailVerified: true,
      },
    });

    const newSupplierProfile = await db.supplierProfile.create({
      data: {
        codeSupplier: supplierData.codeSupplier,
        contactPerson: supplierData.contactPerson,
        contactPersonPhone: supplierData.contactPersonPhone,
        profileImageUrl: supplierData.profileImageUrl,
        email: supplierData.email,
        name: supplierData.name,
        notes: supplierData.notes,
        idDocument: supplierData.idDocument,
        phone: supplierData.phone,
        address: supplierData.address,
        paymentTerms: supplierData.paymentTerms,
        products: supplierData.products,
        userId: supplierData.userId,
        isActive: supplierData.isActive,
      },
    });
    console.log("Nuevo proveedor creado:", newSupplierProfile);
    return NextResponse.json(newSupplierProfile, { status: 201 });
  } catch (error) {
    console.error("Error al registrar el proveedor:", error);
    return NextResponse.json(
      { message: "No se pudo registrar el proveedor", error },
      { status: 500 }
    );
  }
}
