"use client";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ArrayItemsInput({
  itemTitle = "elemento",
  items,
  setItems,
  className = "sm:col-span-2",
}) {
  const [item, setItem] = useState("");
  const [showItemsForm, setShowItemsForm] = useState(false);

  function addItem() {
    if (!item) {
      return toast.error(`Debe escribir una ${itemTitle}.`);
    }
    setItems([...items, item]);
    setItem("");
  }

  function removeItem(index) {
    const newItem = [...items];
    newItem?.splice(index, 1);
    setItems(newItem);
  }
  return (
    <div className={`${className}`}>
      <p className="block text-sm pb-2 font-medium text-slate-800 dark:text-slate-50 capitalize">
        {itemTitle}s
      </p>
      <div className={`flex flex-col gap-4 border rounded-lg p-3`}>
        {showItemsForm ? (
          <div className="flex gap-2 items-center ">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="-4 h-4 text-gray-500 dark:text-gray-400 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                value={item}
                onChange={(e) => setItem(e.target.value)}
                type="text"
                id="voice-search"
                className="bg-white border border-border text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500"
                placeholder={`Crear una ${itemTitle}...`}
              />
            </div>
            <button
              onClick={addItem}
              type="button"
              className="inline-flex justify-center items-center gap-2 text-xs whitespace-nowrap p-2 text-center shrink-0 text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-2 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden lg:inline">Agregar</span>
            </button>
            <button
              onClick={() => setShowItemsForm(false)}
              type="button"
              className="inline-flex justify-center items-center gap-2 text-xs whitespace-nowrap p-2 text-center shrink-0  text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              <X className="w-4 h-4" />
              <span className="hidden lg:inline capitalize">quitar</span>
            </button>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={() => setShowItemsForm(!showItemsForm)}
              type="button"
              className="inline-flex justify-center items-center gap-2 text-xs whitespace-nowrap p-2 text-center shrink-0 text-white bg-slate-800 rounded-lg border hover:bg-slate-700 focus:ring-2 focus:outline-none focus:ring-slate-600 dark:bg-slate-900 dark:hover:bg-slate-500"
            >
              <Plus />
              <span>Agregar {itemTitle}</span>
            </button>
          </div>
        )}

        <div className={` ${items.length === 0 ? " hidden " : " flex flex-wrap gap-2 "}`}>
          {items?.map((item, i) => {
            return (
              <div
                key={i}
                className="flex gap-2 py-1 px-2 items-center border  border-slate-300 dark:bg-slate-700 dark:border-slate-700 rounded-lg"
              >
                <p className="capitalize text-xs">{item}</p>
                <button
                  onClick={() => removeItem(i)}
                  type="button"
                  className="inline-flex shrink-0 items-center p-1 text-red-600  dark:text-white dark:hover:text-red-600  focus:ring-2 focus:outline-none focus:ring-red-300  dark:focus:ring-red-800 rounded-lg"
                >
                  <X className="w-4 h-4 " />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
