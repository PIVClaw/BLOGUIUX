import { notFound } from "next/navigation";
import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";
import { ArticlePageClient } from "@/components/article-page";
import { getPostBySlug } from "@/lib/posts";

const CONTENT_ROOT = path.join(process.cwd(), "content", "posts");

function getRawPost(locale: "fr" | "en", slug: string) {
  const fullPath = path.join(CONTENT_ROOT, locale, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const source = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(source);

  return {
    slug,
    title: (data.title as string) ?? slug,
    date: data.date as string | undefined,
    topic: (Array.isArray(data.tags) ? data.tags[0] : undefined) ?? "tech",
    content,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const metaCheck = await Promise.all([getPostBySlug("fr", slug), getPostBySlug("en", slug)]);
  if (!metaCheck[0] && !metaCheck[1]) notFound();

  const fr = getRawPost("fr", slug);
  const en = getRawPost("en", slug);

  return <ArticlePageClient slug={slug} postsByLocale={{ fr, en }} />;
}
