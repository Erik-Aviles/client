import React from "react";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Heading from "@/components/backoffice/styledComponent/Heading";
import OrderCard from "@/components/Order/OrderCard";

export default async function Orders() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const orders = userId ? await getData(`/orders/user/${userId}`) : [];

  return (
    <section className="flex flex-col gap-3 bg-white dark:bg-slate-900">
      <div className="px-4 md:px-6">
        <Heading title="Detalles de Pedidos" />
        {orders && (
          <p className="mt-2 text-sm font-normal text-gray-600 dark:text-gray-200">
            Consulta el estado de pedidos recientes y antiguos y descubre más
            productos.
          </p>
        )}
      </div>
      <div className="overflow-y-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[calc(100vh-144.89px)]">
          <ul className="w-full m-auto caption-bottom space-y-5 py-6 sm:space-y-6 lg:space-y-10 max-w-7xl">
            {orders?.length > 0 ? (
              orders?.map((order) => (
                <OrderCard key={order?.id} order={order} />
              ))
            ) : (
              <li className="text-center">Aun no hay pedidos realizados</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
