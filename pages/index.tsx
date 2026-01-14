// Forsiden (hjem)

import ReactMarkdown from "react-markdown";
import { Member } from "../types";
import { getMarkdownContent } from "@/lib/getMarkdownContent";
import { getMembers } from "@/lib/members";
import Image from "next/image";

type HomePageProps = {
  whatIsDagen: string;
  hspInfo: string;
  dagenInfo: string;
  ettermiddagenInfo: string;
  aboutText: string;
  members: Member[];
};

// Hovedfunksjon
export default function Home({ whatIsDagen, hspInfo, dagenInfo, ettermiddagenInfo, aboutText, members }: HomePageProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-50 mt-44 mb-44">

      <div className="prose max-w-4xl mx-auto">
        <ReactMarkdown>{whatIsDagen}</ReactMarkdown>
      </div>

      <div className="max-w-5xl mx-auto border-2 px-8 py-8 flex flex-col">
        <div className="flex items-center justify-center gap-32 mb-12 mt-8">
          <div className="relative w-32 h-32 shrink-0">
            <Image
              src={"/homepage/hsp_logo.png"}
              alt=""
              fill
              sizes="48px"
            />
          </div>
          <h2 className="text-4xl text-(--primary) font-bold m-0">
            Hovedsamarbeidspartner
          </h2>
        </div>

        <div className="prose max-w-none flex-1">
          <ReactMarkdown>{hspInfo}</ReactMarkdown>
        </div>

        <div className="mt-auto flex flex-col gap-4 md:flex-row md:gap-8 md:justify-end">
          <button className="py-4 w-xs bg-(--primary) text-white rounded-4xl hover:opacity-70">
            Bli hovedsamarbeidspartner
          </button>
          <button className="py-4 w-xs bg-(--primary) text-white rounded-4xl hover:opacity-70">
            Bli samarbeidspartner
          </button>
        </div>
      </div>

      <div className="max-w-5xl mr-auto">
        <div className="flex gap-10">
          <div className="prose max-w-xl flex-1">
            <ReactMarkdown>{dagenInfo}</ReactMarkdown>
          </div>

          <div className="relative max-w-md w-full aspect-4/3">
            <Image
              src="/homepage/dagen.webp"
              alt=""
              fill
              sizes="(min-width: 768px) 448px, 100vw"
              className="object-cover rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl ml-auto">
        <div className="flex gap-10">
          <div className="relative max-w-md w-full aspect-4/3">
            <Image
              src="/homepage/ettermiddagen.webp"
              alt=""
              fill
              sizes="(min-width: 768px) 448px, 100vw"
              className="object-cover rounded-xl"
            />
          </div>

          <div className="prose max-w-xl flex-1">
            <ReactMarkdown>{ettermiddagenInfo}</ReactMarkdown>
          </div>
        </div>
      </div>
    </main>
  );
}

export function getStaticProps() {
  const whatIsDagen = getMarkdownContent("hjem/what-is-dagen");
  const hspInfo = getMarkdownContent("hjem/hsp-info");
  const dagenInfo = getMarkdownContent("hjem/dagen");
  const ettermiddagenInfo = getMarkdownContent("hjem/ettermiddagen");
  const aboutText = getMarkdownContent("hjem/om-oss");
  const members = getMembers();
  return {
    props: {
      whatIsDagen,
      hspInfo,
      dagenInfo,
      ettermiddagenInfo,
      aboutText,
      members
    },
  };
}
