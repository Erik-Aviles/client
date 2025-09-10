"use server";

import db from "@/lib/db";
import bcrypt from "bcrypt";
import base64url from "base64url";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import { parseISODate } from "@/lib/parseISODate";

// ✅ CREATE - Crear un nuevo staff
export async function createStaff(data) {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      imageUrl,
      idDocument,
      role,
      codeUser,
      phone,
      address,
      dob,
      notes,
      workScope,
      isActive,
    } = data;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("El email ya está registrado.");
    }
    // 🔐 Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //Generate Token
    const rawToken = uuidv4();
    const token = base64url.encode(rawToken);

    // 1️⃣ Crear usuario
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        imageUrl,
        idDocument,
        role: role || "MODERATOR",
        verificationToken: token,
      },
    });

    // 2️⃣ Crear staffProfile vinculado al usuario
    const staff = await db.staffProfile.create({
      data: {
        userId: newUser.id,
        codeUser,
        phone,
        address,
        dob: parseISODate(dob),
        notes,
        workScope,
        isActive,
      },
    });

    revalidatePath("/dashboard/staff");
    return {
      success: true,
      data: staff,
      message: "Creado correctamente",
    };
  } catch (error) {
    console.error("Error al crear staff:", error);
    throw new Error("No se pudo crear el staff");
  }
}

// ✅ GET ALL - Obtener todos los staff
export async function getStaff() {
  try {
    const staff = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      where: { role: "MODERATOR" },
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
        staffProfile: true,
      },
    });

    if (staff.length === 0) {
      console.warn("No hay personal registrado aún.");
    }
    return staff;
  } catch (error) {
    console.error("Error al obtener staff:", error);
    throw new Error("No se pudo obtener el listado de staff");
  }
}

// ✅ GET ONE - Obtener un staff por id
export async function getStaffById(id) {
  try {
    const staff = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        role: true,
        firstName: true,
        lastName: true,
        imageUrl: true,
        idDocument: true,
        email: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        staffProfile: true,
      },
    });

    if (!staff) {
      throw new Error("Personal no encontrado");
    }

    return staff;
  } catch (error) {
    console.error("❌ Error al obtener staff por ID:", error);
    throw new Error("No se pudo obtener el staff");
  }
}

// ✅ UPDATE - Actualizar un staff
export async function updateStaff(id, data) {
  try {
    // Verificar si el personal existe
    const existingStaff = await db.user.findUnique({
      where: { id },
    });

    if (!existingStaff) {
      throw new Error("Personal no encontrado.");
    }

    const userUpdateData = {
      role: data.role ?? existingStaff.role,
      firstName: data.firstName ?? existingStaff.firstName,
      lastName: data.lastName ?? existingStaff.lastName,
      email: data.email ?? existingStaff.email,
      idDocument: data.idDocument ?? existingStaff.idDocument,
      imageUrl: data.imageUrl ?? existingStaff.imageUrl,
    };

    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      userUpdateData.password = hashedPassword;
    }

    // Actualizar datos básicos del usuario
    await db.user.update({
      where: { id: existingStaff.id },
      data: userUpdateData,
    });

    // Actualizar datos del perfil del staff
    const staff = await db.staffProfile.update({
      where: { userId: existingStaff.id },
      data: {
        codeUser: data.codeUser ?? existingStaff.staffProfile.codeUser,
        phone: data.phone ?? existingStaff.staffProfile.phone,
        streetAddress:
          data.streetAddress ?? existingStaff.staffProfile.streetAddress,
        dob: parseISODate(data.dob) ?? existingStaff.staffProfile.dob,
        notes: data.notes ?? existingStaff.staffProfile.notes,
        workScope: data.workScope ?? existingStaff.staffProfile.workScope,
        isActive: data.isActive ?? existingStaff.staffProfile.isActive,
      },
    });

    revalidatePath("/dashboard/staff");
    return {
      success: true,
      data: staff,
      message: data.password
        ? "Actualización exitosa (incluyendo contraseña)"
        : "Actualización exitosa",
    };
  } catch (error) {
    console.error("Error al actualizar staff:", error);
    throw new Error("No se pudo actualizar el staff");
  }
}

// ✅ DELETE - Eliminar un staff
export async function deleteStaff(id) {
  try {
    await db.user.delete({
      where: { id },
    });

    revalidatePath("/dashboard/staffs");
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar staff:", error);
    throw new Error("No se pudo eliminar el staff");
  }
}
