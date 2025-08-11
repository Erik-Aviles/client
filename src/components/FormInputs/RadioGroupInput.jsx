"use client";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useController } from "react-hook-form";

export default function RadioGroupInput({
  name,
  label,
  control,
  errors,
  isRequired = true,
  message = "Escoger una opción",
  className = "sm:col-span-2",
  options = [],
}) {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules: { required: isRequired && message },
  });

  return (
    <TooltipProvider>
      <div className={className}>
        {label && (
          <h3 className="mb-5 text-sm font-medium text-slate-900 dark:text-white">
            {label}
          </h3>
        )}

        <ul className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2">
          {options.map((option, i) => {
            const LeftIcon = option.iconLeft;
            const RightIcon = option.iconRight;

            const optionContent = (
              <label
                htmlFor={`${name}-${option.id || option.value}`}
                className="inline-flex items-center justify-between w-full p-5 text-slate-500 bg-white border border-slate-200 rounded-lg cursor-pointer
                dark:hover:text-slate-300 dark:border-slate-700 dark:peer-checked:text-amber-500
                peer-checked:border-amber-600 dark:peer-checked:border-amber-600 peer-checked:text-amber-600
                hover:text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                <div className="flex-1 flex items-center gap-2">
                  {LeftIcon && <LeftIcon className="w-8 h-8" />}
                  <div className="block">
                    <div className="w-full text-lg font-semibold">
                      {option.title}
                    </div>
                    {option.subTitle && (
                      <div className="w-full">{option.subTitle}</div>
                    )}
                    {option.description && (
                      <div className="w-full text-xs">{option.description}</div>
                    )}
                  </div>
                </div>
                {RightIcon && <RightIcon className="w-5 h-5" />}
              </label>
            );

            return (
              <li key={i}>
                <input
                  type="radio"
                  name={name}
                  id={`${name}-${option.id || option.value}`}
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => onChange(option.value)}
                  className="hidden peer"
                />
                {option.tooltip ? (
                  <Tooltip >
                    <TooltipTrigger asChild>{optionContent}</TooltipTrigger>
                    <TooltipContent side="top">
                      <span className="text-xs">{option.tooltip}</span>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  optionContent
                )}
              </li>
            );
          })}
        </ul>
        {errors[name] && (
          <span className="text-xs text-red-600">{errors[name]?.message}</span>
        )}
      </div>
    </TooltipProvider>
  );
}
