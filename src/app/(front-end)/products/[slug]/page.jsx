import AddRemoveCart from "@/components/frontend/AddRemoveCart";
import BreadcCrumb from "@/components/frontend/BreadcCrumb";
import ShareComponent from "@/components/frontend/ShareComponent";
import { Share2, Tag } from "lucide-react";
import Image from "next/image";
import React from "react";

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  return (
    <section className="mb-10">
      <BreadcCrumb />
      {/* <div className="grid [grid-template-columns:repeat(auto-fit,minmax(0,1fr))] gap-4"> */}
      <div className="grid md:grid-cols-6 lg:grid-cols-12 gap-16 md:gap-8 ">
        <div className="md:col-span-2 lg:col-span-3">
          <Image
            src={"/products/defaultImage.png"}
            alt={"una imagen"}
            width={556}
            height={556}
            className="w-full"
          />
        </div>

        <div className="md:col-span-4 lg:col-span-6 flex flex-col gap-5">
          <div className="flex items-center justify-between ">
            <h2 className="text-xl lg:text-3xl font-semibold ">Barrita loca</h2>
            <ShareComponent />
          </div>
          <div>
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
              ipsum dolor sit, .
            </p>
            <div className="flex items-center justify-between">
              {" "}
              <p className="text-xs">
                {"CODIGO: "}
                <span className="text-slate-500 dark:text-slate-400">
                  1234565677
                </span>
              </p>
              <p className="text-slate-50 text-xs bg-lime-600 rounded-full py-1 px-2 pointer-events-none">
                <b>Stock: </b>32
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-center justify-between">
            <div className="flex gap-3 items-center  ">
              <h4 className="text-2xl">
                <b>$45</b>
              </h4>
              <del className=" text-lg text-slate-400">$60</del>
            </div>
            <p className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm">
              <Tag className="w-5 h-5" />
              <span>Ahorre un 50% ahora mismo</span>
            </p>
          </div>
          <AddRemoveCart />
          <hr className="mt-5 border-slate-200 dark:border-slate-700 " />
          <div className="flex flex-wrap gap-2 capitalize">
            <div className="text-xs flex flex-grow gap-2">
              {"Categorias:"}
              <small className="text-slate-500 dark:text-slate-400">
                1234565677,
              </small>
              <small className="text-slate-500 dark:text-slate-400">
                1234565677,
              </small>
              <small className="text-slate-500 dark:text-slate-400">
                1234565677
              </small>
            </div>
            <div className="text-xs flex flex-grow gap-2 ">
              {"Etiquetas:"}
              <small className="text-slate-500 dark:text-slate-400">
                1234565677,
              </small>
              <small className="text-slate-500 dark:text-slate-400">
                1234565677,
              </small>
              <small className="text-slate-500 dark:text-slate-400">
                1234565677
              </small>
            </div>
          </div>
        </div>

        <div className="md:col-span-6 lg:col-span-3 bg-white border rounded-lg dark:bg-slate-900 text-slate-800 overflow-hidden ">
          <h2 className=" dark:text-slate-300 text-base bg-slate-100 dark:bg-slate-700 py-2 px-3 border-b font-semibold">
            Información adicional
          </h2>
          <div className="p-4 dark:text-slate-400">
            We Delivery on Next Day from 10:00 AM to 08:00 PM
          </div>
        </div>
      </div>
    </section>
  );
}
