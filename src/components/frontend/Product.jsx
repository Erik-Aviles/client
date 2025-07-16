"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import HoverTooltip from "./HoverTooltip";
import AddRemoveCart from "./cart/AddRemoveCart";
import defaultImage from "../../../public/products/defaultImage.png";

export default function Product({ item }) {
  return (
    <article className="flex flex-col bg-white h-full dark:bg-slate-700 rounded-lg shadow transition-transform duration-300 hover:shadow-xl overflow-hidden">
      <Link
        href={`/products/${item?.slug}`}
        className="w-full aspect-video relative bg-white overflow-hidden"
      >
        <Image
          src={
            item?.imageUrl && item.imageUrl.trim() !== ""
              ? item.imageUrl
              : defaultImage
          }
          alt={item?.title || "Imagen del producto"}
          fill
          className="object-contain transition-all duration-300 hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </Link>
      <div className="py-2 px-4 dark:border rounded-lg flex flex-col gap-1.5 flex-1">
        <div className="dark:text-white flex justify-between items-center ">
          <span
            className={` ${
              item?.salePrice ? " line-through text-sm " : "font-semibold"
            }   `}
          >
            ${item?.price.toFixed(2)}
          </span>
          {item?.salePrice && (
            <span className="font-semibold">${item?.salePrice.toFixed(2)}</span>
          )}
        </div>
        <Link href={`/products/${item?.slug}`}>
          <div className="relative group uppercase">
            <h2 className="font-bold transition-all duration-300 dark:text-white text-sm line-clamp-1">
              {item?.title}
            </h2>
            <HoverTooltip title={item?.title} />
          </div>
        </Link>
        <div className="relative group capitalize">
          <p className=" text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
            {item?.description}
          </p>
          <HoverTooltip title={item?.description} className="-top-2" />
        </div>

        <div className="mt-auto ">
          <AddRemoveCart product={item} />
        </div>
      </div>
    </article>
  );
}
