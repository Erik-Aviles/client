import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const coupon = await db.coupon.findUnique({
      where: { id },
      include: { products: true },
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
