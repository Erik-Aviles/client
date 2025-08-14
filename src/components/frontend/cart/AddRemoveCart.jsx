"use client";

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { CheckCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../../redux/slices/cartSlice";

const AddRemoveCart = ({ product }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );
  const qty = cartItem?.qty || 0;

  const handleToggleCart = () => {
    if (qty === 0) {
      dispatch(addToCart(product));
      toast.success("Producto agregado al carrito");
    } else {
      dispatch(removeFromCart(product.id));
      toast.success("Producto eliminado del carrito");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
      {/* Botón Agregar / Actualizar */}
      <button
        onClick={handleToggleCart}
        className={`flex items-center justify-center gap-1 font-semibold  text-xs p-1.5 rounded-sm w-auto sm:w-full transition-all duration-300 ${
          qty === 0
            ? " bg-black dark:bg-amber-600  text-white  hover:bg-black/70 dark:hover:bg-amber-600/70"
            : " bg-lime-500 hover:bg-lime-500/70 text-lime-800"
        }`}
      >
        {qty === 0 ? "Agregar" : "Agregado"}
        {qty > 0 && <CheckCheck className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default AddRemoveCart;
