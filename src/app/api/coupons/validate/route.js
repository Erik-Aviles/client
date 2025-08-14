// app/api/coupons/validate/route.js

import db from "@/lib/db";

export async function POST(request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return new Response(
        JSON.stringify({ valid: false, message: "Código no enviado" }),
        { status: 400 }
      );
    }

    const coupon = await db.coupon.findFirst({
      where: {
        couponCode: code,
        isActive: true,
        expiryDate: { gte: new Date() },
      },
    });

    if (!coupon) {
      return new Response(
        JSON.stringify({ valid: false, message: "Cupón inválido o expirado" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        valid: true,
        message: "Cupón aplicado con éxito",
        coupon: {
          couponCode: coupon.couponCode,
          value: coupon.value,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error validando cupón:", error);
    return new Response(
      JSON.stringify({ valid: false, message: "Error interno en el servidor" }),
      { status: 500 }
    );
  }
}
