import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const suppliers = await db.supplierProfile.findMany({
      orderBy: { createdAt: "desc" },
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
    const newSupplierProfile = await db.supplierProfile.create({
      data: {
        name: supplierData.name,
        idDocument: supplierData.idDocument,
        codeSupplier: supplierData.codeSupplier,
        phone: supplierData.phone,
        profileImageUrl: supplierData.profileImageUrl,
        email: supplierData.email,
        role: supplierData.role,
        address: supplierData.address,
        contactPerson: supplierData.contactPerson,
        contactPersonPhone: supplierData.contactPersonPhone,
        paymentTerms: supplierData.paymentTerms,
        notes: supplierData.notes,
        products: supplierData.products,
        isActive: supplierData.isActive,
        userId: supplierData.userId,
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
