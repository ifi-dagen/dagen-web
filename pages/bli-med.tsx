import ReactMarkdown from "react-markdown";
import ContentRowBuilder from "@/components/ContentRowBuilder";
import { getContentRowLayout } from "@/lib/getContentRowLayout";
import { getInternGroups } from "../lib/getInternGroups";
import { InternGroup, JoinUsProps } from "@/types";
import JoinUsCard from "@/components/JoinUsCard";
import { getMarkdownContent } from "@/lib/getMarkdownContent";

type JoinProps = {
  internGroups: InternGroup[];
  bliMedInfo: string;
  funkInfo: string;
  funkExtended: string;
  internInfo: string;
  internExtended: string;
  styretInfo: string;
  styretExtended: string;
}

export default function Page({
  internGroups,
  bliMedInfo,
  funkInfo,
  funkExtended,
  internInfo,
  internExtended,
  styretInfo,
  styretExtended,
}: JoinProps) {
  return (
    <main className="max-w-[1304px] mx-auto mt-[260px]">
      <div
        className="max-w-[1107px] mx-auto">
        <p
          className={[
            "text-black text-lg font-normal font-mono leading-8",
            "tracking-wide text-justify",
          ].join(" ")}
        >
          {bliMedInfo}
        </p>
      </div>

      <div className="flex flex-row justify-center gap-[63px] py-[114px]">
        {/* Funk */}
        <div>
          <JoinUsCard
            title="Funksjonær;"
            infoText={funkInfo}
            popupLink="null"
            applyLink="null"
          />
        </div>

        {/* Intern */}
        <div>
          <JoinUsCard
            title="Intern;"
            infoText={internInfo}
            popupLink="null"
            applyLink="null"
          />
        </div>


        {/* Styret */}
        <div>
          <JoinUsCard
            title="Styremedlem;"
            infoText={styretInfo}
            popupLink="null"
            applyLink="null"
          />
        </div>
      </div>
    </main>
  );
}

export function getStaticProps() {
  const internGroups = getInternGroups();
  const bliMedInfo = getMarkdownContent("bli-med/bli_med");
  const funkInfo = getMarkdownContent("bli-med/funk_info");
  const funkExtended = getMarkdownContent("bli-med/funk_extended");
  const internInfo = getMarkdownContent("bli-med/intern_info");
  const internExtended = getMarkdownContent("bli-med/intern_extended");
  const styretInfo = getMarkdownContent("bli-med/styret_info");
  const styretExtended = getMarkdownContent("bli-med/styret_extended");
  return {
    props: {
      internGroups,
      bliMedInfo,
      funkInfo,
      funkExtended,
      internInfo,
      internExtended,
      styretInfo,
      styretExtended,
    }
  };
}
