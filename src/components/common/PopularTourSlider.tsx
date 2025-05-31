'use client';

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ArrowRight } from "lucide-react";

interface TourData {
  title: string;
  rating: string;
  price: string;
  duration: string;
  image: string;
}

const tourData: TourData[] = [
  {
    title: "Dubai Tour Package",
    rating: "4.8",
    price: "980.00",
    duration: "7 Days",
    image: "assets/img/tour/tour_box_1.jpg",
  },
  {
    title: "Switzerland",
    rating: "4.8",
    price: "980.00",
    duration: "7 Days",
    image: "assets/img/tour/tour_box_1.jpg",
  },
  {
    title: "Greece Tour Package",
    rating: "4.8",
    price: "980.00",
    duration: "7 Days",
    image: "assets/img/tour/tour_box_1.jpg",
  },
  {
    title: "Italy Tour Package",
    rating: "4.8",
    price: "980.00",
    duration: "7 Days",
    image: "assets/img/tour/tour_box_1.jpg",
  },
  {
    title: "Italy Tour Package",
    rating: "4.8",
    price: "980.00",
    duration: "7 Days",
    image: "assets/img/tour/tour_box_1.jpg",
  },
];

const PopularTourSlider: React.FC = () => {
  return (
    <section className="py-12 px-4 text-center">
      <div className="mb-8">
        <h2 className="text-2xl font-cursive">Best Place For You</h2>
        <h1 className="text-4xl font-bold mt-2 mb-8">Most Popular Tour</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
          1280: { slidesPerView: 4 },
        }}
      >
        {tourData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
              <div className="overflow-hidden h-60">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform transition-transform duration-600 hover:scale-125"
                />
              </div>
              <div className="p-4 text-left">
                <h4 className="text-lg font-semibold">{item.title}</h4>
                <p className="text-yellow-500 text-sm mb-1">
                  ★★★★★ ({item.rating} Rating)
                </p>
                <p className="text-xl font-bold text-gray-800 mb-2">
                  ${item.price}{" "}
                  <span className="text-sm font-normal">/Person</span>
                </p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>🕒 {item.duration}</span>
                  <a
                    href="#"
                    className="travel-card-slider-button-animate inline-flex items-center rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold relative z-10 bg-white text-black gap-2 overflow-hidden group transition-colors duration-300 hover:text-white"
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                      Read More <ArrowRight size={16} />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PopularTourSlider;
