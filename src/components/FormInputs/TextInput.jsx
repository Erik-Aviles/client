export default function TextInput({
  label,
  name,
  register,
  errors,
  isRequired = true,
  type = "text",
  className = "sm:col-span-2",
  defaultValue = "",
  readOnly = false,
  placeholder,
  classNameInput = "focus:ring-amber-400 focus:border-amber-400 dark:bg-slate-700  dark:placeholder-slate-500 dark:text-white dark:focus:ring-amber-400 dark:focus:border-amber-400 border-border py-2",
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
        <input
          {...register(`${name}`, { required: isRequired })}
          type={type}
          name={name}
          id={name}
          defaultValue={defaultValue}
          autoComplete={name}
          className={`block w-full bg-white border rounded-lg  transition-all duration-300  ${classNameInput}`}
          placeholder={placeholder || `${label.toLowerCase()}`}
          readOnly={readOnly}
        />
        {errors[`${name}`] && (
          <span className="text-xs text-red-600 ">{label} es requerido</span>
        )}
      </div>
    </div>
  );
}
