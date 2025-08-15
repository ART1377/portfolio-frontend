"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import { useLang } from "@/app/context/langContext";

interface InfiniteSkillQueueProps {
  skills: string[];
  speed?: number;
}

export function InfiniteSkillQueue({
  skills,
  speed = 3000,
}: InfiniteSkillQueueProps) {
  const { dir } = useLang();

  if (!skills.length) return null;

  return (
    <div className="relative w-full py-12 bg-primary border-y border-border/50 overflow-hidden">
      <Swiper
        key={dir}
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={speed}
        slidesPerView="auto"
        allowTouchMove={false}
        dir={dir}
        className="!flex items-center"
      >
        {[...skills, ...skills].map((skill, index) => (
          <SwiperSlide
            key={index}
            className="!w-auto px-8 flex items-center justify-center"
          >
            <span
              style={{
                WebkitTextStroke: "1px #1A1A1A",
                color: "transparent",
              }}
              className="text-4xl md:text-6xl uppercase tracking-[0.3em] font-black"
            >
              ✱{skill}✱
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
