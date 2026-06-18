import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Locale } from "./site";

const CONTENT_ROOT = path.join(process.cwd(), "content", "posts");

type Frontmatter = {
  title: string;
  description: string;
  date: string;
  cover?: string;
  tags?: string[];
  published?: boolean;
};

export type PostMeta = Frontmatter & {
  slug: string;
  locale: Locale;
  readingTime: string;
};

function getLocaleDir(locale: Locale) {
  return path.join(CONTENT_ROOT, locale);
}

export function getAllPosts(locale: Locale): PostMeta[] {
  const dir = getLocaleDir(locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(dir, file);
      const source = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(source);
      const frontmatter = data as Frontmatter;

      return {
        ...frontmatter,
        slug,
        locale,
        published: frontmatter.published ?? true,
        readingTime: readingTime(content).text,
      };
    })
    .filter((post) => post.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getFeaturedPost(locale: Locale) {
  return getAllPosts(locale)[0] ?? null;
}

export async function getPostBySlug(locale: Locale, slug: string) {
  const fullPath = path.join(getLocaleDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const source = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(source);
  const frontmatter = data as Frontmatter;

  const { content: compiled } = await compileMDX<Frontmatter>({
    source: content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return {
    frontmatter,
    content: compiled,
    meta: {
      ...frontmatter,
      slug,
      locale,
      published: frontmatter.published ?? true,
      readingTime: readingTime(content).text,
    } satisfies PostMeta,
  };
}
