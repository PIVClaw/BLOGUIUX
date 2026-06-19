"use client";

import Shell, { Card, SectionHeading } from "@/components/shell";
import { PageTransition, Reveal } from "@/components/motion";
import { getDictionary } from "@/lib/i18n";
import { useLanguage } from "@/components/language-provider";

export function AboutPageClient() {
  const { locale } = useLanguage();
  const t = getDictionary(locale);

  return (
    <Shell>
      <PageTransition>
        <section className="container-shell pt-16 md:pt-24">
          <Reveal>
            <SectionHeading
              eyebrow={t.about.eyebrow}
              title={t.about.title}
              description={t.about.description}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="p-8 md:p-10">
              <div className="grid gap-8 md:grid-cols-2">
                <p className="leading-8 text-muted">{t.about.body1}</p>
                <p className="leading-8 text-muted">{t.about.body2}</p>
              </div>
            </Card>
          </Reveal>
        </section>
      </PageTransition>
    </Shell>
  );
}
