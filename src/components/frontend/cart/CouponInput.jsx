"use client";

import { useCallback, useState } from "react";
import { X, XCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { findCoupon } from "@/lib/couponService";
import { updateCartTotals } from "../../../../redux/slices/cartSlice";

export default function CouponInput({ coupon }) {
  const [codeInput, setCodeInput] = useState("");
  const [couponApplied, setCouponApplied] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleApplyCoupon = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await findCoupon(codeInput.trim());

      if (!response.valid) {
        setError(response.message || "Cupón inválido");
        setCouponApplied("");
        dispatch(updateCartTotals({ coupon: { couponCode: "", value: 0 } }));
        return false;
      }

      const value = Number(response.coupon.value) || 0;

      setCouponApplied(response.coupon.couponCode);
      setError("");
      dispatch(
        updateCartTotals({
          coupon: {
            couponCode: response.coupon.couponCode,
            value: value,
          },
        })
      );
      toast.success(response.message || "Cupón aplicado con éxito");
      return true;
    } catch (error) {
      setError("Error al validar el cupón");
      return false;
    } finally {
      setIsLoading(false); // Fin carga siempre
    }
  }, [codeInput, dispatch]);

  const handleClear = useCallback(() => {
    setCouponApplied("");
    setCodeInput("");
    setError("");
    dispatch(updateCartTotals({ coupon: { couponCode: "", value: 0 } }));
  }, [dispatch]);

  return (
    <form className="space-y-2">
      <label
        htmlFor="coupon"
        className="block text-sm font-medium text-slate-800 dark:text-gray-300"
      >
        ¿Tienes un cupón?
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            id="coupon"
            type="text"
            value={codeInput || coupon || ""}
            onChange={(e) => setCodeInput(e.target.value)}
            className="w-full pr-10 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
            placeholder="Ingrese un código..."
            aria-describedby="couponHelp"
          />
        </div>
        {coupon || error ? (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-2 bg-red-500 text-whitetext-sm px-4 py-2 rounded-lg"
            title="Quitar cupón"
          >
            Quitar
          </button>
        ) : (
          <button
            type="button"
            onClick={handleApplyCoupon}
            disabled={isLoading || couponApplied}
            className="bg-lime-600 hover:bg-lime-500 text-white text-sm px-4 py-2 rounded-lg"
          >
            {isLoading ? "Aplicando..." : "Aplicar"}
          </button>
        )}
      </div>

      {error ? (
        <p className="flex items-center text-red-600 text-xs" id="couponHelp">
          <XCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      ) : null}
    </form>
  );
}
