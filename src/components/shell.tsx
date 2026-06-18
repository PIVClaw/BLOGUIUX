"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const nav = [
  { label: "Accueil", href: "/" },
  { label: "Articles", href: "/blog" },
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 shadow-[0_8px_30px_rgba(56,189,248,0.18)]">
        <span className="text-lg font-semibold text-primary">N</span>
      </div>
      <div>
        <p className="text-[0.68rem] uppercase tracking-[0.32em] text-primary/80">BLOGUIUX</p>
        <p className="font-serif text-lg text-white">Naj Tech Journal</p>
      </div>
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-primary">
      {children}
    </span>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const styles =
    variant === "primary"
      ? "bg-primary text-slate-950 hover:bg-primary-strong"
      : "border border-white/14 bg-white/4 text-white hover:border-primary/35 hover:text-primary";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${styles}`}
    >
      {children}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <Pill>{eyebrow}</Pill>
      <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white text-balance">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-muted">{description}</p> : null}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass-card rounded-[24px] ${className}`}>{children}</div>;
}

export function Meta({ children }: { children: ReactNode }) {
  return <p className="text-sm text-muted">{children}</p>;
}

function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-slate-950/55 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label="Retour à l'accueil">
          <Logo />
        </Link>
        <nav aria-label="Navigation principale" className="hidden items-center gap-2 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active ? "bg-white/8 text-white" : "text-muted hover:bg-white/6 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-white/8">
      <div className="container-shell flex flex-col gap-4 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} BLOGUIUX — V2 UI/UX Pro Max</p>
        <div className="flex items-center gap-3">
          <span>Next.js 15</span>
          <span className="text-white/20">•</span>
          <span>Accessibilité</span>
          <span className="text-white/20">•</span>
          <span>Design system</span>
        </div>
      </div>
    </footer>
  );
}

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen text-white">
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
