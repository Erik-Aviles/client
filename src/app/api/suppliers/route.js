import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      name,
      idDocument,
      codeSupplier,
      phone,
      email,
      address,
      contactPerson,
      contactPersonPhone,
      paymentTerms,
      notes,
      isActive,
    } = await request.json();

    const newSupplier = {
      name,
      idDocument,
      codeSupplier,
      phone,
      email,
      address,
      contactPerson,
      contactPersonPhone,
      paymentTerms,
      notes,
      isActive,
    };
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
