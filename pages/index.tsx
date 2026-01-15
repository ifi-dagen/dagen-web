// Forsiden (hjem)

import ReactMarkdown from "react-markdown";
import { getMarkdownContent } from "@/lib/getMarkdownContent";
import Image from "next/image";
import { useRouter } from "next/router";

type HomePageProps = {
  whatIsDagen: string;
  hspInfo: string;
  dagenInfo: string;
  ettermiddagenInfo: string;
};

export default function Home({ whatIsDagen, hspInfo, dagenInfo, ettermiddagenInfo }: HomePageProps) {
  const router = useRouter();
  return (
    <main className="max-w-[1253px] mx-auto px-4 md:px-6 pt-[300px] pb-[160px]">

      {/* Hva er Dagen - infotekst - PATH til tekst nederst i koden */}
      <section className="mb-[270px]">
        <div className="prose max-w-[1107px] mx-auto font-mono">
          <ReactMarkdown>{whatIsDagen}</ReactMarkdown>
        </div>
      </section>

      {/* HSP, skjult hvis markdownfilen er tom */}
      {hspInfo &&
        <section className="mb-[170px]">
          <div className="max-w-[1106px] min-h-[557px] mx-auto border-[0.93px] border-black rounded-[4.66px] px-8 py-8 flex flex-col">
            <div className="flex flex-col items-center text-center md:flex-row md:justify-center md:gap-[64px] mb-[48px]">
              {/* Logo: under på mobil, venstre på desktop */}
              <div className="order-2 md:order-1 relative w-[128px] h-[128px] shrink-0 mt-[24px] md:mt-0">
                <Image
                  src={`${router.basePath}/homepage/hsp_logo.png`} // <------------- BILDE LINK / PATH FOR HPS-LOGO
                  alt=""
                  fill
                  sizes="128px"
                />
              </div>

              {/* Tittel: først og delt på mobil, høyre for logo på desktop */}
              <h2 className="order-1 md:order-2 m-0 font-heading font-bold text-black text-[32px] sm:text-[40px] md:text-[48px] leading-[1.05]">
                <span className="md:hidden">
                  HOVEDSAMAR-<br />
                  BEIDSPARTNER
                </span>
                <span className="hidden md:inline">HOVEDSAMARBEIDSPARTNER</span>
              </h2>
            </div>

            {/* HSP - infotekst --- PATH nederst i koden */}
            <div className="prose max-w-none flex-1 font-mono">
              <ReactMarkdown>{hspInfo}</ReactMarkdown>
            </div>

            <div className="mt-auto flex flex-col gap-4 md:flex-row md:gap-6 md:justify-end pt-[24px]">
              <button className="h-[59px] px-[16px] py-[8px] rounded-[53.4px] border-[0.93px] border-black bg-[var(--primary)] font-mono font-normal text-[11px] leading-[15px] tracking-[0.05em] hover:opacity-70 transition whitespace-nowrap">
                Bli hovedsamarbeidspartner
              </button>
              <button className="h-[59px] px-[16px] py-[8px] rounded-[53.4px] border-[0.93px] border-black bg-[var(--primary)] font-mono font-normal text-[11px] leading-[15px] tracking-[0.05em] hover:opacity-70 transition whitespace-nowrap">
                Bli samarbeidspartner
              </button>
            </div>
          </div>
        </section>
      }

      {/* Dagen */}
      <section className="mb-[170px] px-4 md:px-0 -mx-4 md:-mx-16">
        <div className="max-w-[1129px] mr-auto">
          <div className="flex flex-col md:flex-row gap-[32px] md:gap-[81px]">

            {/* Dagen - Overskrift og tekst - PATH til tekst nederst i koden */}
            <div className="max-w-[490px] flex flex-col">
              <h2 className="font-heading font-bold text-black m-0 text-center md:text-center text-[32px] sm:text-[40px] md:text-[48px] leading-[1.05]">
                DAGEN@IFI
              </h2>
              <div className="mt-[64px] prose max-w-none font-mono">
                <ReactMarkdown>{dagenInfo}</ReactMarkdown>
              </div>
            </div>

            {/* Dagen - bilde */}
            <div className="order-3 md:order-1 relative w-full md:w-[558px] aspect-square md:h-[558px] shrink-0 border-[0.93px] border-black rounded-[4.66px] overflow-hidden">
              <Image
                src={`${router.basePath}/homepage/dagen.webp`} // <------------- BILDE LINK / PATH FOR DAGEN
                alt=""
                fill
                sizes="(min-width: 768px) 558px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ettermiddagen */}
      <section className="px-4 md:px-0 -mx-4 md:-mx-16">
        <div className="max-w-[1129px] ml-auto">
          <div className="flex flex-col md:flex-row gap-[32px] md:gap-[81px]">
            
            {/* Ettermiddagen - bilde */}
            <div className="order-3 md:order-1 relative w-full md:w-[558px] aspect-square md:h-[558px] shrink-0 border-[0.93px] border-black rounded-[4.66px] overflow-hidden">
              <Image
                src={`${router.basePath}/homepage/ettermiddagen.webp`} // <------------- BILDE LINK / PATH FOR ETTERMIDDAGEN
                alt=""
                fill
                sizes="(min-width: 768px) 558px, 100vw"
                className="object-cover"
              />
            </div>

            {/* Ettermiddagen - Overskrift og tekst - PATH til tekst nederst i koden */}
            <div className="order-1 md:order-2 w-full md:w-[490px] flex flex-col">
              <h2 className="font-heading font-bold text-black m-0 text-center md:text-center text-[32px] sm:text-[40px] md:text-[48px] leading-[1.05]">
                ETTERMIDDAGEN@IFI
              </h2>
              <div className="mt-[64px] prose max-w-none font-mono">
                <ReactMarkdown>{ettermiddagenInfo}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function getStaticProps() {
  const whatIsDagen = getMarkdownContent("hjem/what-is-dagen"); // <------- PATH - infotekst
  const hspInfo = getMarkdownContent("hjem/hsp-info"); // <---------------- PATH - HSP-tekst
  const dagenInfo = getMarkdownContent("hjem/dagen"); // <----------------- PATH - Dagen-tekst
  const ettermiddagenInfo = getMarkdownContent("hjem/ettermiddagen"); // <- PATH - Ettermiddagen-tekst
  return {
    props: {
      whatIsDagen,
      hspInfo,
      dagenInfo,
      ettermiddagenInfo,
    },
  };
}
