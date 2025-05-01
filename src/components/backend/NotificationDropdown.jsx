"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, X } from "lucide-react";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <div className="relative py-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="relative inline-flex items-center p-3 text-sm font-medium text-center hover:scale-110 active:scale-100 duration-200 dark:hover:text-slate-50 bg-transparent"
      >
        <Bell />
        <span className="sr-only">Notifications</span>
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full top-0 end-0 dark:border-white">
          20
        </div>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-6 w-80 bg-white divide-y divide-gray-100 rounded-lg shadow-sm border dark:bg-slate-800 dark:divide-slate-500 border-slate-200 dark:border-slate-600"
        >
          <div className="block px-4 py-2 font-medium text-center text-gray-700 bg-gray-100 dark:bg-transparent dark:text-white">
            Notificationes
          </div>
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {[1, 2, 3, 4].map((item, index) => (
              <li
                key={index}
                className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Image
                  className="rounded-full w-11 h-11"
                  src={`/user/avatar${index + 1}.jpg`}
                  alt="Profile image"
                  width={25}
                  height={25}
                />

                <article className="w-full ps-3">
                  <p className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Pedido {index + 1}
                    </span>{" "}
                    sent you a message.
                  </p>
                  <div className="flex items-center space-x-2 ">
                    <Link href="#" title="Ver pedido" className="text-[10px] px-2 py-1 text-slate-50 bg-green-700 border border-white rounded-xl dark:border-gray-800">
                      Nueva
                    </Link>
                    <p className="text-xs text-blue-600 dark:text-blue-500">
                      {" "}
                      {index * 10} minutes ago
                    </p>
                  </div>
                </article>
                <button className="dark:hover:text-slate-50 dark:text-yellow-500 bg-transparent">
                  <X width={15} height={15}/>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
