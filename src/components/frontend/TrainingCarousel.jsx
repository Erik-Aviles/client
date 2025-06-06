"use client";

import { categories } from "@/utils/general/categories";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function TrainingCarousel() {
  const responsive = {
    desktopxl: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  return (
    <Carousel
      swipeable={false}
      draggable={true}
      showDots={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style "
      itemClass="py-8 px-2"
    >
      {categories.map((item, i) => {
        return (
          <div
            className="flex flex-col border items-center gap-2 dark:bg-slate-900 shadow-lg transition-shadow duration-500 overflow-hidden "
            key={i}
          >
            <div className="">
              <Image
                src={"/banners/banner2.png"}
                alt={item?.title}
                width={556}
                height={556}
                className="w-full"
              />
            </div>
            <div className="flex flex-col flex-grow gap-2 overflow-hidden text-sm transition-all duration-300 px-3 pb-3 ">
              <h2 className="text-slate-800 dark:text-slate-200 font-semibold capitalize">
                {item?.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Dolorem, placeat eos. Id aperiam dolorem necessitatibus atque ea
                culpa molestias cumque eos ex nemo cupiditate architecto, ad,
                qui voluptatibus laudantium animi!
              </p>
              <Link
                className="block px-2 py-1 text-slate-100 text-center bg-blue-700 hover:bg-blue-500 hover:text-white duration-500 transition-all"
                href={"#"}
              >
                Leer más
              </Link>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
