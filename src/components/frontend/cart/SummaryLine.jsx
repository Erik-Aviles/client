import { fmt } from "@/utils/formats/currencyFormat";

/* ({ label, value, className }) {
  const defaultValue = 0;
  return (
    <div className={`flex justify-between pb-2 ${className} `}>
      <span>{label}</span>
      <span className="font-semibold">
        ${value ? value.toFixed(2) : defaultValue.toFixed(2)}
      </span>
    </div>
  );
} */

// Componente de línea de resumen
export default function SummaryLine({
  label,
  value,
  big = false,
  strong = false,
  crossed = false,
  emphasis = false,
}) {
  const clsLabel = "text-slate-600 dark:text-slate-300";
  const clsValueBase = "text-slate-900 dark:text-slate-100";
  const cls = [
    "flex items-center justify-between",
    big ? "text-base md:text-lg" : "text-sm",
  ].join(" ");

  const v = Number(value ?? 0);
  const formatted = fmt(v);

  return (
    <div className={cls}>
      <span
        className={[
          clsLabel,
          emphasis ? "text-lime-600 dark:text-lime-400" : "",
          strong ? "font-semibold" : "",
        ].join(" ")}
      >
        {label}
      </span>
      <span
        className={[
          clsValueBase,
          crossed ? "line-through" : "",
          strong ? "font-semibold" : "",
          emphasis ? "text-lime-600 dark:text-lime-400" : "",
        ].join(" ")}
      >
        {formatted}
      </span>
    </div>
  );
}
