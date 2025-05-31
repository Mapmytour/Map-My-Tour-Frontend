'use client';

import { useState, useEffect, CSSProperties } from "react";


interface Category {
  title: string;
  image: string;
}

interface Slide extends Category {
  position: number;
}

const categories: Category[] = [
  { title: "Wildlife", image: '/assets/img/category/category_1_1.jpg' },
  { title: "Walking", image: '/assets/img/category/category_1_2.jpg' },
  { title: "Cruises", image: '/assets/img/category/category_1_3.jpg' },
  { title: "Hiking", image: '/assets/img/category/category_1_4.jpg' },
  { title: "Airbirds", image: '/assets/img/category/category_1_5.jpg' },
];

const CurvedCategorySlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const autoRotateDelay = 3000; // Auto rotate every 3 seconds

  // Handle responsive visible items
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(3);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(4);
      } else {
        setVisibleCount(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set up auto rotation
  useEffect(() => {
    const autoRotateTimer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, autoRotateDelay);

    return () => clearInterval(autoRotateTimer);
  }, []);

  // Get the visible slides based on active index
  const getVisibleSlides = (): Slide[] => {
    let slides: Slide[] = [];
    const middleIndex = Math.floor(visibleCount / 2);
    
    for (let i = 0; i < visibleCount; i++) {
      let index = (activeIndex - middleIndex + i + categories.length) % categories.length;
      slides.push({ ...categories[index], position: i });
    }
    
    return slides;
  };

  // Get transform style for each card
  const getCardStyle = (position: number): CSSProperties => {
    const rotationAngles = [-6, -3, 0, 3, 6];
    const middleIdx = Math.floor(visibleCount / 2);
    
    let idx = position;
    if (visibleCount < 5) {
      const ratio = position / (visibleCount - 1);
      idx = Math.round(ratio * 4);
    }
    
    const rotation = rotationAngles[idx] || 0;
    const distFromMiddle = Math.abs(position - middleIdx);
    const yOffset = distFromMiddle * 3;
    
    let origin = "center top";
    if (position < middleIdx) {
      origin = "right top";
    } else if (position > middleIdx) {
      origin = "left top";
    }
    
    return {
      transform: `translate(0px, ${yOffset}px) rotate(${rotation}deg)`,
      transformOrigin: origin,
    };
  };

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'url("https://gleeful-eclair-61ad48.netlify.app/assets/img/bg/team_bg_1.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/5 z-0" />

      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <span className="text-2xl font-serif italic">Wornderful Place For You</span>
        <h2 className="text-4xl font-bold mt-2 mb-12">Tour Categories</h2>

        <div className="relative mx-auto overflow-hidden">
          <div className="flex items-center justify-center">
            {/* Category Cards */}
            <div className="flex justify-center items-center gap-4 md:gap-6 lg:gap-8 py-16">
              {getVisibleSlides().map((item) => {
                const style = getCardStyle(item.position);
                return (
                  <div
                    key={`${item.title}-${item.position}`}
                    className="category-card transition-all duration-700 ease-in-out"
                    style={style}
                  >
                    <div className="box-img global-img rounded-3xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                      />
                    </div>
                    <h3 className="box-title text-xl font-semibold mt-4 mb-1">
                      <a href="/#" className="hover:text-blue-600 transition">{item.title}</a>
                    </h3>
                    <a
                      className="line-btn capitalize text-gray-600 text-sm underline hover:text-blue-600 transition"
                      href="/#"
                    >
                      See More
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="mt-4 flex justify-center gap-2">
          {categories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-4 h-4 rounded-full border border-black transition-colors ${
                idx === activeIndex ? "bg-black" : "bg-white"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurvedCategorySlider;
