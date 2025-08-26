import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const supplier = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        imageUrl: true,
        idDocument: true,
        role: true,
        emailVerified: true,
        supplierProfile: {
          where: { userId: id },
          select: {
            id: true,
            userId: true,
            name: true,
            codeSupplier: true,
            phone: true,
            logoUrl: true,
            address: true,
            contactPerson: true,
            contactPersonPhone: true,
            paymentTerms: true,
            notes: true,
            isActive: true,
            products: true,
          },
        },
      },
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
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "No autenticado" }, { status: 401 });
  }
  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "No autorizado" }, { status: 403 });
  }

  try {
    const existingSupplier = await db.user.findUnique({
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
    const deletedSupplier = await db.user.delete({
      where: { id },
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
  const supplierId = params.id;
  const session = await getServerSession(authOptions);

  // El user autenticado debe ser el mismo que intenta completar su perfil O el admin
  if (
    (!supplierId || session.user.id !== supplierId) &&
    session.user.role !== "ADMIN"
  ) {
    return NextResponse.json({ message: "No autorizado" }, { status: 403 });
  }

  const supplierData = await request.json();

  try {
    if (!supplierId) {
      return NextResponse.json(
        { message: "ID del proveedor no especificado en la URL." },
        { status: 400 }
      );
    }

    // Verificar si el proveedor existe
    const existingSupplier = await db.user.findUnique({
      where: { id: supplierData.userId },
    });

    if (!existingSupplier) {
      return NextResponse.json(
        { message: "Proveedor no encontrado." },
        { status: 404 }
      );
    }
    await db.user.update({
      where: { id: supplierData.userId },
      data: {
        firstName: supplierData.firstName ?? existingSupplier.firstName,
        lastName: supplierData.lastName ?? existingSupplier.lastName,
        email: supplierData.email ?? existingSupplier.email,
        idDocument: supplierData.idDocument ?? existingSupplier.idDocument,
        imageUrl: supplierData.imageUrl ?? existingSupplier.imageUrl,
      },
    });

    // Actualizar los datos del proveedor
    const updatedSupplier = await db.supplierProfile.update({
      where: { id: supplierId },
      data: {
        name: supplierData.name,
        codeSupplier: supplierData.codeSupplier,
        phone: supplierData.phone,
        logoUrl: supplierData.logoUrl,
        contactPerson: supplierData.contactPerson,
        contactPersonPhone: supplierData.contactPersonPhone,
        paymentTerms: supplierData.paymentTerms,
        notes: supplierData.notes,
        isActive: supplierData.isActive,
        products: Array.isArray(supplierData.products)
          ? supplierData.products
          : undefined,
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
