"use client";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="text-center py-16">
      <div className="mx-auto w-40 mb-6">
        {/* SVG de carrito vacío */}
        <svg
          className="w-full h-auto text-gray-400"
          viewBox="0 0 1024 1024"
          fill="none"
        >
          <path
            d="M320 832a64 64 0 100 128 64 64 0 000-128zm448 0a64 64 0 100 128 64 64 0 000-128zM160 160h32l96 512h512l96-384H320"
            stroke="currentColor"
            strokeWidth="64"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Tu carrito está vacío
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Agrega productos para continuar con tu compra.
      </p>
      <Link
        href="/"
        className="inline-block px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Explorar productos
      </Link>
    </div>
  );
}
