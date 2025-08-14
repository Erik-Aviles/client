import React, { useMemo } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Edit, ShoppingBag } from "lucide-react";

export default function CartBanner() {
  const cartItems = useSelector((store) => store.cart.items);
  const taxableBase = useSelector((store) => store.cart.totals.taxableBase);
  const items = cartItems?.length;

  return (
    <div className="bg-slate-100 dark:bg-slate-700 rounded-xl">
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center ">
            <div className="inline-flex items-center justify-center flex-shrink-0 bg-slate-400 rounded-full w-7 h-7 md:w-9 md:h-9 text-slate-50">
              <ShoppingBag className="w-4 h-4 md:w-6 md:h-6" />
            </div>
            <div className="text-slate-900 dark:text-slate-100 flex items-center flex-1 flex-wrap">
              <p className="ml-1 md:ml-3 text-xs md:text-base font-normal ">
                Tienes <span className="font-bold">{items}</span> productos en
                el carrito.
              </p>
              <p className="ml-1 md:ml-3 text-xs md:text-base font-normal ">
                El total estimado es{" "}
                <span className="font-bold">
                  ${taxableBase ? taxableBase.toFixed(2) : "0.00"}
                </span>
              </p>
            </div>
          </div>

          <div>
            <Link
              href="/cart"
              className="inline-flex items-center px-2 py-1 md:px-4 md:py-2 text-sm font-bold text-slate-600 transition-all duration-200 border rounded-md bg-white hover:bg-slate-900 hover:text-slate-50 dark:hover:opacity-70  dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:text-slate-900 focus:ring-offset-2 focus:ring-slate-500"
            >
              <Edit className="md:mr-2 w-4 h-4" />
              <span className="hidden md:block">Ir al carrito</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
