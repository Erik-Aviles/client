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
  format = null,
  classNameInput = "focus:ring-amber-400 focus:border-amber-400 dark:bg-slate-700 dark:placeholder-slate-500 dark:text-white dark:focus:ring-amber-400 dark:focus:border-amber-400 py-2",
}) {
  const formatValue = (value) => {
    if (!value) return "";
    if (format === "lowercase") return value.toLowerCase();
    if (format === "capitalize")
      return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    return value;
  };

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
          {...register(name, {
            required: isRequired,
            onChange: (e) => {
              if (format) {
                e.target.value = formatValue(e.target.value);
              }
            },
          })}
          type={type}
          name={name}
          id={name}
          title={readOnly ? "Solo de lectura" : null}
          defaultValue={defaultValue}
          autoComplete={name}
          className={`block w-full text-xs bg-white border rounded-lg transition-all duration-300  ${classNameInput} ${
            readOnly && "cursor-not-allowed"
          }`}
          placeholder={placeholder || `${label}`}
          readOnly={readOnly}
        />
        {errors[`${name}`] && (
          <span className="text-xs text-red-600 ">{label} es requerido</span>
        )}
      </div>
    </div>
  );
}
