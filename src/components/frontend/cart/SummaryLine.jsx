export default function SummaryLine({ label, value, className }) {
  const defaultValue = 0;
  return (
    <div className={`flex justify-between pb-2 ${className} `}>
      <span>{label}</span>
      <span className="font-semibold">
        ${value ? value.toFixed(2) : defaultValue.toFixed(2)}
      </span>
    </div>
  );
}
