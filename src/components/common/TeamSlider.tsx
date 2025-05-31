'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  img: string;
}

export const teamData: TeamMember[] = [
  { name: 'Guy Hawkins', role: 'Tourist Guide', img: 'https://gleeful-eclair-61ad48.netlify.app/assets/img/team/team_1_2.jpg' },
  { name: 'Jenny Wilson', role: 'Tourist Guide', img: 'https://gleeful-eclair-61ad48.netlify.app/assets/img/team/team_1_2.jpg' },
  { name: 'Jacob Jones', role: 'Tourist Guide', img: 'https://gleeful-eclair-61ad48.netlify.app/assets/img/team/team_1_2.jpg' },
  { name: 'Jane Cooper', role: 'Tourist Guide', img: 'https://gleeful-eclair-61ad48.netlify.app/assets/img/team/team_1_2.jpg' },
  { name: 'Devon Lane', role: 'Tourist Guide', img: 'https://gleeful-eclair-61ad48.netlify.app/assets/img/team/team_1_2.jpg' },
];

const socialIcons = [Facebook, Twitter, Instagram, Linkedin];

const TeamSlider: React.FC = () => {
  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'url("https://gleeful-eclair-61ad48.netlify.app/assets/img/bg/team_bg_1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Black transparent overlay */}
      <div className="absolute inset-0 bg-black/5 z-0" />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-16">
        <div className="text-center mb-12">
          <p className="text-lg mt-2 text-black font-cursive">Meet with Guide</p>
          <h2 className="text-4xl font-bold text-black">Tour Guide</h2>
        </div>

        <Swiper
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            el: '.team-pagination',
            bulletClass: 'team-bullet',
            bulletActiveClass: 'team-bullet-active',
          }}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1280: { slidesPerView: 4, spaceBetween: 40 },
          }}
          className="team-swiper"
        >
          {teamData.map((member, i) => (
            <SwiperSlide key={i}>
              <div className="relative text-center overflow-hidden z-20 transition-all duration-400 group">
                {/* Image Box */}
                <div className="w-[calc(100%-56px*2)] mx-auto border-4 border-white rounded-full overflow-hidden relative z-30">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full rounded-full transition-transform duration-[1300ms] group-hover:scale-110"
                  />
                </div>

                {/* Content Box */}
                <div className="relative pt-[130px] px-4 pb-4 -mt-[100px] bg-white rounded-2xl z-10">
                  <div className="relative bg-black/5 rounded-2xl p-6 overflow-hidden z-10 transition-all duration-400 group-hover:text-white">
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 h-0 bg-black transition-all duration-500 z-0 group-hover:h-full" />

                    {/* Name & Role */}
                    <h4 className="text-xl font-semibold relative z-10 group-hover:text-white">
                      <a href="#" className="text-inherit">{member.name}</a>
                    </h4>
                    <p className="text-gray-600 mb-3 relative z-10 group-hover:text-white">{member.role}</p>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-3 relative z-10">
                      {socialIcons.map((IconComponent, index) => (
                        <a
                          key={index}
                          href="#"
                          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-black group-hover:text-white group-hover:border-white transition duration-300"
                          aria-label="Social Link"
                        >
                          <IconComponent size={16} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-12 team-pagination flex justify-center gap-2" />

        {/* Pagination styles */}
        <style jsx global>{`
          .team-bullet {
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
          .team-bullet-active {
            background: #000;
          }
          .team-swiper {
            padding-bottom: 30px;
            margin-left: auto;
            margin-right: auto;
          }
        `}</style>
      </div>
    </div>
  );
};

export default TeamSlider;
