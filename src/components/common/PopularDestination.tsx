'use client';

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

interface Destination {
  title: string;
  listings: number;
  image: string;
}

const destinations: Destination[] = [
  {
    title: "Maldives",
    listings: 15,
    image: "assets/img/destination/destination_1_1.jpg",
  },
  {
    title: "Thailand",
    listings: 22,
    image: "assets/img/destination/destination_1_2.jpg",
  },
  {
    title: "Belgium",
    listings: 25,
    image: "assets/img/destination/destination_1_3.jpg",
  },
  {
    title: "Island",
    listings: 28,
    image: "assets/img/destination/destination_1_4.jpg",
  },
  {
    title: "Maldives",
    listings: 30,
    image: "assets/img/destination/destination_1_5.jpg",
  },
];

const DestinationSlider: React.FC = () => {
  return (
    <div className="relative overflow-hidden py-10 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-cursive">Top Destination</h2>
          <h1 className="text-4xl font-bold mt-2 mb-8">Popular Destination</h1>
        </div>
        <Swiper
          id="aboutSlider1"
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 95,
            depth: 212,
            modifier: 1,
          }}
          autoplay={{ delay: 2500 }}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 3 },
          }}
          className="destination-slider"
        >
          {destinations.map((item, idx) => (
            <SwiperSlide
              key={idx}
              className="relative rounded-3xl overflow-hidden max-w-[430px] transition-all duration-300 ease-in-out"
            >
              {({ isActive }: { isActive: boolean }) => (
                <div
                  className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${
                    isActive ? "filter-none" : "blur-sm"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[600px] object-cover rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 rounded-3xl"></div>
                    <div
                      className={`absolute bottom-10 left-0 right-0 flex justify-around items-center max-w-[423px] mx-auto transition-all duration-500 ${
                        isActive
                          ? "opacity-100 scale-100 visible"
                          : "opacity-0 scale-0 invisible"
                      }`}
                    >
                      <div className="text-white">
                        <h4 className="text-xl font-semibold">{item.title}</h4>
                        <span className="text-sm">{item.listings} Listing</span>
                      </div>
                      <a
                        href="destination-details.html"
                        className="pupularDestinationButton relative z-10 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors duration-300 hover:text-black border border-white"
                      >
                        <span className="relative z-10">View All</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DestinationSlider;
