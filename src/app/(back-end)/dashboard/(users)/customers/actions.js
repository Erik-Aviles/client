"use server";

import db from "@/lib/db";
import { parseISODate } from "@/lib/parseISODate";
import { revalidatePath } from "next/cache";

// ✅ GET ALL - Obtener todos los clientes
export async function getCustomers() {
  try {
    const customers = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      where: { role: "CUSTOMER" },
      select: {
        id: true,
        role: true,
        firstName: true,
        lastName: true,
        imageUrl: true,
        email: true,
        emailVerified: true,
        idDocument: true,
        createdAt: true,
        updatedAt: true,
        orders: true,
        customerProfile: true,
      },
    });

    return customers;
  } catch (error) {
    console.error("❌ Error al obtener clientes con Prisma:", error);
    throw new Error("No se pudieron cargar los clientes");
  }
}

// ✅ GET ONE - Obtener un cliente por ID
export async function getCustomerById(id) {
  try {
    const customer = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        role: true,
        firstName: true,
        lastName: true,
        imageUrl: true,
        email: true,
        emailVerified: true,
        idDocument: true,
        createdAt: true,
        updatedAt: true,
        orders: true,
        customerProfile: true,
      },
    });

    if (!customer) {
      throw new Error("Cliente no encontrado");
    }

    return customer;
  } catch (error) {
    console.error("❌ Error al obtener cliente con Prisma:", error);
    throw new Error("No se pudo cargar el cliente");
  }
}

// ✅ UPDATE - Actualizar un cliente por ID
export async function updateCustomer(id, data) {
  try {
    // Verificar si el cliente existe
    const existingCustomer = await db.user.findUnique({
      where: { id },
      include: { profile: true }, // traemos el profile si existe
    });

    if (!existingCustomer) {
      throw new Error("Cliente no encontrado.");
    }

    // Actualizar datos básicos del usuario
    await db.user.update({
      where: { id: existingCustomer.id },
      data: {
        role: data.role ?? existingCustomer.role,
        firstName: data.firstName ?? existingCustomer.firstName,
        lastName: data.lastName ?? existingCustomer.lastName,
        email: data.email ?? existingCustomer.email,
        idDocument: data.idDocument ?? existingCustomer.idDocument,
        imageUrl: data.imageUrl ?? existingCustomer.imageUrl,
      },
    });

    let updatedProfile;

    if (existingCustomer.profile) {
      // Si ya tiene profile → actualizar
      updatedProfile = await db.userProfile.update({
        where: { userId: existingCustomer.id },
        data: {
          dateOfBirth:
            parseISODate(data?.dateOfBirth) ??
            existingCustomer.profile.dateOfBirth,
          address: data?.address ?? existingCustomer.profile.address,
          city: data?.city ?? existingCustomer.profile.city,
          province: data?.province ?? existingCustomer.profile.province,
          country: data?.country ?? existingCustomer.profile.country,
          zipCode: data?.zipCode ?? existingCustomer.profile.zipCode,
          phone: data?.phone ?? existingCustomer.profile.phone,
          loyaltyPoints:
            data?.loyaltyPoints ?? existingCustomer.profile.loyaltyPoints,
          isActive: data?.isActive ?? existingCustomer.profile.isActive,
        },
      });
    } else {
      // Si no tiene profile → crear y asociar al usuario
      updatedProfile = await db.userProfile.create({
        data: {
          userId: existingCustomer.id,
          dateOfBirth: parseISODate(data?.dateOfBirth),
          address: data?.address,
          city: data?.city,
          province: data?.province,
          country: data?.country,
          zipCode: data?.zipCode,
          phone: data?.phone,
          loyaltyPoints: data?.loyaltyPoints,
          isActive: data?.isActive,
        },
      });
    }
    revalidatePath("/dashboard/customers");
    return updatedProfile;
  } catch (error) {
    console.error("❌ Error al actualizar cliente con Prisma:", error);
    throw new Error("No se pudo actualizar el cliente");
  }
}
