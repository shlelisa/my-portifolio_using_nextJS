"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

export default function ProjectCarousel({ images }: { images: string[] }) {
  return (
    <Swiper
      spaceBetween={20}
      centeredSlides={true}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      modules={[Autoplay, Pagination, Navigation]}
      className="rounded-2xl shadow-lg"
    >
      {images.map((url, idx) => (
        <SwiperSlide key={idx}>
          <Image
            src={url || "/assets/default-project-image.jpg"}
            alt={`Project image ${idx + 1} `}
            className="w-full h-[400px] object-cover rounded-2xl"
            width={500}
            height={300}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
