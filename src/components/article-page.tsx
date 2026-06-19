"use client";

import Link from "next/link";
import Shell, { Card, Meta, Pill } from "@/components/shell";
import { PageTransition, Reveal } from "@/components/motion";
import { getDictionary } from "@/lib/i18n";
import { useLanguage } from "@/components/language-provider";

type ArticleData = {
  slug: string;
  title: string;
  date?: string;
  topic: string;
  content: string;
  readingTime?: string;
};

export function ArticlePageClient({ postsByLocale }: { postsByLocale: Record<"fr" | "en", ArticleData | null>; slug: string }) {
  const { locale } = useLanguage();
  const t = getDictionary(locale);
  const post = postsByLocale[locale] ?? postsByLocale.fr ?? postsByLocale.en;

  if (!post) return null;

  return (
    <Shell>
      <PageTransition>
        <article className="container-shell pt-16 md:pt-24">
          <Reveal>
            <Card className="p-6 md:p-10">
              <Link href="/blog" className="inline-flex text-sm font-medium text-primary underline underline-offset-4">
                ← {t.common.backToArticles}
              </Link>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Pill>{post.topic}</Pill>
                {post.date ? <Meta>{t.common.publishedOn}: {post.date}</Meta> : null}
                {post.readingTime ? <Meta>{t.common.readingTime}: {post.readingTime}</Meta> : null}
              </div>
              <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight text-white md:text-6xl text-balance">
                {post.title}
              </h1>
              <div className="mt-10 article-body rounded-[24px] border border-white/8 bg-black/10 p-6 md:p-8">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br/>") }} />
              </div>
            </Card>
          </Reveal>
        </article>
      </PageTransition>
    </Shell>
  );
}
