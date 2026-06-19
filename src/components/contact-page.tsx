"use client";

import Shell, { Button, Card, Meta, SectionHeading } from "@/components/shell";
import { PageTransition, Reveal } from "@/components/motion";
import { getDictionary } from "@/lib/i18n";
import { useLanguage } from "@/components/language-provider";

export function ContactPageClient() {
  const { locale } = useLanguage();
  const t = getDictionary(locale);

  return (
    <Shell>
      <PageTransition>
        <section className="container-shell pt-16 md:pt-24">
          <Reveal>
            <SectionHeading
              eyebrow={t.contact.eyebrow}
              title={t.contact.title}
              description={t.contact.description}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="p-8 md:p-10">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="font-serif text-3xl text-white">{t.contact.cardTitle}</h2>
                  <p className="mt-4 leading-8 text-muted">{t.contact.cardBody}</p>
                </div>
                <div className="space-y-5">
                  <label className="floating-field">
                    <input type="text" placeholder=" " />
                    <span>Name</span>
                  </label>
                  <label className="floating-field">
                    <input type="email" placeholder=" " />
                    <span>{t.common.email}</span>
                  </label>
                  <label className="floating-field">
                    <textarea placeholder=" " rows={5} />
                    <span>Message</span>
                  </label>
                  <Button href="mailto:hello@najtechjournal.com">{t.contact.cta}</Button>
                  <Meta>hello@najtechjournal.com</Meta>
                </div>
              </div>
            </Card>
          </Reveal>
        </section>
      </PageTransition>
    </Shell>
  );
}
