"use client";

import Shell, { Meta, Pill, SectionHeading } from "@/components/shell";
import { ArticleCard } from "@/components/article-card";
import { PageTransition, Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { getDictionary } from "@/lib/i18n";
import { useLanguage } from "@/components/language-provider";

type BlogPost = { slug: string; title: string; date?: string; topic: string; excerpt?: string; readingTime?: string };

export function BlogPageClient({ postsByLocale, topic }: { postsByLocale: Record<"fr" | "en", BlogPost[]>; topic?: string }) {
  const { locale } = useLanguage();
  const t = getDictionary(locale);
  const posts = postsByLocale[locale] ?? [];
  const filtered = topic ? posts.filter((post) => post.topic === topic) : posts;

  return (
    <Shell>
      <PageTransition>
        <section className="container-shell pt-16 md:pt-24">
          <Reveal>
            <SectionHeading eyebrow={t.blog.eyebrow} title={t.blog.title} description={t.blog.description} />
          </Reveal>
          {topic ? (
            <Reveal className="mb-8">
              <div><Pill>{t.common.activeFilter}: {topic}</Pill></div>
            </Reveal>
          ) : null}
          {filtered.length === 0 ? (
            <Meta>{t.common.noArticles}</Meta>
          ) : (
            <StaggerGroup className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((post) => (
                <StaggerItem key={`${locale}-${post.slug}`}>
                  <ArticleCard
                    href={`/blog/${post.slug}`}
                    topic={post.topic}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    readingTime={post.readingTime}
                    ctaLabel={t.blog.readMore}
                  />
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </section>
      </PageTransition>
    </Shell>
  );
}
