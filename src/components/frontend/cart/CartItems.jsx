"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import defaultImage from "../../../../public/products/defaultImage.png";
import QuantityControl from "./QuantityControl";
import useQuantityHandlers from "@/hooks/useQuantityHandlers";

export default function CartItems({ item }) {
  const {
    inputQty,
    handleCartDelete,
    handleIncrementQty,
    handleDecrementQty,
    handleManualChange,
    handleBlur,
  } = useQuantityHandlers({
    id: item.id,
    qty: item.qty,
    stock: item.stock,
  });

  const price = item.salePrice ?? item.price;
  const subtotal = (price * item.qty).toFixed(2);

  const QuantityControlUI = (
    <QuantityControl
      value={inputQty}
      min={1}
      max={item.stock}
      onIncrement={handleIncrementQty}
      onDecrement={handleDecrementQty}
      onChange={handleManualChange}
      onBlur={handleBlur}
    />
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b pb-4">
      {/* Imagen + info escritorio */}
      <div className="hidden md:col-span-3 md:flex items-center space-x-4">
        <Link
          href={`/products/${item?.slug}`}
          className="shrink-0 inline-block group rounded-lg overflow-hidden"
        >
          <Image
            src={item?.imageUrl || defaultImage}
            alt={item?.title}
            width={100}
            height={100}
            className="w-20 h-20 object-cover transition-transform duration-200 group-hover:scale-105 group-focus:scale-105"
          />
        </Link>
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {item?.title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {item?.brand}
          </p>
        </div>
      </div>

      {/* Imagen + info móvil */}
      <div className="md:hidden flex gap-1 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href={`/products/${item?.slug}`}
            className="shrink-0 inline-block group rounded-lg overflow-hidden"
          >
            <Image
              src={item?.imageUrl || defaultImage}
              alt={item?.title}
              width={100}
              height={100}
              className="w-20 h-20 object-cover transition-transform duration-200 group-hover:scale-105 group-focus:scale-105"
            />
          </Link>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {item?.title}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item?.brand}
            </p>
          </div>
        </div>
        <button
          onClick={handleCartDelete}
          className="text-red-500 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Controles móviles */}
      <div className="md:hidden text-sm text-gray-600 dark:text-gray-300 space-y-1">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-200">
            ${price.toFixed(2)}
          </div>
          <div className="font-bold">${subtotal}</div>
          {QuantityControlUI}
        </div>
      </div>

      {/* Escritorio: cantidad */}
      <div className="hidden md:block text-center">{QuantityControlUI}</div>

      {/* Escritorio: precio unitario */}
      <div className="hidden md:block text-center text-gray-700 dark:text-gray-200">
        ${price.toFixed(2)}
      </div>

      {/* Escritorio: subtotal y eliminar */}
      <div className="hidden md:flex items-center justify-evenly text-center font-semibold text-gray-900 dark:text-white">
        ${subtotal}
        <div className="hidden md:block text-center">
          <button
            onClick={handleCartDelete}
            className="text-red-500 p-2 rounded-full hover:bg-gray-300/20 dark:hover:bg-gray-600/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
