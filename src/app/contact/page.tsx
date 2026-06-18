import Shell, { Button, Card, SectionHeading } from "@/components/shell";

export default function ContactPage() {
  return (
    <Shell>
      <section className="container-shell pt-16 md:pt-24">
        <SectionHeading
          eyebrow="Contact"
          title="Discutons produit, design et contenu tech"
          description="Une page de contact plus utile avec une promesse plus claire et un CTA mieux présenté."
        />
        <Card className="p-8 md:p-10">
          <p className="max-w-2xl text-lg leading-8 text-muted">
            Si tu veux discuter d’une refonte, d’un blog premium, d’un projet web ou d’une direction UI/UX plus stratégique,
            tu peux me contacter directement.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="mailto:hello@example.com">hello@example.com</Button>
            <Button href="/blog" variant="secondary">Voir les articles</Button>
          </div>
        </Card>
      </section>
    </Shell>
  );
}
