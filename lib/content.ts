import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

export type Prompt = {
  slug: string;
  title: string;
  category: string;
  description?: string;
  featured?: boolean;
  images?: string[];
  date?: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_CONTENT_DIR = path.join(process.cwd(), "public", "content");

export function getAllCategories(): {
  slug: string;
  name: string;
  cover?: string;
}[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const pubDir = path.join(PUBLIC_CONTENT_DIR, d.name);
      let coverPath: string | undefined;
      if (fs.existsSync(pubDir)) {
        const maybe = fs
          .readdirSync(pubDir)
          .find((f) => /^cover\.(png|jpg|jpeg|webp|svg)$/i.test(f));
        if (maybe) coverPath = `/content/${d.name}/${maybe}`;
      }
      return { slug: d.name, name: toTitle(d.name), cover: coverPath };
    });
}

export function getPromptsByCategory(category: string): Prompt[] {
  const dir = path.join(CONTENT_DIR, category);
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  // Prefer .md over .mdx when both exist
  const bySlug = new Map<string, string>();
  for (const file of files) {
    const slug = file.replace(/\.(md|mdx)$/i, "");
    const isMd = file.toLowerCase().endsWith(".md");
    if (!bySlug.has(slug) || isMd) {
      bySlug.set(slug, file);
    }
  }

  const prompts: Prompt[] = [];
  for (const [slug, file] of bySlug) {
    const filePath = path.join(dir, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data } = matter(source);
    prompts.push(normalizeFrontmatter({ slug, ...data, category }));
  }

  return prompts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export function getAllPrompts(): Prompt[] {
  return getAllCategories().flatMap((c) => getPromptsByCategory(c.slug));
}

export function getFeaturedPrompts(): Prompt[] {
  return getAllPrompts()
    .filter((p) => !!p.featured)
    .slice(0, 12);
}

export function getPrompt(
  category: string,
  slug: string
): { meta: Prompt; body: string } | null {
  const mdPath = path.join(CONTENT_DIR, category, `${slug}.md`);
  const mdxPath = path.join(CONTENT_DIR, category, `${slug}.mdx`);
  const filePath = fs.existsSync(mdPath) ? mdPath : mdxPath;
  if (!fs.existsSync(filePath)) return null;
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  return {
    meta: normalizeFrontmatter({ slug, ...data, category }),
    body: content,
  };
}

function normalizeFrontmatter(data: Record<string, unknown>): Prompt {
  return {
    slug: String(data.slug ?? ""),
    title: String(data.title ?? toTitle(String(data.slug ?? ""))),
    category: String(data.category ?? ""),
    description: typeof data.description === "string" ? data.description : "",
    featured: Boolean(data.featured),
    images: Array.isArray(data.images)
      ? (data.images as unknown[]).map(String)
      : [],
    date: typeof data.date === "string" ? data.date : undefined,
  };
}

function toTitle(s: string) {
  return s.replace(/[-_]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
