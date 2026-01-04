import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export function getMarkdownContent(contentName: string): string {
  const filePath = path.join(contentDir, `${contentName}.md`);

  if (!fs.existsSync(filePath)) {
    console.error(`Missing markdown file for content: ${contentName}`);
    return "# 404 - This is just for placement during development! "; // OBS denne byttes til "" når prod!! TODO TODO TODO
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { content } = matter(file);
  return content;
}
