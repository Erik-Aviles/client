import AddRemoveCart from "@/components/frontend/cart/AddRemoveCart";
import BreadcrumbAuto from "@/components/frontend/BreadcrumbAuto";
import CategoryCarousel from "@/components/frontend/CategoryCarousel";
import ShareComponent from "@/components/frontend/ShareComponent";
import { getData } from "@/lib/getData";
import { Tag } from "lucide-react";
import Image from "next/image";
import React from "react";
import { fmt } from "@/utils/formats/currencyFormat";

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  const product = await getData(`products/product/${slug}`);
  const category = await getData(`categories/${product.categoryId}`);

  if (!product) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
          <h1 className="text-xl font-bold mb-2">Pedido no encontrado</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            NO se ha encontrado el producto o el enlace no sea válido.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/40"
          >
            <Home className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </section>
    );
  }
  return (
    <section className="mb-10">
      <BreadcrumbAuto />
      {/* <div className="grid [grid-template-columns:repeat(auto-fit,minmax(0,1fr))] gap-4"> */}
      <div className="grid md:grid-cols-6 lg:grid-cols-12 gap-16 md:gap-8 ">
        {/* Imagen */}
        <div className="md:col-span-2 lg:col-span-3">
          <Image
            src={
              product?.imageUrl
                ? product.imageUrl
                : "/products/defaultImage.png"
            }
            alt={product?.title}
            width={556}
            height={556}
            className="w-full"
          />
        </div>

        {/* Detalle del producto */}
        <div className="md:col-span-4 lg:col-span-6 flex flex-col gap-5">
          <div className="flex items-center justify-between ">
            <h2 className="text-xl lg:text-3xl font-semibold uppercase ">
              {product?.title}
            </h2>
            <ShareComponent />
          </div>

          <p className="">{product?.description}</p>

          <div className="flex items-center justify-between">
            <p className="text-xs">
              {"CODIGO: "}
              <span className="text-slate-500 dark:text-slate-400">
                {product?.code}
              </span>
            </p>
            <p className="text-slate-50 text-xs bg-lime-600 rounded-full py-1 px-2 pointer-events-none">
              <b>Stock: </b>
              {product?.stock}
            </p>
          </div>

          <div className="flex gap-3 items-center justify-between">
            <div className="flex gap-3 items-center">
              <h4 className="text-2xl">
                <b>
                  {product?.hasDiscount
                    ? fmt(product?.salePrice)
                    : fmt(product?.price)}
                </b>
              </h4>
              {product?.hasDiscount && (
                <del className=" text-lg text-slate-400">
                  {fmt(product?.price)}
                </del>
              )}
            </div>
            <p className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm">
              <Tag className="w-5 h-5" />
              <span>Ahorre un 50% ahora mismo</span>
            </p>
          </div>

          <AddRemoveCart />

          <hr className="mt-5 border-slate-200 dark:border-slate-700" />

          <div className="flex flex-wrap gap-2 capitalize">
            <div className="flex flex-grow gap-2">
              <p className="text-xs">Categorias:</p>
              <small className="text-slate-500 dark:text-slate-400">
                {category.title}
              </small>
            </div>
            {product?.tags.length !== 0 &&
              product?.tags.map((it, i) => {
                return (
                  <div className="text-xs flex flex-grow gap-2">
                    <p className="text-xs">Etiquetas:</p>
                    <small
                      key={i}
                      className="text-slate-500 dark:text-slate-400"
                    >
                      {i}
                    </small>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Informacion adicional */}
        <div className="md:col-span-6 lg:col-span-3 bg-white border rounded-lg dark:bg-slate-900 text-slate-800 overflow-hidden ">
          <h2 className=" dark:text-slate-300 text-base bg-slate-100 dark:bg-slate-700 py-2 px-3 border-b font-semibold">
            Información adicional
          </h2>
          <div className="p-4 dark:text-slate-400">
            Entrega al día siguiente de 8:00 a.m. a 6:00 p.m.
          </div>
          <div className="p-4 text-lime-600">
            Elegible para entrega gratuita
          </div>
        </div>
      </div>

      {/*   <div className=" dark:bg-slate-700 my-8 rounded-xl p-4 border">
        <h2 className="text-2xl font-semibold dark:text-slate-200 md:ml-3 mb-4">
          Productos similares
        </h2>
        <CategoryCarousel products={category?.products} />
      </div> */}
    </section>
  );
}
