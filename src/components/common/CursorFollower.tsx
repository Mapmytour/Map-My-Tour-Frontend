'use client';

import { useEffect, useState } from "react";

interface Position {
  x: number;
  y: number;
}

const CursorFollower = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-3 h-3 bg-black rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out"
      style={{
        transform: `translate(${position.x - 6}px, ${position.y - 6}px)`,
      }}
    />
  );
};

export default CursorFollower;