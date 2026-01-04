import { getContentRowLayout } from "@/lib/getContentRowLayout";
import { getInternGroups } from "../lib/getInternGroups";
import ReactMarkdown from "react-markdown";
import { ContentRow } from "@/types";
import ContentRowBuilder from "@/components/ContentRowBuilder";

type JoinUsProps = {
  contentRows: ContentRow[];
  internGroups: InternGroup[];
}

type InternGroup = {
  content: string;
};

export default function Page({ contentRows, internGroups }: JoinUsProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-12">
      

      <ContentRowBuilder rows={contentRows} />
      

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

export function getStaticProps() {
  const contentRows = getContentRowLayout("bli-med/bli_med.csv");
  const internGroups = getInternGroups();
  return { props: { 
    contentRows,
    internGroups,
  } };
}
