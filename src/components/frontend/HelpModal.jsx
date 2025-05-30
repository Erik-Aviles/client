"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { Headset, HelpCircle, MailQuestion, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HelpModal() {
  const phoneCompany = "+593 9888 666";
  const whatsAppCompany = "+593 9888 666";
  const emailCompany = "betimescompany@gmail.com";

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center space-x-1 hover:scale-110 active:scale-100 duration-200 text-amber-400 hover:text-amber-500 dark:text-amber-400  dark:hover:text-slate-50 bg-transparent"
      >
        <HelpCircle />
        <span className="hidden sm:block">Ayuda</span>
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>
          Necesitas ayuda? Contactanos por nuestros canales.{" "}
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-5 text-sm">
            <Link
              href={phoneCompany}
              className="flex items-center space-x-2 leading-relaxed text-sky-600 font-semibold"
            >
              <div className="flex justify-center items-center p-2 w-10 h-10 rounded-full bg-sky-200">
                <Headset />
              </div>
              <span>Llamada {phoneCompany}</span>
            </Link>
            <Link
              href={phoneCompany}
              className="flex items-center space-x-2 leading-relaxed text-lime-600 font-semibold"
            >
              <div className="flex justify-center items-center p-2 w-10 h-10 rounded-full bg-lime-200">
                <Phone />
              </div>
              <span>WhatsApp {whatsAppCompany} </span>
            </Link>
            <Link
              href={"#"}
              className="flex items-center space-x-2 leading-relaxed text-pink-500 font-semibold"
            >
              <div className="flex justify-center items-center p-2 w-10 h-10 rounded-full bg-pink-200">
                <MailQuestion />
              </div>
              <span>{emailCompany}</span>
            </Link>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
