import React from "react";

export default function ToggleInput({
  label,
  name,
  isActive,
  trueTitle,
  falseTitle,
  register,
  className = "sm:col-span-2 justify-end ",
}) {
  return (
    <div
      className={`${className} flex items-center gap-4 pb-4 border-b border-border`}
    >
      <h2 className="block text-sm font-medium text-slate-800 dark:text-slate-50">
        {label}
      </h2>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          {...register(`${name}`)}
          type="checkbox"
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
        <span
          className={`ml-3 text-sm font-semibold uppercase ${
            isActive ? " text-green-500 " : " text-red-500 dark:text-red-600 "
          } `}
        >
          {isActive ? `${trueTitle}` : `${falseTitle}`}
        </span>
      </label>
    </div>
  );
}
