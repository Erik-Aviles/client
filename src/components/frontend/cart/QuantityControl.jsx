"use client";

import { Minus, Plus } from "lucide-react";

export default function QuantityControl({
  value,
  min = 0,
  max = Infinity,
  onIncrement,
  onDecrement,
  onChange,
  onBlur,
}) {
  const handleInputKeyDown = (e) => {
    const invalidChars = ["e", "E", "+", "-", "."];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="inline-flex items-center rounded-lg border overflow-hidden">
      <button
        onClick={onDecrement}
        disabled={value <= min}
        className={`w-8 h-8 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Disminuir cantidad"
      >
        <Minus className="w-4 h-4" />
      </button>

      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        step={1}
        pattern="\d*"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={handleInputKeyDown}
        className="w-14 h-8 text-center text-sm border-none bg-transparent text-gray-800 dark:text-white outline-none"
        aria-label="Cantidad"
      />
      <button
        onClick={onIncrement}
        disabled={value >= max}
        className={`w-8 h-8 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Aumentar cantidad"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
