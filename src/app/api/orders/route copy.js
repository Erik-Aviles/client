import db from "@/lib/db";
import { NextResponse } from "next/server";
import { generateOrderNumber } from "@/lib/orders/generateOrderNumber";

export async function GET(request) {
  try {
    const orders = await db.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { coupon: true, orderItems: true },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    return NextResponse.json(
      { message: "No se pudieron obtener las órdenes", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { personalInfo, paymentInfo, shippingInfo, cart } =
      await request.json();

    const { items, totals } = cart;

    // 1. Validar carrito
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { data: null, message: "El carrito está vacío" },
        { status: 409 }
      );
    }

    // 2. Validar productos
    for (const item of items) {
      if (!item.price || !item.qty || item.qty < 1) {
        return NextResponse.json(
          { data: null, message: "Producto con precio o cantidad inválidos." },
          { status: 400 }
        );
      }
    }

    // 3. Validar cupón directamente en la DB si existe
    let coupon = null;
    if (totals.coupon && totals.coupon.couponCode) {
      coupon = await db.coupon.findFirst({
        where: {
          couponCode: totals.coupon.couponCode,
          isActive: true,
          expiryDate: { gt: new Date() },
        },
      });

      if (!coupon) {
        return NextResponse.json(
          { data: null, message: "Cupón inválido o expirado" },
          { status: 409 }
        );
      }
    }

    // 4. Calcular subtotal sumando precio * cantidad
    const subtotal = items.reduce((acc, item) => {
      if (!item.price || !item.qty || item.qty < 1) {
        throw new Error("Producto con precio o cantidad inválidos.");
      }
      return acc + item.price * item.qty;
    }, 0);

    // 5. Calcular descuento: si hay cupón, usar valor del cupón
    let discountAmount = 0;
    if (coupon && typeof coupon.value === "number" && !isNaN(coupon.value)) {
      discountAmount = coupon ? (subtotal * coupon.value) / 100 : 0;
      discountAmount = Math.min(discountAmount, subtotal);
    } else {
      discountAmount = 0;
    }

    // 6. Calcular total (no negativo)
    const total = Math.max(
      0,
      subtotal + (totals.shippingCost || 0) - discountAmount
    );

    // 7. Generar número de orden
    const orderNumber = await generateOrderNumber();

    // 8. Crear orden y items en una transacción atómica
    const result = await db.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId: personalInfo.userId,
          orderNumber,
          firstName: personalInfo.firstName,
          lastName: personalInfo.lastName,
          emailAddress: personalInfo.email,
          phoneNumber: personalInfo.phone,
          streetAddress: shippingInfo.streetAddress,
          city: shippingInfo.city,
          country: shippingInfo.country,
          zipCode: shippingInfo.zipCode,
          tax: parseInt(totals.tax || 0),
          subtotal: parseFloat(subtotal),
          discountAmount: parseFloat(discountAmount),
          shippingCost: parseFloat(totals.shippingCost || 0),
          total: parseFloat(total),
          paymentMethod: paymentInfo.paymentMethod,
          couponId: coupon ? coupon.id : null,
          notes: personalInfo.notes || "",
          orderItems: {
            create: items.map((item) => ({
              productId: item.id,
              vendorId: item.vendorId, //ojo: si falla, cambiar a "id"
              title: item.title,
              code: item.code,
              price: parseFloat(item.price),
              quantity: parseInt(item.qty),
              total: parseFloat(item.price * item.qty),
              brand: item.brand,
              imageUrl: item.imageUrl,
            })),
          },
        },
        include: {
          orderItems: true,
          coupon: true,
        },
      });

      // Actualizar stock o hacer otras operaciones relacionadas

      const sales = await Promise.all(
        items.map(async (item) => {
          const totalAmount = parseFloat(item.price) * parseInt(item.quantity);

          const newSale = await tx.sale.create({
            data: {
              orderId: order.id,
              productId: item.id,
              vendorId: item.vendorId,
              total: totalAmount,
            },
          });

          return newSale;
        })
      );

      return { order, sales };
    });

    return NextResponse.json(result.order, { status: 201 });
  } catch (error) {
    console.error("Error al crear la orden:", error);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
