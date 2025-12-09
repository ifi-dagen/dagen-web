import { getPageContent } from "../lib/markdown";

export default function Home({ content }: { content: string }) {
  return <main dangerouslySetInnerHTML={{ __html: content }} />;
}

export async function getStaticProps() {
  const content = await getPageContent("hjem");
  return { props: { content } };
}
