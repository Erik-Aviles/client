"use client";

import { CheckCheck, Minus, Plug, Plus } from "lucide-react";
import React, { useState } from "react";

const AddRemoveCart = ({
  product = [],
  addProduct,
  removeProduct,
  cartProducts = [],
}) => {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount((prev) => prev + 1);
    // addProduct?.(product._id);
  };

  const handleRemove = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
      // removeProduct?.(product._id);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
      {/* Botones + y - */}
      <div className="w-full grid grid-cols-3 items-center gap-2 sm:gap-1">
        <button
          onClick={handleRemove}
          disabled={count === 0}
          className="flex justify-center border rounded py-1.5 font-bold text-amber-500 dark:text-white dark:bg-slate-800 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-500 transition disabled:opacity-50"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="px-2 text-lg text-black dark:text-white text-center">
          {count}
        </span>
        <button
          onClick={handleAdd}
          className="flex justify-center  border rounded py-1.5 text-sm font-bold text-amber-500 dark:text-white dark:bg-slate-800 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-500 transition"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Botón Agregar / Actualizar */}
      {count > 0 && (
        <button className="flex items-center justify-center text-xs gap-1 px-3 py-1.5 rounded-sm w-auto sm:w-full bg-lime-500 text-lime-800 transition">
          <CheckCheck className="w-4 h-4" />
        </button>
      )}

      {count === 0 && (
        <button className="flex items-center font-semibold justify-center text-xs gap-1 px-3 py-1.5 rounded-sm w-auto  sm:w-full bg-black text-white dark:border hover:bg-black/70  transition ">
          Agregar
        </button>
      )}
    </div>
  );
};

export default AddRemoveCart;
