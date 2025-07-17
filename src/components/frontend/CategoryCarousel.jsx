"use client";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";

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
      swipeable={true}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={1000}
      containerClass="carousel-container z-10"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      // deviceType={true}
      dotListClass="custom-dot-list-style"
      itemClass="py-8 px-1 !min-w-[210px]"
    >
      {products?.map((item, i) => {
        return <Product key={item.id + i} item={item} />;
      })}
    </Carousel>
  );
}
