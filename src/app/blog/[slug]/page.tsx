import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Shell, { Card, Meta, Pill } from "@/components/shell";

type Post = { slug: string; title: string; date?: string; topic: string; content: string };
const POSTS_DIR = path.join(process.cwd(), "content/posts");

function loadPost(slug: string): Post | null {
  if (!fs.existsSync(POSTS_DIR)) return null;
  for (const entry of fs.readdirSync(POSTS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const file = path.join(POSTS_DIR, entry.name, `${slug}.mdx`);
    if (!fs.existsSync(file)) continue;
    const src = fs.readFileSync(file, "utf-8");
    const { data, content } = matter(src);
    return {
      slug,
      title: data.title ?? slug,
      date: data.date,
      topic: data.topic ?? "thoughts",
      content,
    };
  }
  return null;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = loadPost(slug);
  if (!post) notFound();

  return (
    <Shell>
      <article className="container-shell pt-16 md:pt-24">
        <Card className="p-6 md:p-10">
          <Link href="/blog" className="inline-flex text-sm font-medium text-primary underline underline-offset-4">
            ← Retour aux articles
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Pill>{post.topic}</Pill>
            {post.date ? <Meta>{post.date}</Meta> : null}
          </div>
          <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight text-white md:text-6xl text-balance">
            {post.title}
          </h1>
          <div className="mt-10 rounded-[24px] border border-white/8 bg-black/10 p-6 md:p-8">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br/>") }}
            />
          </div>
        </Card>
      </article>
    </Shell>
  );
}
