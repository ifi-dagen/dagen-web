import { getFAQs, FAQ } from "../lib/faq";
import ReactMarkdown from "react-markdown";
import FAQAccordion from "@/components/FAQAccordion";
import Papa from "papaparse";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function Page({ sections, faqs }: { sections: string[], faqs: FAQ[] }) {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-12">
      {sections?.map((section, index) => (
        <div key={index} className="prose mx-auto text-center">
          <ReactMarkdown>{section}</ReactMarkdown>
        </div>
      ))}
      
      {/* FAQ Section */}
      <div className="my-12">
        <h2 className="text-4xl font-bold text-center mb-8 text-(--primary)">FAQs</h2>
        <FAQAccordion faqs={faqs} />
      </div>
      
      <div className="text-center">
        <h2 className="text-4xl font-bold text-(--primary) mb-4">Kontakt</h2>
        <p className="text-lg">
          Ved spørsmål, kontakt bedrift@dagenatifi.no
        </p>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  // Get csv and read the files to be displayed
  const csvPath = path.join(process.cwd(), "content/bedrift/bedriftside.csv");
  const fileContent = fs.readFileSync(csvPath, "utf8");
  const { data } = Papa.parse<string[]>(fileContent, {
    skipEmptyLines: true,
  });

  // Empty list for content to be displayed
  const sections: string[] = [];

  for (const row of data) {
    const mdPath = row[0];
    if (mdPath && mdPath.toLowerCase().endsWith('.md')) {
      // If the path leads to a file, add to list to be displayed
      const fullPath = path.join(process.cwd(), `content/${mdPath}`);
      if (fs.existsSync(fullPath)) {
        const mdContent = fs.readFileSync(fullPath, "utf8");
        const { content } = matter(mdContent);
        sections.push(content);
      }
    }
  }

  const faqs = await getFAQs("bedrift/FAQ");
  return { props: { sections, faqs } };
}
