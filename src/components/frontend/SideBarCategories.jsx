import { getData } from "@/lib/getData";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import defaultImage from "../../../public/products/defaultImage.png";

export default async function SideBarCategories() {
  const categoriesData = await getData("categories");
  const categories = categoriesData.filter(category => {
  if (!category) return false;
  const isActive = category.isActive ?? true;
  const productCount = category.products?.length ?? 0;
  return isActive && productCount >= 1;
})
  return (
    <>
      <h2 className="dark:text-slate-300 text-base bg-slate-100 dark:bg-slate-700 py-2 px-3 border-b font-semibold">
        Categorías ({categories.length})
      </h2>
      <div className="flex flex-col gap-3 py-3 px-4 h-[320px] overflow-y-auto dark:text-slate-300">
        {categories?.map((category) => {
          return (
            <Link
              key={category?.id}
              href="#"
              className="capitalize text-sm leading-relaxed flex items-center gap-3 rounded-r-sm rounded-l-3xl hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-amber-500 transition-all duration-300 "
            >
              <Image
                src={
                  category?.imageUrl && category.imageUrl.trim() !== ""
                    ? category.imageUrl
                    : defaultImage
                }
                alt={category?.title || "Imagen del producto"}
                width={100}
                height={100}
                className="w-10 h-10 rounded-full object-cover border border-amber-200 dark:border-amber-700"
              />
              <span>{category?.title}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
