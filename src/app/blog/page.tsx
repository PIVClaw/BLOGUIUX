import { BlogPageClient } from "@/components/blog-page";
import { getAllPosts } from "@/lib/posts";

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;

  const postsByLocale = {
    fr: getAllPosts("fr").map(({ slug, title, date, description, tags, readingTime }) => ({
      slug,
      title,
      date,
      topic: tags?.[0] ?? "tech",
      excerpt: description,
      readingTime,
    })),
    en: getAllPosts("en").map(({ slug, title, date, description, tags, readingTime }) => ({
      slug,
      title,
      date,
      topic: tags?.[0] ?? "tech",
      excerpt: description,
      readingTime,
    })),
  };

  return <BlogPageClient postsByLocale={postsByLocale} topic={topic} />;
}
