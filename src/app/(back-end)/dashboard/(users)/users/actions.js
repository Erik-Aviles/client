"use server";

import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// ✅ GET ALL - Obtener todos los usuarios
export async function getUsers() {
  const session = await getServerSession(authOptions);
  if (session.user.role !== "ADMIN") {
    return { success: false, message: "No autorizado" };
  }

  try {
    const users = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      where: { role: "USER" },
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
      },
    });

    return { success: true, data: users };
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return {
      success: false,
      message: "No se pudieron obtener a los usuarios",
      error: error.message,
    };
  }
}
