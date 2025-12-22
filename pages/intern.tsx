import { getMarkdownContent, getInternGroups } from "../lib/markdown";
import ReactMarkdown from "react-markdown";

type InternGroup = {
  content: string;
};

export default function Page({ content, internInfo, internGroups }: { content: string; internInfo: string; internGroups: InternGroup[] }) {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="prose max-w-xl mx-auto px-4 py-8">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      <div className="prose max-w-4xl mx-auto px-4 py-8 text-center">
        <ReactMarkdown>{internInfo}</ReactMarkdown>
      </div>

      {/* Interngrupper */}
      <div className="space-y-4 text-center">
        <h2 className="text-4xl font-bold text-(--primary)">Intergruppene</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internGroups.map((group, index) => (
            <div key={index} className="prose p-6 bg-white dark:bg-gray-800">
              <ReactMarkdown>{group.content}</ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const content = await getMarkdownContent("intern/intern");
  const internInfo = await getMarkdownContent("intern/intern_info");
  const internGroups = await getInternGroups();
  return { props: { content, internInfo, internGroups } };
}
