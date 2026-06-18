import Shell, { Card, SectionHeading } from "@/components/shell";

export default function AboutPage() {
  return (
    <Shell>
      <section className="container-shell pt-16 md:pt-24">
        <SectionHeading
          eyebrow="À propos de la V2"
          title="Pourquoi cette refonte est meilleure"
          description="Cette version applique une logique plus produit : clarté, crédibilité, conversion douce et confort de lecture."
        />
        <Card className="p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-2">
            <p className="leading-8 text-muted">
              La V1 avait déjà une bonne intention visuelle, mais manquait d’un cadre UX vraiment solide.
              La V2 introduit une meilleure hiérarchie, un design system plus stable, des sections plus lisibles,
              et des interactions plus rassurantes pour l’utilisateur.
            </p>
            <p className="leading-8 text-muted">
              L’objectif n’est pas juste de “faire beau”, mais de mieux guider l’attention : identifier les articles,
              comprendre la proposition éditoriale, et déclencher l’action de lecture plus naturellement.
            </p>
          </div>
        </Card>
      </section>
    </Shell>
  );
}
