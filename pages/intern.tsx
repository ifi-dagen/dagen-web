import { getPageContent } from "../lib/markdown";

export default function Page({ content }: { content: string }) {
  return <main dangerouslySetInnerHTML={{ __html: content }} />;
}

export async function getStaticProps() {
  const content = await getPageContent("intern");
  return { props: { content } };
}
