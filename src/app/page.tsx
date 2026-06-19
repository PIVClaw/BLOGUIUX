import { HomePageClient } from "@/components/home-page";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const postsByLocale = {
    fr: getAllPosts("fr").map(({ slug, title, date, description, tags, cover, readingTime }) => ({
      slug,
      title,
      date,
      topic: tags?.[0] ?? "tech",
      excerpt: description,
      cover,
      readingTime,
    })),
    en: getAllPosts("en").map(({ slug, title, date, description, tags, cover, readingTime }) => ({
      slug,
      title,
      date,
      topic: tags?.[0] ?? "tech",
      excerpt: description,
      cover,
      readingTime,
    })),
  };

  return <HomePageClient postsByLocale={postsByLocale} />;
}
