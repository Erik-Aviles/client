"use client";

export default function TextareaInput({
  label,
  name,
  register,
  errors,
  isRequired = true,
  className = "sm:col-span-2",
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
        <textarea
          {...register(`${name}`, { required: isRequired })}
          name={name}
          id={name}
          rows={3}
          className="block w-full bg-white border border-border dark:bg-slate-700 rounded-lg p-3 focus:ring-amber-400 focus:border-amber-400 dark:placeholder-slate-500 dark:text-white dark:focus:ring-amber-400 dark:focus:border-amber-400"
          defaultValue={""}
          placeholder={`Tipo de ${label.toLowerCase()}...`}
        />
        {errors[`${name}`] && (
          <span className="text-xs text-red-600 ">{label} es requirido</span>
        )}
      </div>
    </div>
  );
}
