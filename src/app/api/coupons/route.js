import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, couponCode, expiryDate } = await request.json();
    const newCoupon = {
      title,
      couponCode,
      expiryDate,
    };
    console.log("Nueva cupón creada:", newCoupon);
    return NextResponse.json(newCoupon, { status: 201 });
  } catch (error) {
    console.error("Error al crear cupón:", error);
    return NextResponse.json(
      { message: "No se pudo crear el cupón", error },
      { status: 500 }
    );
  }
}
