import React from "react";
import { getData } from "@/lib/getData";
import PdfDownloader from "@/components/PdfDownloader ";
import { formatName } from "@/utils/formats/formatName";
import SalesInvoice from "@/components/Order/SalesInvoice";
import Heading from "@/components/backoffice/styledComponent/Heading";

export default async function InvoicePage({ params }) {
  const id = await params.id;
  const order = await getData(`orders/${id}`);
  const fullName = `${order?.firstName ?? ""} ${order?.lastName ?? ""}`.trim();
  const result = formatName(fullName);
  const fileName = `factura-${order?.orderNumber ?? "000"}_${result}`;

  return (
    <section className="flex flex-col gap-3 bg-white dark:bg-slate-900">
      <div className="px-4 md:px-6">
        <Heading title="Factura" />
        <PdfDownloader triggerLabel="Descargar/Imprimir" fileName={fileName}>
          <SalesInvoice order={order} />
        </PdfDownloader>
      </div>
      <div className="overflow-y-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[calc(100vh-161px)]">
          <SalesInvoice order={order} />
        </div>
      </div>
    </section>
  );
}
