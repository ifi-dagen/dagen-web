import { getMarkdownContent } from "../lib/markdown";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";


export default function Home({ dagen, ettermiddagen }: { dagen: string, ettermiddagen: string }) {
  const router = useRouter();
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      
      {/* Dagen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <img
          src={`${router.basePath}/Dagen@ifi_2022-1.webp`}
          alt="Dagen bilde"
          className="w-full h-auto rounded-lg"
        />
        <div className="prose">
          <ReactMarkdown>{dagen}</ReactMarkdown>
        </div>
      </div>

      {/* Ettermiddagen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="prose md:order-1">
          <ReactMarkdown>{ettermiddagen}</ReactMarkdown>
        </div>
        <img
          src={`${router.basePath}/Dagen@ifi_2022.webp`}
          alt="Ettermiddagen bilde"
          className="w-full h-auto rounded-lg md:order-2"
        />
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const dagen = await getMarkdownContent("arrangementer/dagen");
  const ettermiddagen = await getMarkdownContent("arrangementer/ettermiddagen");
  return { props: { dagen, ettermiddagen } };
}
