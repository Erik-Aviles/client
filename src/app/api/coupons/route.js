import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, couponCode, expiryDate, isActive } = await request.json();

    const newCoupon = await db.coupon.create({
      data: {
        title,
        couponCode,
        expiryDate,
        isActive,
      },
    });

    console.log("Nueva cupón creado:", newCoupon);
    return NextResponse.json(newCoupon, { status: 201 });
  } catch (error) {
    console.error("Error al crear cupón:", error);
    return NextResponse.json(
      { message: "No se pudo crear el cupón", error },
      { status: 500 }
    );
  }
}
