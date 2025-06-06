"use client";
import Image from "next/image";
import { Carousel } from "nuka-carousel";
import { useRouter } from "next/navigation";

export default function HeroCarousel() {
  const router = useRouter();

  const slides = [
    {
      id: 1,
      imageUrl: "/banners/banner1.png",
      title: "Banner 1",
      link: "/dashboard/categories",
    },
    {
      id: 2,
      imageUrl: "/banners/banner2.png",
      title: "Productos",
      link: "/dashboard/products",
    },
    {
      id: 3,
      imageUrl: "/banners/banner3.png",
      title: "Proveedores",
      link: "/dashboard/suppliers",
    },
  ];

  return (
    <Carousel
      className="rounded-md overflow-hidden lg:h-[360px]  "
      autoplay
      wrapAround
      showArrows="hover"
    >
      {slides.map((slide, index) => (
        <Image
          key={slide.id}
          src={slide.imageUrl}
          alt={slide.title}
          width={2466}
          height={1544}
          className="w-full h-auto cursor-pointer rounded-md"
          onClick={() => router.push(slide.link)}
          priority={index === 0}
        />
      ))}
    </Carousel>
  );
}
