import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";

export default function CartCount() {
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <Link
      href="/cart"
      className="relative flex items-center text-sm space-x-1 hover:scale-110 active:scale-100 transition-all duration-300 text-amber-600 dark:text-slate-50 hover:text-amber-500"
    >
      {cartItems.length > 0 && (
        <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 left-4 dark:border-red-900">
          {cartItems.length}
        </span>
      )}
      <ShoppingCart />
      <span className="hidden sm:block pl-1">Cart</span>
    </Link>
  );
}
