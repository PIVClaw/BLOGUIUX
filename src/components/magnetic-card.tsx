"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

export function MagneticCard({
  href,
  title,
  description,
  meta,
  badge,
}: {
  href: string;
  title: string;
  description: string;
  meta: string;
  badge?: string;
}) {
  const [style, setStyle] = useState<Record<string, string | number>>({});
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });

  const overlay = useMemo(
    () => ({
      background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(34,211,238,0.22), transparent 32%), radial-gradient(circle at ${glow.x + 8}% ${glow.y + 4}%, rgba(96,165,250,0.18), transparent 40%)`,
      opacity: glow.opacity,
    }),
    [glow]
  );

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 12;

    setStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`,
    });
    setGlow({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });
  };

  const reset = () => {
    setStyle({ transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)" });
    setGlow((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <Link
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="group relative block overflow-hidden rounded-[2rem] border border-white/12 bg-slate-950/70 p-6 shadow-[0_20px_60px_rgba(2,6,23,0.45)] transition duration-300 will-change-transform hover:border-cyan-300/40"
      style={style}
    >
      <div className="absolute inset-0 rounded-[2rem] border border-cyan-300/0 transition group-hover:border-cyan-300/20" />
      <div className="absolute inset-0 rounded-[2rem] opacity-0 blur-2xl transition duration-300 group-hover:opacity-100" style={overlay} />
      <div className="absolute inset-px rounded-[calc(2rem-1px)] bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.95))]" />
      <div className="relative z-10 flex h-full flex-col gap-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[0.68rem] uppercase tracking-[0.34em] text-cyan-200/70">{meta}</p>
          {badge ? (
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-cyan-200">
              {badge}
            </span>
          ) : null}
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold tracking-tight text-white transition group-hover:text-cyan-100">{title}</h3>
          <p className="leading-7 text-slate-300/92">{description}</p>
        </div>
        <div className="mt-auto flex items-center gap-2 pt-3 text-sm font-medium text-cyan-200 transition group-hover:gap-3">
          <span>Open article</span>
          <span aria-hidden>→</span>
        </div>
      </div>
    </Link>
  );
}

export function GlowPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] border border-white/12 bg-slate-950/62 shadow-[0_20px_60px_rgba(2,6,23,0.45)] ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_26%)]" />
      <div className="absolute inset-px rounded-[calc(2rem-1px)] bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.96))]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
