"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import defaultImage from "../../../public/banners/defaultImage.png";
import HoverTooltip from "./HoverTooltip";

export default function TrainingCarousel({ training }) {
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

  const loremIp =
    "Lorem defauld ipsum dolor sit amet consectetur adipisicing elit. Similique recusandae eius natus impedit, numquam tenetur minima deleniti ad tempore temporibus, iste beatae, voluptatibus ipsum laudantium unde totam consequatur laboriosam dolorem.";

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={4000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="py-8 px-2"
    >
      {training.map((item, i) => (
        <article
          key={i}
          className="bg-white dark:bg-slate-900 shadow transition-transform duration-300 hover:shadow-xl"
        >
          <div className="w-full aspect-video relative">
            <Image
              src={item?.imageUrl || defaultImage}
              alt={item?.title || "Imagen de la capacitación"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
          <div className="p-4 flex flex-col gap-2">
            <div className="relative group capitalize">
              <h2
                className={`font-bold transition-all duration-300  dark:text-slate-200 text-lg text-slate-800 line-clamp-1 capitalize `}
              >
                {item?.title}
              </h2>
              <HoverTooltip title={item?.title} />
            </div>
            <div className="relative group capitalize">
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-4">
                {item?.description || loremIp}
              </p>
              <HoverTooltip title={item?.description} className="-top-2"/>
            </div>
            <Link
              href="#"
              className="mt-2 inline-block text-center bg-blue-700 hover:bg-blue-500 text-white px-3 py-1 transition"
            >
              Leer más
            </Link>
          </div>
        </article>
      ))}
    </Carousel>
  );
}
