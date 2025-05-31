'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const brandLogos: string[] = [
  'assets/img/brand/brand_1_1.svg',
  'assets/img/brand/brand_1_2.svg',
  'assets/img/brand/brand_1_3.svg',
  'assets/img/brand/brand_1_4.svg',
  'assets/img/brand/brand_1_5.svg',
  'assets/img/brand/brand_1_6.svg',
  'assets/img/brand/brand_1_7.svg',
  'assets/img/brand/brand_1_8.svg',
  'assets/img/brand/brand_1_4.svg',
  'assets/img/brand/brand_1_2.svg',
  'assets/img/brand/brand_1_6.svg',
];

const BrandsLogo: React.FC = () => {
  return (
    <div className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={800}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 2 },
            576: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            992: { slidesPerView: 5 },
            1200: { slidesPerView: 6 },
            1400: { slidesPerView: 7 },
          }}
        >
          {brandLogos.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="brand-box relative w-full h-56 flex justify-center items-center">
                <a
                  href="#"
                  className="relative w-56 h-36 flex justify-center items-center overflow-hidden group"
                >
                  {/* Base black logo */}
                  <img
                    src={src}
                    alt={`Brand ${index + 1}`}
                    className="absolute top-0 left-0 right-0 bottom-0 m-auto w-56 h-36 object-contain brightness-0 transition-all duration-700 ease-in-out group-hover:opacity-0"
                  />

                  {/* Hover logo from top */}
                  <img
                    src={src}
                    alt={`Brand ${index + 1} Hover`}
                    className="absolute -top-full left-0 right-0 m-auto w-56 h-36 object-contain brightness-0 opacity-0 group-hover:top-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
                  />
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BrandsLogo;