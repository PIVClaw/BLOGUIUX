"use client";

import Shell, { Button, Card, Meta, Pill, SectionHeading } from "@/components/shell";
import { ArticleCard } from "@/components/article-card";
import { PageTransition, ParallaxHero, Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { getDictionary } from "@/lib/i18n";
import { useLanguage } from "@/components/language-provider";

type HomePost = { slug: string; title: string; date?: string; topic: string; excerpt?: string; cover?: string; readingTime?: string };

export function HomePageClient({ postsByLocale }: { postsByLocale: Record<"fr" | "en", HomePost[]> }) {
  const { locale } = useLanguage();
  const t = getDictionary(locale);
  const posts = postsByLocale[locale] ?? [];
  const featured = posts[0];
  const latest = posts.slice(0, 6);

  return (
    <Shell>
      <PageTransition>
        <section className="container-shell pt-16 md:pt-24">
          <ParallaxHero>
            <Card className="hero-panel overflow-hidden rounded-[32px] p-8 md:p-14">
              <div className="grid items-center gap-12 md:grid-cols-[1.35fr_0.9fr]">
                <Reveal>
                  <div>
                    <Pill>{t.hero.eyebrow}</Pill>
                    <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-white md:text-7xl text-balance">
                      {t.hero.title}
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{t.hero.subtitle}</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button href="/blog">{t.hero.ctaPrimary}</Button>
                      <Button href="/about" variant="secondary">{t.hero.ctaSecondary}</Button>
                    </div>
                  </div>
                </Reveal>

                <StaggerGroup className="grid gap-4">
                  {t.home.pillars.map((item) => (
                    <StaggerItem key={item.title}>
                      <Card className="interactive-card p-5">
                        <h2 className="font-serif text-2xl text-white">{item.title}</h2>
                        <p className="mt-2 leading-7 text-muted">{item.desc}</p>
                      </Card>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            </Card>
          </ParallaxHero>
        </section>

        {featured ? (
          <section className="container-shell pt-20">
            <Reveal>
              <SectionHeading
                eyebrow={t.home.featuredEyebrow}
                title={t.home.featuredTitle}
                description={t.home.featuredDescription}
              />
            </Reveal>
            <div className="featured-grid grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
              <Reveal>
                <Card className="featured-card p-8 md:p-10">
                  <div className="media-zoom rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.24),transparent_55%),linear-gradient(180deg,rgba(16,30,49,0.75),rgba(8,15,28,0.95))] p-6 md:p-8">
                    <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" />
                    <Pill>{featured.topic}</Pill>
                    <h2 className="mt-5 font-serif text-4xl text-white">{featured.title}</h2>
                    {featured.excerpt ? <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{featured.excerpt}</p> : null}
                    <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
                      {featured.date ? <Meta>{featured.date}</Meta> : null}
                      {featured.readingTime ? <Meta>{featured.readingTime}</Meta> : null}
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button href={`/blog/${featured.slug}`}>{t.common.readArticle}</Button>
                      <Button href="/blog" variant="secondary">{t.common.viewAllArticles}</Button>
                    </div>
                  </div>
                </Card>
              </Reveal>
              <Reveal delay={0.1}>
                <Card className="p-6">
                  <Meta>{t.home.metrics.eyebrow}</Meta>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
                    {t.home.metrics.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </div>
          </section>
        ) : null}

        <section className="container-shell pt-20">
          <Reveal>
            <SectionHeading
              eyebrow={t.home.latestEyebrow}
              title={t.home.latestTitle}
              description={t.home.latestDescription}
            />
          </Reveal>
          <StaggerGroup className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {latest.map((post) => (
              <StaggerItem key={`${locale}-${post.slug}`}>
                <ArticleCard
                  href={`/blog/${post.slug}`}
                  topic={post.topic}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readingTime={post.readingTime}
                  ctaLabel={t.common.readArticle}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>

        <section className="container-shell pt-20">
          <Reveal>
            <SectionHeading
              eyebrow={t.home.improvementsEyebrow}
              title={t.home.improvementsTitle}
            />
          </Reveal>
          <StaggerGroup className="grid gap-5 md:grid-cols-2">
            {t.home.improvements.map((item) => (
              <StaggerItem key={item.title}>
                <Card className="interactive-card p-6 md:p-7">
                  <h3 className="font-serif text-2xl text-white">{item.title}</h3>
                  <p className="mt-3 leading-8 text-muted">{item.desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      </PageTransition>
    </Shell>
  );
}
