"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import defaultImage from "../../../../public/products/defaultImage.png";
import Link from "next/link";

export default function CartItem({ item, handleRemove, onChange }) {
  const min = 1;

  const decrease = () => {
    if (item.quantity > min) {
      onChange(item.quantity - 1);
    }
  };

  const increase = () => {
    onChange(item.quantity + 1);
  };

  const handleManualChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= min) {
      onChange(newValue);
    }
  };

  const QuantityControl = (
    <div className="inline-flex items-center rounded-lg border overflow-hidden">
      <button
        onClick={decrease}
        className="w-8 h-8 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30"
        aria-label="Disminuir cantidad"
        disabled={item.quantity <= min}
      >
        <Minus className="w-4 h-4" />
      </button>

      <input
        type="number"
        inputMode="numeric"
        min={min}
        value={item.quantity}
        onChange={handleManualChange}
        className="w-14 h-8 text-center text-sm border-none bg-transparent text-gray-800 dark:text-white right-0"
        aria-label="Cantidad"
      />

      <button
        onClick={increase}
        className="w-8 h-8 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Aumentar cantidad"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
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
            src={item.image || defaultImage}
            alt={item.name}
            width={100}
            height={100}
            className="w-20 h-20 object-cover transition-transform duration-200 group-hover:scale-105 group-focus:scale-105"
          />
        </Link>
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {item.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {item.brand}
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
              src={item.image || defaultImage}
              alt={item.name}
              width={100}
              height={100}
              className="w-20 h-20 object-cover transition-transform duration-200 group-hover:scale-105 group-focus:scale-105"
            />
          </Link>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {item.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.brand}
            </p>
          </div>
        </div>
        <button
          onClick={() => handleRemove(item.id)}
          className="text-red-500 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Controles móviles */}
      <div className="md:hidden text-sm text-gray-600 dark:text-gray-300 space-y-1">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-200">
            ${item.price.toFixed(2)}
          </div>
          <div className="font-bold">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
          {QuantityControl}
        </div>
      </div>

      {/* Escritorio: cantidad */}
      <div className="hidden md:block text-center">{QuantityControl}</div>

      {/* Escritorio: precio unitario */}
      <div className="hidden md:block text-center text-gray-700 dark:text-gray-200">
        ${item.price.toFixed(2)}
      </div>

      {/* Escritorio: subtotal */}
      <div className="hidden md:flex items-center justify-evenly text-center font-semibold text-gray-900 dark:text-white">
        ${(item.price * item.quantity).toFixed(2)}
        <div className="hidden md:block text-center">
          <button
            onClick={() => handleRemove(item.id)}
            className="text-red-500 p-2 rounded-full hover:bg-gray-300/20 dark:hover:bg-gray-600/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Escritorio: eliminar */}
    </div>
  );
}
