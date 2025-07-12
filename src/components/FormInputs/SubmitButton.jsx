import React from "react";
import { Pencil, Plus } from "lucide-react";
import LoadingButton from "./LoadingButton";

export default function SubmitButton({
  isLoading = false,
  isEditing = false,
  itemName = "elemento",
  buttonTitle,
  buttonLoading,
  withIcon = true,
  className = "text-white bg-amber-400 dark:bg-amber-500 focus:ring-amber-600 hover:bg-amber-500 hover:dark:bg-amber-400",
}) {
  const defaultTitle = isEditing
    ? `Actualizar ${itemName}`
    : `Crear ${itemName}`;
  const defaultLoading = isEditing
    ? `Actualizando ${itemName}...`
    : `Creando ${itemName}...`;

  return isLoading ? (
    <LoadingButton text={buttonLoading ?? defaultLoading} className={className} />
  ) : (
    <button
      type="submit"
      className={`inline-flex items-center justify-center font-medium text-center transition-all duration-200 gap-1 px-3 py-2 text-xs sm:text-sm rounded-lg focus:ring-4  ${className}`}
    >
      {withIcon &&
        (isEditing ? (
          <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
        ) : (
          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
        ))}
      <span>{buttonTitle ?? defaultTitle}</span>
    </button>
  );
}
