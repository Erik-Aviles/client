"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "react-multi-carousel";
import defaultImage from "../../../public/products/defaultImage.png";
import "react-multi-carousel/lib/styles.css";
import AddRemoveCart from "./AddRemoveCart";
import HoverTooltip from "./HoverTooltip";

export default function CategoryCarousel({ products }) {
  const responsive = {
    desktopxl: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
      slidesToSlide: 2,
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
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={true}
      dotListClass="custom-dot-list-style"
      itemClass="py-8 px-1 !min-w-[210px]"
    >
      {products.map((item, i) => {
        return (
          <article
            className="flex flex-col bg-white h-full dark:bg-slate-700 rounded-lg shadow transition-transform duration-300 hover:shadow-xl overflow-hidden"
            key={i + item?.id}
          >
            <Link
              href={`/products/${item?.slug}`}
              className="w-full aspect-video relative bg-white overflow-hidden"
            >
              <Image
                src={item?.imageUrl || defaultImage}
                alt={item?.title}
                fill
                className="object-contain transition-all duration-300 hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority
              />
            </Link>
            <div className="py-2 px-4 dark:border flex flex-col gap-1.5 flex-1">
              <div className="dark:text-white text-sm font-semibold">
                ${item?.price}
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

              <div className="mt-auto pt-2">
                <AddRemoveCart />
              </div>
            </div>
          </article>
        );
      })}
    </Carousel>
  );
}
