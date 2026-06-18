import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Shell, { Button, Card, Meta, Pill, SectionHeading } from "@/components/shell";
import { ArticleCard } from "@/components/article-card";

type Post = { slug: string; title: string; date?: string; topic: string; excerpt?: string; tags?: string[] };
const POSTS_DIR = path.join(process.cwd(), "content/posts");

function loadPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs.readdirSync(POSTS_DIR, { withFileTypes: true }).flatMap((entry) => {
    if (!entry.isDirectory()) return [];
    const localeDir = path.join(POSTS_DIR, entry.name);
    return fs.readdirSync(localeDir)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => {
        const src = fs.readFileSync(path.join(localeDir, file), "utf-8");
        const { data } = matter(src);
        return {
          slug: file.replace(/\.mdx$/, ""),
          title: data.title ?? file,
          date: data.date,
          topic: data.topic ?? "thoughts",
          excerpt: data.excerpt ?? data.description,
          tags: Array.isArray(data.tags) ? data.tags : [],
        };
      });
  }).sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

const pillars = [
  { title: "Architecture claire", desc: "Une hiérarchie visuelle plus nette, sections mieux découpées et meilleur rythme de lecture." },
  { title: "Accessibilité renforcée", desc: "Contrastes, focus states, tailles de texte et interactions plus robustes." },
  { title: "Design system cohérent", desc: "Composants réutilisables, tokens visuels et style premium homogène." },
];

export default function HomePage() {
  const posts = loadPosts();
  const featured = posts[0];
  const latest = posts.slice(0, 6);

  return (
    <Shell>
      <section className="container-shell pt-16 md:pt-24">
        <Card className="overflow-hidden rounded-[32px] p-8 md:p-14">
          <div className="grid items-center gap-12 md:grid-cols-[1.35fr_0.9fr]">
            <div>
              <Pill>UI-UX Pro Max V2</Pill>
              <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-white md:text-7xl text-balance">
                Un blog plus premium, plus lisible, plus crédible.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
                Cette V2 transforme BlogUi en une expérience éditoriale plus forte : meilleure structure,
                cartes plus convaincantes, CTA mieux placés et lecture plus confortable.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/blog">Explorer les articles</Button>
                <Button href="/about" variant="secondary">Voir l’approche UX</Button>
              </div>
            </div>

            <div className="grid gap-4">
              {pillars.map((item) => (
                <Card key={item.title} className="p-5">
                  <h2 className="font-serif text-2xl text-white">{item.title}</h2>
                  <p className="mt-2 leading-7 text-muted">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </section>

      {featured ? (
        <section className="container-shell pt-20">
          <SectionHeading
            eyebrow="Article mis en avant"
            title="Le contenu prioritaire gagne enfin la place qu’il mérite"
            description="Avant, l’article featured restait assez discret. Ici, il devient un bloc éditorial fort avec contexte, tags et CTA explicite."
          />
          <Card className="grid gap-8 p-8 md:grid-cols-[1.15fr_0.85fr] md:p-10">
            <div>
              <Pill>{featured.topic}</Pill>
              <h2 className="mt-5 font-serif text-4xl text-white">{featured.title}</h2>
              {featured.excerpt ? <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{featured.excerpt}</p> : null}
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={`/blog/${featured.slug}`}>Lire l’article</Button>
                <Button href="/blog" variant="secondary">Tous les articles</Button>
              </div>
            </div>
            <div className="rounded-[28px] border border-primary/15 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.18),transparent_45%),linear-gradient(180deg,rgba(15,23,42,0.78),rgba(8,15,28,0.96))] p-6">
              <Meta>Pourquoi cette section fonctionne mieux</Meta>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
                <li>• hiérarchie plus forte avec un vrai point d’entrée visuel</li>
                <li>• CTA primaire et secondaire mieux répartis</li>
                <li>• meilleure respiration grâce à l’espacement</li>
                <li>• design plus mémorable sans sacrifier la lisibilité</li>
              </ul>
            </div>
          </Card>
        </section>
      ) : null}

      <section className="container-shell pt-20">
        <SectionHeading
          eyebrow="Derniers contenus"
          title="Une grille d’articles plus nette et plus engageante"
          description="Les cartes sont plus lisibles, plus accessibles et orientées lecture."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {latest.map((post) => (
            <ArticleCard
              key={post.slug}
              href={`/blog/${post.slug}`}
              topic={post.topic}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
            />
          ))}
        </div>
      </section>

      <section className="container-shell pt-20">
        <SectionHeading
          eyebrow="Axes d’amélioration"
          title="Ce que la V2 corrige par rapport à la V1"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {[
            ["Navigation", "Header plus propre, états actifs plus visibles, libellés plus cohérents."],
            ["Lisibilité", "Titres plus expressifs, largeurs de ligne mieux maîtrisées, meilleure densité d’information."],
            ["Accessibilité", "Focus visible, meilleur contraste, CTA plus explicites, structure sémantique plus claire."],
            ["Branding", "Direction visuelle plus assumée avec un système cyan/violet cohérent et premium."],
          ].map(([title, desc]) => (
            <Card key={title} className="p-6">
              <h3 className="font-serif text-2xl text-white">{title}</h3>
              <p className="mt-3 leading-7 text-muted">{desc}</p>
            </Card>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/contact" className="text-sm font-semibold text-primary underline underline-offset-4">
            Passer à une version encore plus produit →
          </Link>
        </div>
      </section>
    </Shell>
  );
}
