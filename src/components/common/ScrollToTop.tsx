"use client";

import React, { useEffect, useState, FC } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop: number = window.scrollY;
      const docHeight: number = document.documentElement.scrollHeight - window.innerHeight;
      const progress: number = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollProgress(progress);
      setVisible(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 cursor-pointer"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      role="button"
    >
      <div
        className="relative w-14 h-14 rounded-full p-1"
        style={{
          background: `conic-gradient(var(--primary-color) ${scrollProgress}%, var(--smoke-color2) ${scrollProgress}%)`,
        }}
      >
        <div
          className="flex items-center justify-center w-full h-full rounded-full"
          style={{
            background: "var(--white-color)",
            border: "1px solid var(--th-border-color)",
          }}
        >
          <ArrowUp className="w-6 h-6 text-[var(--primary-color)]" />
        </div>
      </div>
    </div>
  );
};

export default ScrollToTop;
