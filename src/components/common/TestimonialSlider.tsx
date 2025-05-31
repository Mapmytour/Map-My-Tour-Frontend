'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  image: string;
  stars: number;
  badge: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Maria Doe',
    role: 'Traveller',
    text: 'A home that perfectly blends sustainability with luxury until I discovered Ecoland Residence. From the moment I stepped into this community, I knew it was where I wanted to live. The commitment to eco-friendly living',
    image: 'assets/img/testimonial/testi_1_1.jpg',
    stars: 5,
    badge: '99',
  },
  {
    name: 'Angelina Rose',
    role: 'Traveller',
    text: 'A home that perfectly blends sustainability with luxury until I discovered Ecoland Residence. From the moment I stepped into this community, I knew it was where I wanted to live. The commitment to eco-friendly living',
    image: 'assets/img/testimonial/testi_1_1.jpg',
    stars: 5,
    badge: '99',
  },
  {
    name: 'John Smith',
    role: 'Traveller',
    text: 'A home that perfectly blends sustainability with luxury until I discovered Ecoland Residence. From the moment I stepped into this community, I knew it was where I wanted to live. The commitment to eco-friendly living',
    image: 'assets/img/testimonial/testi_1_1.jpg',
    stars: 5,
    badge: '99',
  },
  {
    name: 'John Smith',
    role: 'Traveller',
    text: 'A home that perfectly blends sustainability with luxury until I discovered Ecoland Residence. From the moment I stepped into this community, I knew it was where I wanted to live. The commitment to eco-friendly living',
    image: 'assets/img/testimonial/testi_1_1.jpg',
    stars: 5,
    badge: '99',
  },
  {
    name: 'John Smith',
    role: 'Traveller',
    text: 'A home that perfectly blends sustainability with luxury until I discovered Ecoland Residence. From the moment I stepped into this community, I knew it was where I wanted to live. The commitment to eco-friendly living',
    image: 'assets/img/testimonial/testi_1_1.jpg',
    stars: 5,
    badge: '99',
  },
  {
    name: 'John Smith',
    role: 'Traveller',
    text: 'A home that perfectly blends sustainability with luxury until I discovered Ecoland Residence. From the moment I stepped into this community, I knew it was where I wanted to live. The commitment to eco-friendly living',
    image: 'assets/img/testimonial/testi_1_1.jpg',
    stars: 5,
    badge: '99',
  },
];

const TestimonialSlider: React.FC = () => {
  return (
    <div className="w-full py-16 bg-gray-50 text-center">
      <p className="text-black font-cursive">Testimonial</p>
      <h2 className="text-2xl sm:text-3xl font-bold mb-10">What Client Say About Us</h2>

      <div className="relative px-4 sm:px-6 md:px-10 lg:px-16">
        <Swiper
          loop={true}
          centeredSlides={true}
          spaceBetween={16}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            el: '.testimonial-pagination',
            bulletClass: 'testimonial-bullet',
            bulletActiveClass: 'testimonial-bullet-active',
          }}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="testimonial-swiper py-8"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              {({ isActive }: { isActive: boolean }) => (
                <div
                  className={`relative bg-white rounded-xl p-4 sm:p-6 transition-all duration-300 mx-auto ${
                    isActive ? 'shadow-xl -translate-y-6' : 'shadow-sm translate-y-0'
                  }`}
                  style={{ maxWidth: '400px' }}
                >
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 sm:mr-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-base sm:text-lg">{item.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-500">{item.role}</p>
                    </div>
                    <div className="flex gap-1 ml-auto">
                      {Array(item.stars)
                        .fill(0)
                        .map((_, i) => (
                          <span key={i} className="text-yellow-400 text-base sm:text-lg">★</span>
                        ))}
                    </div>
                  </div>

                  <p className="text-left text-[#0D0D0C] text-sm sm:text-[18px] font-medium max-w-full sm:max-w-[636px] mb-[-0.75rem]">
                    "{item.text}"
                  </p>

                  <div
                    className={`absolute -bottom-5 ${
                      isActive
                        ? 'left-1/2 transform -translate-x-1/2 bg-black text-white'
                        : 'left-1/2 bg-white text-black border border-gray-200'
                    } w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm`}
                  >
                    {item.badge}
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-12 testimonial-pagination !static flex justify-center gap-2" />

      <style jsx global>{`
        .testimonial-bullet {
          width: 15px;
          height: 15px;
          background: white;
          border: 1px solid black;
          border-radius: 50%;
          display: inline-block;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .testimonial-bullet-active {
          background: #000;
        }

        .testimonial-swiper {
          padding-bottom: 30px;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </div>
  );
};

export default TestimonialSlider;
