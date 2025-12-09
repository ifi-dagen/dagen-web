import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDir = path.join(process.cwd(), "content/pages");

export async function getPageContent(slug: string) {
  const filePath = path.join(contentDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    console.error(`Missing markdown file for slug: ${slug}`);
    return "<h1>404 - Page not found</h1>";
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { content } = matter(file);
  const processed = await remark().use(html).process(content);
  return processed.toString();
}
