"use client";

import { useState } from "react";
import { CheckCircle2, X, XCircle } from "lucide-react";

export default function CouponInput({code, setCode, onApply, onClear }) {

  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = async () => {
    if (!code?.trim()) {
      setError("Ingresa un código válido");
      return;
    }

    setIsLoading(true);
    setError("");
    setApplied(false);

    try {
      const success = await onApply(code.trim());

      if (success) {
        setApplied(true);
        setError("");
      } else {
        setApplied(false);
        setError("Cupón inválido o expirado");
      }
    } catch (err) {
      setError("Error al aplicar el cupón");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setApplied(false);
    setError("");
    if (onClear) onClear();
  };

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
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full pr-10 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
            placeholder="Ingrese un código..."
            aria-describedby="couponHelp"
          />
          {code && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600"
              title="Quitar cupón"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={handleApply}
          disabled={isLoading || applied}
          className="bg-lime-600 hover:bg-lime-500 text-white text-sm px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {isLoading ? "Aplicando..." : "Aplicar"}
        </button>
      </div>

      
      {error && (
        <p className="flex items-center text-red-600 text-xs" id="couponHelp">
          <XCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </form>
  );
}
