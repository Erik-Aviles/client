import { UploadDropzone } from "@/lib/uploadthing";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export default function ImageInput({
  label,
  imageUrl = "",
  setImageUrl,
  className = "sm:col-span-2",
  endpoint = "imageUploader",
}) {
  return (
    <div className={`${className}`}>
      <label
        htmlFor="course-image"
        className="block text-sm font-medium text-slate-800 dark:text-slate-50"
      >
        {label}
      </label>
      {imageUrl ? (
        <div className="mt-2 flex flex-col gap-3 p-4 justify-center rounded-lg bg-white dark:bg-slate-700 border dark:border-slate-500">
          <Image
            src={imageUrl}
            alt="Elemento de la imagen"
            width={1000}
            height={667}
            className="h-64 object-contain"
          />
          <div className="flex items-center justify-center">
            <button
              onClick={() => setImageUrl("")}
              type="button"
              className="flex items-center justify-center space-x-2 text-xs px-3 py-2.5 font-medium rounded-lg text-slate-50 hover:bg-transparent hover:text-slate-700 dark:hover:text-slate-50 border dack:border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100  dark:focus:ring-gray-600 bg-gray-900 dark:border-gray-400 hover:border-gray-700 dark:hover:bg-gray-700"
            >
              <Pencil className="w-4 h-4" />
              <span>Cambiar imagen</span>
            </button>
          </div>
        </div>
      ) : (
        <UploadDropzone
          appearance={{
            container:
              " rounded-lg bg-white dark:bg-slate-700 border dark:border-slate-500 px-0 ",
            allowedContent: "text-slate-500 ",
            label: " text-slate-500 ",
            button: "bg-green-500",
          }}
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            setImageUrl(res[0].ufsUrl);
            // Do something with the response
            toast.success("Imagen cargada exitosamente");
            console.log("Files: ", res);
            console.log("Imagen cargada exitosamente");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            toast.error("Fallo en la carga, Intenta de nuevo");
            console.log(`ERROR! ${error.message}`, error);
          }}
        />
      )}
    </div>
  );
}
