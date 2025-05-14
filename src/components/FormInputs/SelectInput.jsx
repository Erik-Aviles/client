import React from "react";

export default function SelectInput({
  label,
  name,
  register,
  className= "sm:col-span-2",
  options = [],
  multiple = false,
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-800 dark:text-slate-50 capitalize"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          {...register(`${name}`)}
          id={name}
          multiple={multiple}
          name={name}
          className="block w-full bg-white border border-border rounded-lg p-3 focus:ring-amber-400 focus:border-amber-400 dark:bg-slate-700  dark:placeholder-slate-500 dark:text-white dark:focus:ring-amber-400 dark:focus:border-amber-400 capitalize"
        >
          {options.map((option, i) => {
            return (
              <option key={i} value={option.id}>
                {option.title}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}