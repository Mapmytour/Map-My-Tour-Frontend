'use client';


import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const slides: Slide[] = [
    {
      id: 1,
      image: '/assets/img/hero/hero_bg_1_1.jpg',
      title: "Let's make your best trip with us",
      subtitle: "Get unforgettable pleasure with us",
    },
    {
      id: 2,
      image: '/assets/img/hero/hero_bg_1_2.jpg',
      title: "Discover paradise destinations",
      subtitle: "Explore breathtaking locations",
    },
    {
      id: 3,
      image: '/assets/img/hero/hero_bg_1_3.jpg',
      title: "Experience local culture",
      subtitle: "Authentic adventures await",
    }
  ];

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Vertical Swiper */}
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        modules={[Navigation, Autoplay]}
        className="h-full w-full"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={handleSlideChange}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />
              
              {/* Content - Centered with proper spacing */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-16 text-white">
                <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto md:mx-0">
                  <p className="mb-2 md:mb-4 font-cursive text-xl sm:text-2xl md:text-3xl">
                    {slide.subtitle}
                  </p>
                  <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                    {slide.title}
                  </h1>
                  <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button className="flex items-center justify-center rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:bg-opacity-90">
                      Explore Tours
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </button>
                    <button className="flex items-center justify-center rounded-full border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black">
                      Our Services
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Vertical Pagination - Right Side */}
      <div className="absolute right-4 sm:right-6 md:right-8 top-1/2 z-10 -translate-y-1/2 transform hidden lg:block">
        <div className="flex flex-col items-center space-y-4 md:space-y-6">
          {slides.map((_, index) => (
            <div 
              key={index}
              className={`h-6 md:h-8 w-1 rounded-full ${
                index === activeIndex ? "bg-white" : "bg-white/40"
              } cursor-pointer transition-all duration-300`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-32 right-4 z-10 cursor-pointer hidden lg:block">
        <button 
          className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg bg-[rgba(250, 252, 244, 0.2)]"
          onClick={() => console.log('Scroll down')}
        >
          <svg className="h-8 w-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>
      </div>

      {/* Scroll Top Button */}
      <div className="absolute top-32 right-4 z-10 hidden lg:block">
        <button 
          className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg bg-[rgba(250, 252, 244, 0.2)]"
          onClick={() => console.log('Scroll to top')}
        >
          <svg className="h-6 w-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}