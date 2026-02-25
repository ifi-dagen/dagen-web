import ReactMarkdown from "react-markdown";
import { useState, useMemo, useRef, useEffect } from "react";

import PageCard from "@/components/PageCard";
import ApplyButton from "@/components/buttons/ApplyButton";
import PageOverlay from "@/components/PageOverlay";
import OverlayCard from "@/components/OverlayCard";

import { getMarkdownContent } from "@/lib/getFileContent";
import { getApplyLinks } from "@/lib/getApplyLinks";
import {
  INTERN_TITLES,
  INTERN_KEYS,
  STYRET_TITLES,
  STYRET_KEYS,
} from "@/lib/joinCards";

import type { JoinUsPageProps } from "@/types/pages";
import type { CardData } from "@/types/domain";

type OverlayType = "funk" | "intern" | "styret" | null;

const isOverlayType = (x: unknown): x is Exclude<OverlayType, null> =>
  x === "funk" || x === "intern" || x === "styret";

export default function JoinUsPage({
  joinUsInfo,
  funkInfo,
  funkExtended,
  internInfo,
  internExtended,
  styretInfo,
  styretExtended,
  internCards,
  styretCards,
  applyLinks,
}: JoinUsPageProps) {
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

  useEffect(() => {
    const syncFromHash = () => {
      const raw = window.location.hash.replace("#", "");
      const next: OverlayType = isOverlayType(raw) ? raw : null;
      setOverlay(next);
    };

    syncFromHash();

    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const openOverlay = (type: Exclude<OverlayType, null>) => {
    scrollYRef.current = window.scrollY || 0;
    window.location.hash = type;
  };


  const closeOverlay = () => {
    if (window.location.hash) {
      history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
    }

    setOverlay(null);

    requestAnimationFrame(() => {
      window.scrollTo(0, scrollYRef.current);
    });
  };


  return (
    <main className="max-w-[1304px] mx-auto pt-[164px]">

      {/* Info / motivasjonstekst */}
      <div
        className="max-w-[1107px] mx-auto">
        <p
          className={[
            "px-6 md:px-4",
            "text-text-color text-lg font-normal leading-8",
            "tracking-wide",
          ].join(" ")}
        >
          {joinUsInfo}
        </p>
      </div>

      {/* Inforkort */}
      <div className="flex flex-col items-center gap-10 py-[114px]
                md:flex-row md:justify-center md:items-stretch md:gap-2 px-2">

        {/* Funk */}
        <PageCard
          title="Funksjonær;"
          infoText={
            <div>
              <p>AKA “funk”</p>
              <ol>
                <li>en som jobber frivillig før/under/etter dagen@ifi</li>
                <li>får  en feeet funkpakke og invitasjon til funkfest som takk for innsatsen!</li>
                <li>velges i aug/sep</li>
              </ol>
            </div>
          }
          onOpen={() => openOverlay("funk")}
          applyLink={applyLinks.funk}
          widthClass="w-[360px] md:w-96"
        />

        {/* Intern */}
        <PageCard
          title="Intern;"
          infoText={
            <div>
              <ol>
                <li> jobber tett med styret hele året, og er med på sosiale aktiviteter</li>
                <li>bidrar til både dagen@ifi og ettermiddagen@ifi</li>
                <li>velges jan/feb hvert år</li>
              </ol>
              <div>
                <b><i>SØKNADSFRIST: </i></b>
                <b>01.02.26 </b>
                <i>kl.</i>
              </div>
              <p>23:59</p>
            </div>
          }
          onOpen={() => openOverlay("intern")}
          applyLink={applyLinks.intern}
          widthClass="w-[360px] md:w-96"
        />

        {/* Styret */}
        <PageCard
          title="Styremedlem;"
          infoText={<div>
            <ol>
              <li>jobber “bak kulissene” med å arrangere dagen@ifi og ettermiddagen@ifi</li>
              <li>velges hver generalforsamling (okt/nov)</li>
              <li>alle ifi-studenter kan stille til styret</li>
            </ol>
          </div>}
          onOpen={() => openOverlay("styret")}
          applyLink={null}
          widthClass="w-[360px] md:w-96"
        />
      </div>

      <PageOverlay open={overlay !== null} onClose={closeOverlay} maxWidthClass="max-w-[1304px]">
        <div className="max-w-[1107px] mx-auto">
          {/* Title */}
          <div className="text-4xl font-bold font-mono uppercase 
                            leading-8 tracking-widest text-center mb-16">
            {overlayData?.title}
          </div>

          {/* Infotekst */}
          <div className="pb-20">
            <div className="text-lg font-normal 
                            leading-8 tracking-wide prose">
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
          <div className="max-w-[1256px] mx-auto space-y-10 justify-items-center">
            <div className="flex flex-wrap gap-10 gap-x-[88px] justify-center">
              {internCards.map(card => (
                <OverlayCard
                  key={card.title}
                  title={card.title}
                  frameClass="w-[360px] md:h-[512px]"
                  bodyClass="px-8 py-5 justify-start text-lg tracking-wide leading-8"
                  children={card.text}
                />
              ))}
            </div>
          </div>
        )}

        {/* Kort - Styret */}
        {overlay === "styret" && (
          <div className="max-w-[1256px] mx-auto">
            <div className="flex flex-wrap gap-x-[54px] gap-y-10 justify-center">
              {styretCards.map((card) => (
                <OverlayCard
                  key={card.title}
                  title={card.title}
                  frameClass="md:w-[599px] md:h-[404px]"
                  bodyClass="px-6 py-6 justify-start text-lg tracking-wide leading-8"
                  children={card.text}
                />
              ))}
            </div>
          </div>
        )}
      </PageOverlay>
    </main>
  );
}

export function getStaticProps() {
  const joinUsInfo = getMarkdownContent("bli-med/bli_med");
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
      joinUsInfo,
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
