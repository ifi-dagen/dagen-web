import fs from "fs";
import path from "path";
import Papa from "papaparse"
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

// Markdown
export function getMarkdownContent(contentName: string): string {
  const filePath = path.join(contentDir, `${contentName}.md`);

  if (!fs.existsSync(filePath)) {
    console.error(`Missing markdown file for content: ${contentName}`);
    return "";
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { content } = matter(file);
  return content.trim();
}

// CSV
export function getCsvContent<T extends Record<string, unknown>>( contentName: string ): T[] {
    const filePath = path.join(contentDir, `${contentName}.csv`);

    if (!fs.existsSync(filePath)) {
      console.error(`Missing CSV: ${contentName}`);
      return [];
    }

    const file = fs.readFileSync(filePath, "utf8");

    const parsed = Papa.parse<T>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.toLowerCase().trim(),
    });

    if (parsed.errors.length) {
      console.error(`CSV parse errors in ${contentName}.csv`, parsed.errors);
    }

    return parsed.data
    .map((row) => row as T)
    .filter((row) =>
    Object.values(row).some((v) => String(v ?? "").trim() !== "")
  );
}