'use client';

import React, { useState, useEffect } from 'react';
import { ZoomIn } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const images = [
  "/assets/img/gallery/gallery_1_1.jpg",
  "/assets/img/gallery/gallery_1_2.jpg",
  "/assets/img/gallery/gallery_1_3.jpg",
  "/assets/img/gallery/gallery_1_4.jpg",
  "/assets/img/gallery/gallery_1_5.jpg",
  "/assets/img/gallery/gallery_1_6.jpg",
  "/assets/img/gallery/gallery_1_7.jpg",
];

interface GalleryImageProps {
  img: string;
  index: number;
  onClick: (index: number) => void;
  tall?: boolean;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ img, index, onClick, tall = false }) => (
  <div
    className={`
      relative rounded-xl overflow-hidden cursor-pointer group 
      w-[140px] sm:w-[160px] md:w-[200px] 
      ${tall ? 'h-[320px] sm:h-[360px] md:h-[420px]' : 'h-[140px] sm:h-[160px] md:h-[200px]'}
    `}
    onClick={() => onClick(index)}
  >
    <img
      src={img}
      alt={`Gallery ${index}`}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
      <button aria-label="Zoom Image" className="p-2 rounded-full bg-black/50 hover:bg-black/70">
        <ZoomIn size={32} className="text-white drop-shadow-md" />
      </button>
    </div>
  </div>
);

const RecentGallery: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [swiperKey, setSwiperKey] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => setSwiperKey((prev) => prev + 1), 50);
    }
  }, [open]);

  // Define columns properly: each item is [imageIndex, tall?]
  const columns: Array<Array<[number, boolean?]>> = [
    [[0]],
    [[1], [2]],
    [[3, true]],
    [[4], [5]],
    [[6]],
  ];

  return (
    <div className="text-center my-10 px-4">
      <h2 className="text-xl md:text-2xl font-cursive">Make Your Tour More Pleasure</h2>
      <h1 className="text-2xl md:text-4xl font-bold mt-2 mb-8">Recent Gallery</h1>

      {/* Responsive layout */}
      <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-4 items-center w-full sm:w-auto">
            {col.map(([imgIndex, tall]) => (
              <GalleryImage
                key={imgIndex}
                img={images[imgIndex]}
                index={imgIndex}
                onClick={handleImageClick}
                tall={tall}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Modal dialog using Tailwind */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              aria-label="Close Gallery"
            >
              ✕
            </button>

            <Swiper
              key={swiperKey}
              onSwiper={(swiper) => {
                swiper.slideTo(selectedIndex, 0);
              }}
              navigation
              modules={[Navigation]}
              className="mySwiper"
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={`Slide ${idx}`}
                    className="w-full max-h-[80vh] object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentGallery;
