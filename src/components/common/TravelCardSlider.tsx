'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { ArrowRight } from 'lucide-react';

interface CardData {
  id: number;
  image: string;
  date: string;
  readTime: string;
  title: string;
}

const cardData: CardData[] = [
  {
    id: 1,
    image: 'assets/img/blog/blog_1_1.jpg',
    date: 'July 07 2024',
    readTime: '8 Min Read',
    title: 'The 7 amazing destinations for adventure seekers',
  },
  {
    id: 2,
    image: 'assets/img/blog/blog_1_2.jpg',
    date: 'July 09 2024',
    readTime: '9 Min Read',
    title: '10 Reason why you should visit New Jersy',
  },
  {
    id: 3,
    image: 'assets/img/blog/blog_1_2.jpg',
    date: 'July 10 2024',
    readTime: '10 Min Read',
    title: 'The best time to visit japan & enjoy the cherry blossoms',
  },
  {
    id: 4,
    image: 'assets/img/blog/blog_1_2.jpg',
    date: 'July 11 2024',
    readTime: '7 Min Read',
    title: 'See the top most hidden gems in South America',
  },
  {
    id: 5,
    image: 'assets/img/blog/blog_1_2.jpg',
    date: 'July 12 2024',
    readTime: '8 Min Read',
    title: 'European cities that are perfect for weekend getaways',
  },
];

export default function TravelCardSlider() {
  const [swiperRef, setSwiperRef] = useState<any>(null);

  useEffect(() => {
    if (swiperRef) {
      const swiperEl = swiperRef;

      const handleMouseEnter = () => {
        swiperEl.autoplay.stop();
      };

      const handleMouseLeave = () => {
        swiperEl.autoplay.start();
      };

      swiperEl.el.addEventListener('mouseenter', handleMouseEnter);
      swiperEl.el.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        if (swiperEl && swiperEl.el) {
          swiperEl.el.removeEventListener('mouseenter', handleMouseEnter);
          swiperEl.el.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }
  }, [swiperRef]);

  return (
    <div className="w-full bg-gray-50 px-4 py-12">
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="font-cursive text-xl mb-1">About Us Restaurant</div>
            <h2 className="text-4xl font-bold">News & Articles From Map My Tour</h2>
          </div>
          <a
            href="#"
            className="travel-card-slider-button-animate relative z-10 border bg-white text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2 overflow-hidden group"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              See More Articles <ArrowRight className="ml-1" size={16} />
            </span>
          </a>
        </div>

        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={1.2}
          spaceBetween={20}
          grabCursor={true}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
          className="mySwiper"
        >
          {cardData.map((card) => (
            <SwiperSlide key={card.id}>
              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="text-gray-500 text-sm mb-2">
                    {card.date} <span className="mx-2">|</span> {card.readTime}
                  </div>
                  <h3 className="font-bold mb-4 text-lg">{card.title}</h3>
                  <a
                    href="#"
                    className="travel-card-slider-button-animate inline-flex items-center rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold relative z-10 bg-white text-black gap-2 overflow-hidden group"
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                      Read More <ArrowRight className="ml-1" size={16} />
                    </span>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
