import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      name,
      idDocument,
      codeStaff,
      role,
      password,
      email,
      phone,
      address,
      dob,
      notes,
      workScope,
      imageUrl,
      isActive,
    } = await request.json();

    const newStaff = await db.staff.create({
      data: {
        name,
        idDocument,
        codeStaff,
        role,
        password,
        email,
        phone,
        address,
        dob,
        notes,
        workScope,
        imageUrl,
        isActive,
      },
    });
    console.log("Nuevo personal creado:", newStaff);
    return NextResponse.json(newStaff, { status: 201 });
  } catch (error) {
    console.error("Error al registrar el personal:", error);
    return NextResponse.json(
      { message: "No se pudo registrar el personal", error },
      { status: 500 }
    );
  }
}
