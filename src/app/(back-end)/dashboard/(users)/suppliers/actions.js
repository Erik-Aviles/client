"use server";

import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { revalidatePath } from "next/cache";

/**
 * Server Action para crear un proveedor a partir de un usuario existente
 * @param {object} supplierData - Datos del proveedor a registrar
 */
export async function createSupplier(supplierData) {
  try {
    const existingSupplier = await db.user.findUnique({
      where: { id: supplierData.userId },
    });

    if (!existingSupplier) {
      return {
        success: false,
        data: null,
        message: "Usuario no existe",
      };
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

    // Crear el perfil del proveedor
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

    return {
      success: true,
      data: newSupplierProfile,
      message: "Proveedor registrado correctamente",
    };
  } catch (error) {
    console.error("Error al registrar el proveedor:", error);
    return {
      success: false,
      message: "No se pudo registrar el proveedor",
      error: error.message,
      data: null,
    };
  }
}

// Obtener todos los suppliers
export async function getSuppliers() {
  try {
    const suppliers = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      where: { role: "SUPPLIER" },
      include: { supplierProfile: true },
    });

    return { success: true, data: suppliers };
  } catch (error) {
    console.error("Error al obtener los datos del proveedor:", error);
    return {
      success: false,
      message: "No se pudieron obtener los datos del proveedor",
      error: error.message,
    };
  }
}

// Obtener supplier por ID
export async function getSupplierById(id) {
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
      return { success: false, message: "Proveedor no encontrado" };
    }

    return { success: true, data: supplier };
  } catch (error) {
    console.error("Error al obtener el proveedor por Id:", error);
    return {
      success: false,
      message: "No se pudo obtener el proveedor",
      error: error.message,
    };
  }
}

// Actualizar supplier
export async function updateSupplier(id, supplierData) {
  const session = await getServerSession(authOptions);

  if ((!id || session.user.id !== id) && session.user.role !== "ADMIN") {
    return { success: false, message: "No autorizado" };
  }

  try {
    if (!id) {
      return { success: false, message: "ID del proveedor no especificado." };
    }

    const existingSupplier = await db.user.findUnique({
      where: { id },
    });

    if (!existingSupplier) {
      return { success: false, message: "Proveedor no encontrado." };
    }

    await db.user.update({
      where: { id: existingSupplier.id },
      data: {
        firstName: supplierData.firstName ?? existingSupplier.firstName,
        lastName: supplierData.lastName ?? existingSupplier.lastName,
        email: supplierData.email ?? existingSupplier.email,
        idDocument: supplierData.idDocument ?? existingSupplier.idDocument,
        imageUrl: supplierData.imageUrl ?? existingSupplier.imageUrl,
      },
    });

    const updatedSupplier = await db.supplierProfile.update({
      where: { userId: existingSupplier.id },
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

    return {
      success: true,
      message: "Proveedor actualizado correctamente",
      data: updatedSupplier,
    };
  } catch (error) {
    console.error("Error al actualizar proveedor:", error);
    return {
      success: false,
      message: "Error al actualizar el proveedor",
      error: error.message,
    };
  }
}
