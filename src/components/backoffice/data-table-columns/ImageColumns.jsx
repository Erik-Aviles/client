import React from "react";
import Image from "next/image";
import defaulImage from "../../../../public/categories/defaultImage.png";

export default function ImageColumns({ row, imageUrl, title, fallback }) {
  const name = row.original[title] ?? fallback;
  const index = row.index;
  return (
    <div className="shrink-0">
      <Image
        src={imageUrl || defaulImage}
        width={500}
        height={500}
        alt={name || "Imagen de una categoria"}
        className="w-20 h-20 rounded-3xl"
        priority={index < 4}
      />
    </div>
  );
}
