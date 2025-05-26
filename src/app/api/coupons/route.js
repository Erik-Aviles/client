import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const coupons = await db.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(coupons, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los cupones:", error);
    return NextResponse.json(
      { message: "No se pudieron obtener los cupones", error },
      { status: 500 }
    );
  }
}

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

