"use client";

import { useEffect, useState } from "react";

export function MouseGlow() {
  const [position, setPosition] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const updatePosition = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", updatePosition, { passive: true });
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/18 blur-3xl transition-transform duration-200 ease-out"
        style={{ left: `${position.x}%`, top: `${position.y}%` }}
      />
      <div
        className="absolute h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/12 blur-3xl transition-transform duration-300 ease-out"
        style={{ left: `${position.x * 0.9}%`, top: `${position.y * 0.92}%` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_24%)]" />
      <div className="grid-overlay absolute inset-0 opacity-50" />
    </div>
  );
}
