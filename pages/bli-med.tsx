import ReactMarkdown from "react-markdown";
import { useState, useMemo, useRef } from "react";

import JoinUsCard from "@/components/bli-med/JoinUsCard";
import JoinUsOverlay from "@/components/bli-med/JoinUsOverlay";
import JoinReadMoreCard from "@/components/bli-med/JoinReadMoreCard";
import ApplyButton from "@/components/buttons/ApplyButton";

import { getMarkdownContent } from "@/lib/getFileContent";
import { getApplyLinks } from "@/lib/bli-med/getApplyLinks";
import {
  INTERN_TITLES,
  INTERN_KEYS,
  STYRET_TITLES,
  STYRET_KEYS,
} from "@/lib/bli-med/joinCards";

import type { BliMedPageProps } from "@/types/pages";
import type { CardData } from "@/types/domain";

type OverlayType = "funk" | "intern" | "styret" | null;

export default function JoinUs({
  bliMedInfo,
  funkInfo,
  funkExtended,
  internInfo,
  internExtended,
  styretInfo,
  styretExtended,
  internCards,
  styretCards,
  applyLinks,
}: BliMedPageProps) {
  const [overlay, setOverlay] = useState<OverlayType>(null);

  const OVERLAY = useMemo(() => {
    return {
      funk: {
        title: "Lær mer om funksjonærer",
        body: funkExtended,
        applyLink: applyLinks.funk,
      },
      intern: {
        title: "Lær mer om interne",
        body: internExtended,
        applyLink: applyLinks.intern,
      },
      styret: {
        title: "Lær mer om styret",
        body: styretExtended,
        applyLink: null,
      },
    } as const;
  }, [funkExtended, internExtended, styretExtended, applyLinks.funk, applyLinks.intern]);

  const overlayData = overlay ? OVERLAY[overlay] : null;
  const scrollYRef = useRef(0);

  // Fordi Safari er vanskelig og tuller med scroll og overlay
  const openOverlay = (type: OverlayType) => {
    scrollYRef.current = window.scrollY || 0;
    setOverlay(type);
  }

  // Setter historikk 1 tilbake ved lukking av overlay
  const closeOverlay = () => {
    setOverlay(null);

    // Fordi Safari
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollYRef.current);
    });

    if (typeof window !== "undefined" && window.history.state?.joinUsOverlay) {
      window.history.back();
    }
  };


  return (
    <main className="max-w-[1304px] mx-auto pt-[164px]">

      {/* Info / motivasjonstekst */}
      <div
        className="max-w-[1107px] mx-auto">
        <p
          className={[
            "px-6 md:px-0",
            "text-black text-lg font-normal font-mono leading-8",
            "tracking-wide text-justify",
          ].join(" ")}
        >
          {bliMedInfo}
        </p>
      </div>

      {/* Inforkort */}
      <div className="flex flex-col items-center gap-10 py-[114px]
                md:flex-row md:justify-center md:gap-[63px]">

        {/* Funk */}
        <JoinUsCard
          title="Funksjonær;"
          infoText={funkInfo}
          onOpen={() => openOverlay("funk")}
          applyLink={applyLinks.funk}
        />

        {/* Intern */}
        <JoinUsCard
          title="Intern;"
          infoText={internInfo}
          onOpen={() => openOverlay("intern")}
          applyLink={applyLinks.intern}
        />

        {/* Styret */}
        <JoinUsCard
          title="Styremedlem;"
          infoText={styretInfo}
          onOpen={() => openOverlay("styret")}
          applyLink={null}
        />
      </div>

      <JoinUsOverlay open={overlay !== null} onClose={closeOverlay}>
        <div className="max-w-[1107px] mx-auto">
          {/* Title */}
          <div className="text-black text-4xl font-bold font-mono uppercase leading-8 tracking-widest text-center mb-16">
            {overlayData?.title}
          </div>

          {/* Infotekst */}
          <div className="pb-20">
            <div className="text-justify text-black text-lg font-normal font-mono leading-8 tracking-wide whitespace-pre-line">
              <ReactMarkdown>{overlayData?.body ?? ""}</ReactMarkdown>
            </div>

            {/* Søk-knapp - Intern og Funk - Trenger link i tilhørende fil */}
            {overlayData?.applyLink && (
              <div className="mt-12 flex justify-end">
                <ApplyButton href={overlayData.applyLink} />
              </div>
            )}
          </div>
        </div>

        {/* Kort - Intern */}
        {overlay === "intern" && (
          <div className="max-w-[1256px] mx-auto space-y-10">
            
            {/* Rad 1 */}
            <div className="grid gap-10 grid-cols-1 md:grid-cols-3 gap-x-[88px] justify-items-center">
              {internCards.slice(0, 3).map(card => (
                <JoinReadMoreCard key={card.title} variant="intern" title={card.title} cardText={card.text} />
              ))}
            </div>

            {/* Rad 2 */}
            <div className="grid gap-10 grid-cols-1 md:grid-cols-3 gap-x-[88px] justify-items-center">
              {internCards.slice(3, 6).map(card => (
                <JoinReadMoreCard key={card.title} variant="intern" title={card.title} cardText={card.text} />
              ))}
            </div>

            {/* Rad 3 – 2 kort, sentrert på desktop */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-10 md:flex-row md:gap-x-[88px] md:max-w-[880px]">
                {internCards.slice(6, 8).map((card) => (
                  <JoinReadMoreCard
                    key={card.title}
                    variant="intern"
                    title={card.title}
                    cardText={card.text}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Kort - Styret */}
        {overlay === "styret" && (
          <div className="max-w-[1256px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[54px] gap-y-10 justify-items-center">
              {styretCards.map((card) => (
                <JoinReadMoreCard
                  key={card.title}
                  variant="styret"
                  title={card.title}
                  cardText={card.text}
                />
              ))}
            </div>
          </div>
        )}
      </JoinUsOverlay>
    </main>
  );
}

export function getStaticProps() {
  const bliMedInfo = getMarkdownContent("bli-med/bli_med");
  const funkInfo = getMarkdownContent("bli-med/funk_info");
  const funkExtended = getMarkdownContent("bli-med/funk_extended");
  const internInfo = getMarkdownContent("bli-med/intern_info");
  const internExtended = getMarkdownContent("bli-med/intern_extended");
  const styretInfo = getMarkdownContent("bli-med/styret_info");
  const styretExtended = getMarkdownContent("bli-med/styret_extended");

  const internCards: CardData[] = INTERN_TITLES.map((title, i) => ({
    title,
    text: getMarkdownContent(`bli-med/intern-cards/${INTERN_KEYS[i]}`),
  }));

  const styretCards: CardData[] = STYRET_TITLES.map((title, i) => ({
    title,
    text: getMarkdownContent(`bli-med/styret-cards/${STYRET_KEYS[i]}`),
  }));

  const applyLinks = getApplyLinks();

  return {
    props: {
      bliMedInfo,
      funkInfo,
      funkExtended,
      internInfo,
      internExtended,
      styretInfo,
      styretExtended,
      internCards,
      styretCards,
      applyLinks,
    },
  };
}