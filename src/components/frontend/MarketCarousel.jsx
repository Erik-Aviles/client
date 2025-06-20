"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "react-multi-carousel";
import defaultImage from "../../../public/categories/defaultImage.png";
import "react-multi-carousel/lib/styles.css";
import HoverTooltipTitle from "./HoverTooltip";

export default function MarketCarousel({ markets }) {
  const responsive = {
    desktopxl: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 3,
      slidesToSlide: 3,
    },
    mobilesm: {
      breakpoint: { max: 464, min: 375 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 375, min: 0 },
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
      autoPlaySpeed={2000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobilesm", "mobile"]}
      dotListClass="custom-dot-list-style "
      itemClass="py-8 px-1"
    >
      {markets?.map((item, i) => {
        return (
          <div className="flex justify-center items-center " key={i}>
            <Link
              href={item?.link || "#"}
              className="bg-white flex flex-col items-center justify-end gap-2 dark:bg-slate-800 border h-[166.13px] w-[140px] md:min-w-[165px] rounded-lg shadow-lg hover:shadow-lg transition-shadow duration-500"
            >
              <Image
                src={item?.logoUrl || defaultImage}
                alt={item?.title}
                width={100}
                height={100}
                className="p-4"
              />
              <div className="basis-1/5 w-full rounded-b-lg flex items-center justify-center bg-amber-600 border border-amber-600 hover:bg-amber-500 hover:border-transparent focus:outline-none focus:ring-amber-600 ">
                <h2
                  className="text-white text-xs font-medium uppercase transition-all duration-300"
                >
                  {item?.title}
                </h2>
              </div>
            </Link>
          </div>
        );
      })}
    </Carousel>
  );
}
