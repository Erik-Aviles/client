import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const coupon = await db.coupon.findUnique({
      where: { id },
    });

    return NextResponse.json(coupon, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el cupon por Id:", error);
    return NextResponse.json(
      { message: "No se pudo obtener el cupon", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingCoupon = await db.coupon.findUnique({
      where: { id },
    });

    if (!existingCoupon) {
      return NextResponse.json(
        {
          data: null,
          message: "Cupon no encontrado",
        },
        { status: 404 }
      );
    }
    const deleteCoupon = await db.coupon.delete({
      where: { id },
    });

    return NextResponse.json(deleteCoupon, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el Copon por Id:", error);
    return NextResponse.json(
      { message: "Fallo al eliminar el Copon", error },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params: { id } }) {
  try {
    const { title, couponCode, expiryDate, value, isActive } =
      await request.json();

    const existingCoupon = await db.coupon.findUnique({
      where: { id },
    });

    if (!existingCoupon) {
      return NextResponse.json(
        { data: null, message: "Coupon no exixte" },
        { status: 404 }
      );
    }

    const updateCoupon = await db.coupon.update({
      where: { id },
      data: {
        title,
        couponCode,
        expiryDate,
        usageLimit: null,
        value: value !== null && value !== undefined ? Number(value) : 5,
        isActive,
      },
    });

    return NextResponse.json(updateCoupon, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar cupón:", error);
    return NextResponse.json(
      { message: "No se pudo actualizar el cupón", error },
      { status: 500 }
    );
  }
}
