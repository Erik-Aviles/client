"use client";

import Image from "next/image";
import { Carousel } from "nuka-carousel";
import { useRouter } from "next/navigation";
import defaultImage from "../../../public/banners/defaultImage.png";

export default function HeroCarousel({ slides = [] }) {
  const router = useRouter();

  return (
    <Carousel
      autoplay
      wrapAround
      showArrows="hover"
      showDots
      wrapMode="wrap"
      title="Carousel"
      className="rounded-md overflow-hidden"
    >
      {slides?.map((slide, index) => {
        return (
          <Image
            key={slide?.id}
            src={slide?.imageUrl || defaultImage}
            alt={slide?.title}
            width={2466}
            height={1544}
            className="w-full h-auto cursor-pointer rounded-md"
            onClick={() => router.push(slide?.link)}
            priority={index === 0}
          />
        );
      })}
    </Carousel>
  );
}
