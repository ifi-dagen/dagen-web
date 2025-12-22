import { getMarkdownContent } from "../lib/markdown";
import { getFAQs, FAQ } from "../lib/faq";
import ReactMarkdown from "react-markdown";
import FAQAccordion from "@/components/FAQAccordion";

export default function Page({ content, hsp, dagen, ettermiddagen, faqs }: { content: string, hsp: string, dagen: string, ettermiddagen: string, faqs: FAQ[] }) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      <div className="prose mx-auto text-center">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      
      <div className="prose mx-auto text-center">
        <ReactMarkdown>{hsp}</ReactMarkdown>
      </div>
      
      <div className="prose mx-auto text-center">
        <ReactMarkdown>{dagen}</ReactMarkdown>
      </div>

      <div className="prose mx-auto text-center">
        <ReactMarkdown>{ettermiddagen}</ReactMarkdown>
      </div>
      
      {/* FAQ Section */}
      <div className="my-12">
        <h2 className="text-4xl font-bold text-center mb-8 text-(--primary)">FAQs</h2>
        <FAQAccordion faqs={faqs} />
      </div>
      
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Kontakt</h2>
        <p className="text-lg">
          Ved spørsmål, kontakt bedrift@dagenatifi.no
        </p>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const pageInfo = await getMarkdownContent("bedrift/bedrift");
  const hsp = await getMarkdownContent("bedrift/HSP_utlysning");
  const dagen = await getMarkdownContent("bedrift/dagen");
  const ettermiddagen = await getMarkdownContent("bedrift/ettermiddagen");
  const faqs = await getFAQs("bedrift/FAQ");
  return { props: { content: pageInfo, hsp, dagen, ettermiddagen, faqs } };
}
