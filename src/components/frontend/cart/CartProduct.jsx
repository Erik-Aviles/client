"use client";

import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import CartItems from "./CartItems";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../../../redux/slices/cartSlice";

export default function CartProduct({ cartItems, subTotal }) {
  const dispatch = useDispatch();

  const handleClearCart = () => {
    if (cartItems.length === 0) return;

    Swal.fire({
      title: "Estas seguro de vaciar el carrito?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(emptyCart());
        toast.success("Carrito vaciado");
      }
    });
  };

  return (
    <div className="md:col-span-full lg:col-span-8 flex flex-col gap-3">
      <div className="flex items-center justify-between py-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tu carrito
        </h1>
        <p className="text-xs capitalize">
          {cartItems.length} {cartItems.length === 1 ? "producto" : "productos"}
        </p>
      </div>

      {/* Cabecera tabla */}
      <div className="hidden md:grid grid-cols-6 gap-4 border-b pb-2 mb-4 text-sm font-medium text-gray-600 dark:text-gray-400">
        <div className="col-span-3">Producto</div>
        <div className="text-center">Cantidad</div>
        <div className="text-center">P. Unitario</div>
        <div className="text-center">Subtotal</div>
      </div>

      {/* Lista de productos */}
      <div className="space-y-4">
        {cartItems?.map((item, i) => {
          return <CartItems key={item.id + i} item={item} />;
        })}
      </div>

      {/* Acciones */}
      <div className="mt-6 flex  justify-between items-center">
        <button
          onClick={handleClearCart}
          className="flex items-center gap-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Trash2 className="w-5 h-5" />
          <span className="text-xs md:text-sm whitespace-nowrap">
            Vaciar carrito
          </span>
        </button>
        <p className="text-sm md:text-lg font-medium text-center  text-gray-800 dark:text-gray-200">
          Total estimado:{" "}
          <span className="font-bold">${subTotal.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}
