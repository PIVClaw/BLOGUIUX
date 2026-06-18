import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Shell, { SectionHeading, Pill, Meta } from "@/components/shell";
import { ArticleCard } from "@/components/article-card";

type Post = { slug: string; title: string; date?: string; topic: string; excerpt?: string };
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
        };
      });
  }).sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;
  const posts = loadPosts();
  const filtered = topic ? posts.filter((post) => post.topic === topic) : posts;

  return (
    <Shell>
      <section className="container-shell pt-16 md:pt-24">
        <SectionHeading
          eyebrow="Bibliothèque"
          title="Tous les articles"
          description="Un listing plus propre, avec un meilleur repérage du contenu et une entrée de lecture plus directe."
        />
        {topic ? <div className="mb-8"><Pill>Filtre actif : {topic}</Pill></div> : null}
        {filtered.length === 0 ? (
          <Meta>Aucun article disponible pour ce filtre.</Meta>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((post) => (
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
        )}
      </section>
    </Shell>
  );
}
