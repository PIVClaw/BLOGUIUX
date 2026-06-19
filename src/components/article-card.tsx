import Link from "next/link";
import { Card, Meta, Pill } from "@/components/shell";

export type ArticleCardProps = {
  href: string;
  topic: string;
  title: string;
  excerpt?: string;
  date?: string;
  readingTime?: string;
  ctaLabel: string;
};

export function ArticleCard({ href, topic, title, excerpt, date, readingTime, ctaLabel }: ArticleCardProps) {
  return (
    <Link href={href} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-[24px]">
      <Card className="interactive-card media-zoom h-full overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_70px_rgba(56,189,248,0.12)]">
        <div className="flex items-center justify-between gap-4">
          <Pill>{topic}</Pill>
          <div className="text-right">
            {date ? <Meta>{date}</Meta> : null}
            {readingTime ? <Meta>{readingTime}</Meta> : null}
          </div>
        </div>
        <div className="mt-5 overflow-hidden rounded-[20px] border border-white/8 bg-[linear-gradient(135deg,rgba(56,189,248,0.16),rgba(167,139,250,0.14))] p-6">
          <div className="card-illustration" />
        </div>
        <h3 className="mt-5 font-serif text-2xl text-white transition group-hover:text-primary">{title}</h3>
        {excerpt ? <p className="mt-3 line-clamp-3 text-[0.98rem] leading-7 text-muted">{excerpt}</p> : null}
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          {ctaLabel} <span aria-hidden>→</span>
        </div>
      </Card>
    </Link>
  );
}
