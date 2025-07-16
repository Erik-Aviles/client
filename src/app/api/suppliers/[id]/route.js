import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const supplier = await db.user.findUnique({
      where: { id },
      include: { supplierProfile: true },
    });

    if (!supplier) {
      return NextResponse.json(
        { message: "Proveedor no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(supplier, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el proveedor por Id:", error);
    return NextResponse.json(
      { message: "No se pudo obtener el proveedor", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    const existingSupplier = await db.supplierProfile.findUnique({
      where: { id },
    });

    if (!existingSupplier) {
      return NextResponse.json(
        {
          data: null,
          message: "Proveedor no encontradO",
        },
        { status: 404 }
      );
    }
    const deletedSupplier = await db.supplierProfile.delete({
      where: { id: supplierId },
    });

    return NextResponse.json(
      { message: "Proveedor eliminado correctamente", deletedSupplier },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar el Proveedor por Id:", error);
    return NextResponse.json(
      { message: "Fallo al eliminar el Proveedor", error },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const supplierId = await params.id;
  const data = await request.json();

  try {
    if (!supplierId) {
      return NextResponse.json(
        { message: "ID del proveedor no especificado en la URL." },
        { status: 400 }
      );
    }

    // Verificar si el proveedor existe
    const existingSupplier = await db.supplierProfile.findUnique({
      where: { id: supplierId },
    });

    if (!existingSupplier) {
      return NextResponse.json(
        { message: "Proveedor no encontrado." },
        { status: 404 }
      );
    }

    // Actualizar los datos del proveedor
    const updatedSupplier = await db.supplierProfile.update({
      where: { id: supplierId },
      data: {
        name: data.name,
        idDocument: data.idDocument,
        codeSupplier: data.codeSupplier,
        phone: data.phone,
        profileImageUrl: data.profileImageUrl,
        email: data.email,
        role: data.role ?? "SUPPLIER",
        address: data.address,
        contactPerson: data.contactPerson,
        contactPersonPhone: data.contactPersonPhone,
        paymentTerms: data.paymentTerms,
        notes: data.notes,
        isActive: data.isActive,
        products: data.products ?? [],
      },
    });

    return NextResponse.json(updatedSupplier, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar proveedor:", error);
    return NextResponse.json(
      { message: "Error al actualizar el proveedor", error: error.message },
      { status: 500 }
    );
  }
}
