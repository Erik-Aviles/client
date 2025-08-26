import Link from "next/link";
import Image from "next/image";
import { getData } from "@/lib/getData";
import { CheckCircle2, Home, XCircle } from "lucide-react";
import calcularImpuesto from "@/lib/calcularImpuesto";
import { fmt } from "@/utils/formats/currencyFormat";
import SummaryLine from "@/components/frontend/cart/SummaryLine";
import SubTitle3 from "@/components/backoffice/styledComponent/SubTitle3";
import { formatDateToEcuador } from "@/utils/formats/formatDateToEcuador";

export default async function OrderConfirmationPage({ params }) {
 const { id } = await params;

  let order = null;
  try {
    order = await getData(`orders/${id}`);
  } catch (error) {
    console.error("Error cargando pedido:", error);
  }

  if (!order) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
          <h1 className="text-xl font-bold mb-2">Pedido no encontrado</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Puede que el pedido haya sido cancelado o el enlace no sea válido.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/40"
          >
            <Home className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </section>
    );
  }

  // --- Derivados / defensivos ---
  const taxTotal = calcularImpuesto(order?.subtotal, order?.tax || 15);
  const subtotalWithoutTax = Math.max(0, order?.subtotal - taxTotal);

  const safeTotals = {
    tax: Number(order?.tax || 15),
    taxTotal: Number(taxTotal ?? 0),
    subtotal: Number(order?.subtotal ?? 0),
    subtotalWithoutTax: Number(subtotalWithoutTax ?? 0),
    discount: Number(order?.coupon?.value ?? 0),
    discountAmount: Number(order?.discountAmount ?? 0),
    shippingCost: Number(order?.shippingCost ?? 0),
    total: Number(order?.total ?? 0),
  };

  return (
    <section className="min-h-[70vh] bg-white dark:bg-slate-900">
      <div className="mx-auto w-full max-w-5xl md:px-4 py-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 pb-5 border-b">
          <CheckCircle2 className="h-14 w-14 text-emerald-600" />
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-100">
              ¡Pedido confirmado!
            </h1>
            <p className=" text-slate-600 dark:text-slate-300">
              Recibimos su pedido y está siendo procesado.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="mt-8 grid gap-3 md:grid-cols-12">
          {/* Col izquierda: Detalles e ítems */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col md:border-r dark:rounded-lg  border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            {/* Bloque: Resumen de artículos */}
            <div className=" p-5 md:p-6">
              <SubTitle3
                title=" Artículos del pedido"
                className="dark:text-amber-500 text-sm md:text-base leading-2 font-bold uppercase"
              />

              {order?.orderItems?.length > 0 ? (
                <ul className="mt-4 divide-y divide-slate-200 dark:divide-slate-700">
                  {order?.orderItems.map((it) => {
                    const imageUrl = it?.imageUrl || "/logo.png";
                    return (
                      <li key={it?.id} className="flex items-center gap-4 py-4">
                        <div className="h-16 w-16 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50">
                          <Image
                            src={imageUrl}
                            alt={it?.title}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm md:text-base font-medium text-slate-900 dark:text-slate-100">
                            {it?.title}
                          </p>
                          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                            x{it?.quantity} {it?.brand ? `• ${it?.brand}` : ""}
                          </p>
                        </div>
                        <div className="text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100">
                          {fmt(it?.price * it?.quantity)}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-slate-500">
                  No hay artículos en el pedido.
                </p>
              )}
            </div>
            <div className="p-5 md:p-6">
              <SubTitle3
                title="Resumen de pago"
                className="dark:text-amber-500 text-sm md:text-base leading-2 font-bold uppercase  pt-8  border-t  border-slate-200 dark:border-slate-700  "
              />
              <div className="mt-4 space-y-2 text-xs md:text-sm">
                <SummaryLine
                  label="Subtotal (a.imp.)"
                  value={safeTotals.subtotalWithoutTax}
                />
                <SummaryLine
                  label={`Impuesto (${safeTotals.tax}%)`}
                  value={safeTotals.taxTotal}
                />
                <SummaryLine
                  label="Subtotal (d.imp.)"
                  value={safeTotals.subtotal}
                />

                <SummaryLine
                  label={`Descuento (${safeTotals.discount}%)`}
                  value={-Math.abs(safeTotals.discountAmount)}
                  emphasis
                />

                <SummaryLine label="Envío" value={safeTotals.shippingCost} />

                <div className="my-3 border-t border-slate-200 dark:border-slate-700" />
                <SummaryLine
                  label="Total pagado"
                  value={safeTotals.total}
                  big
                  strong
                />
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/40"
                >
                  <Home className="h-4 w-4" />
                  Volver al inicio
                </Link>
              </div>

              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                ¿Necesitas ayuda? Escríbenos al whatsapp o revisa tu correo para
                más detalles del pedido.
              </p>
            </div>
          </div>

          {/* Col derecha: Resumen de pago */}
          <aside className="h-min md:col-span-5 lg:col-span-4 dark:rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            {/* Bloque: Direcciones / método pago */}
            <div className="flex flex-col gap-4 p-5">
              <div className="border-b dark:border-slate-600 pb-4">
                <SubTitle3
                  title="Informacion del pedido"
                  className="dark:text-amber-500 text-sm md:text-base leading-2 font-bold uppercase"
                />
                <div className="mt-3 text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <p>
                    <span className="opacity-70 mr-3">N.º de pedido:</span>
                    <span className="font-semibold">
                      {order.orderNumber || order.id}
                    </span>
                  </p>
                  <p>
                    <span className="opacity-70 mr-3">Fecha:</span>
                    <span className="font-semibold">
                      {formatDateToEcuador(order.createdAt)}
                    </span>
                  </p>
                  <p>
                    <span className="opacity-70 mr-3">Estado:</span>
                    <span
                      className={[
                        "font-semibold",
                        {
                          PENDING: "text-yellow-500",
                          PROCESSING: "text-blue-500",
                          SHIPPED: "text-purple-500",
                          DELIVERED: "text-green-500",
                          CANCELED: "text-red-500",
                        }[order.orderStatus] || "text-gray-500",
                      ].join(" ")}
                    >
                      {{
                        PENDING: "Pendiente",
                        PROCESSING: "En proceso",
                        SHIPPED: "Enviado",
                        DELIVERED: "Entregado",
                        CANCELED: "Cancelado",
                      }[order.orderStatus] || "—"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="border-b dark:border-slate-600 pb-4">
                <SubTitle3
                  title="Datos de envío"
                  className="text-sm md:text-base leading-2 font-bold dark:text-amber-500 uppercase"
                />
                <div className="mt-3 text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <p>
                    {(order?.firstName || order?.firstName) ?? ""}{" "}
                    {(order?.lastName || order?.lastName) ?? ""}
                  </p>
                  <p>
                    {[
                      order?.streetAddress,
                      order?.city,
                      order?.country,
                      order?.zipCode,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
              </div>
              <div className="border-b dark:border-slate-600 pb-4">
                <SubTitle3
                  title="Direccion de facturación"
                  className="text-sm md:text-base leading-2 font-bold dark:text-amber-500 uppercase "
                />
                <div className="mt-3 text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <p>
                    {(order?.firstName || order?.firstName) ?? ""}{" "}
                    {(order?.lastName || order?.lastName) ?? ""}
                  </p>
                  {[
                    order?.streetAddress,
                    order?.city,
                    order?.country,
                    order?.zipCode,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </div>
              </div>
              <div className="border-b dark:border-slate-600 pb-4">
                <SubTitle3
                  title=" Método de pago"
                  className="text-sm md:text-base leading-2 font-bold dark:text-amber-500 uppercase"
                />
                <div className="mt-3 text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <p>
                    {{
                      CASH: "EFECTIVO",
                      CARD: "TARJETA DE CREDITO",
                      TRANSFER: "TRANSFERENCIA",
                      OTHER: "OTROS",
                    }[order.paymentMethod] ||
                      order.paymentMethod ||
                      "—"}
                  </p>

                  {order?.paymentMethod?.cardBrand && order?.last4 ? (
                    <p>
                      Marca: {order.paymentMethod.cardBrand.toUpperCase()} ••••
                      Numero: {order.last4}
                    </p>
                  ) : (
                    <p>
                      <span className="opacity-70 mr-3">Terminada con:</span>
                      <span className="font-semibold">
                        {order.last4 ? "****" : "—"}
                      </span>
                    </p>
                  )}
                  <p>
                    {" "}
                    <span className="opacity-70 mr-3">Estado:</span>
                    <span
                      className={[
                        "font-semibold",
                        {
                          UNPAID: "text-red-500",
                          PARTIAL: "text-yellow-500",
                          PAID: "text-green-500",
                          REFUNDED: "text-blue-500",
                          PENDING: "text-yellow-500",
                          FAILED: "text-red-500",
                        }[order.paymentStatus] || "text-gray-500", // color por defecto
                      ].join(" ")}
                    >
                      {{
                        UNPAID: "No pagado",
                        PARTIAL: "Pagado parcialmente",
                        PAID: "Pagado",
                        REFUNDED: "Reembolsado",
                        PENDING: "Pendiente",
                        FAILED: "Fallido",
                      }[order.paymentStatus] || "—"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
