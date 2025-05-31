'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, animate, useTransform, motion } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
}

function AnimatedCounter({ target, suffix = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `${Math.floor(latest)}${suffix}`);

  useEffect(() => {
    if (inView) {
      animate(count, target, { duration: 2, ease: 'easeOut' });
    }
  }, [inView, target, count]);

  return (
    <motion.span ref={ref}>
      {rounded}
    </motion.span>
  );
}

interface StatItem {
  number: number;
  title: string;
  suffix?: string;
}

export default function StatsCircles() {
  const stats: StatItem[] = [
    { number: 12, title: 'Years Experience' },
    { number: 97, title: 'Retention Rate', suffix: '%' },
    { number: 8, title: 'Tour Completed', suffix: 'k' },
    { number: 19, title: 'Happy Travellers', suffix: 'k' },
  ];

  return (
    <div className="counter-area space py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {stats.map((stat, index) => (
            <div key={index} className="w-full sm:w-1/2 xl:w-1/4 px-4 mb-8 counter-card-wrap">
              <div
                className={`counter-card relative bg-[#0000000f] px-7 py-[93px] w-[264px] h-[264px] block mx-auto text-center rounded-full z-[2] ${
                  index % 2 === 0 ? 'mt-[158px]' : 'mt-0'
                }`}
              >
                <div className="counter-shape absolute inset-[-24px] w-[312px] h-[312px] rounded-full border border-[#000000] transition-all duration-400 ease-in-out group-hover:animate-spin">
                  <span
                    className={`absolute ${
                      index % 2 === 0 ? 'bottom-[55px] right-[15px]' : 'top-6 right-[43px]'
                    } w-6 h-6 block rounded-full bg-[#0000000f] z-[2]`}
                  ></span>
                  <div
                    className={`absolute ${
                      index % 2 === 0 ? 'bottom-[20%] right-[7%]' : 'top-[10%] right-[16%]'
                    } w-2.5 h-2.5 rounded-full bg-[#000000]`}
                  ></div>
                </div>
                <div className="media-body">
                  <h3 className="box-number font-bold text-5xl leading-[48px] uppercase text-[var(--black-color2)] mb-1.5">
                    <AnimatedCounter target={stat.number} suffix={stat.suffix || ''} />
                  </h3>
                  <h6 className="counter-title font-medium text-2xl leading-9 text-[var(--black-color2)]">
                    {stat.title}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .counter-card:hover .counter-shape {
          -webkit-animation: spin 10s linear infinite;
          animation: spin 10s linear infinite;
        }
        @media (max-width: 575px) {
          .xs\\:mt-5 {
            margin-top: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}