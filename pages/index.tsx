// Forsiden (hjem)

import ReactMarkdown from "react-markdown";
import { getMarkdownContent } from "@/lib/getFileContent";
import Image from "next/image";
import { useRouter } from "next/router";
import { buttonClasses } from "@/components/buttons/buttonStyles";
import rightArrow from "@/components/icons/rightArrow.svg";
import Link from "next/link";

type HomePageProps = {
  whatIsDagen: string;
  hspInfo: string;
  dagenInfo: string;
  ettermiddagenInfo: string;
  thisYear: string;
};

export default function Home({ whatIsDagen, hspInfo, dagenInfo, ettermiddagenInfo, thisYear }: HomePageProps) {
  const router = useRouter();
  return (
    <main
      className={[
        "w-full max-w-[1253px] mx-auto",
        "px-[clamp(1rem,2vw,1.5rem)] pt-32 pb-[clamp(4rem,10vw,300px)]",
        "text-text-color",
      ].join(" ")}
    >

      {/* Hva er Dagen - infotekst - PATH til tekst nederst i koden */}
      <section
        className="mb-32">
        <div
          className="w-fit max-w-[1107px] mx-auto prose">
          <ReactMarkdown>{whatIsDagen}</ReactMarkdown>
        </div>
      </section>

      {/* HSP, skjult hvis markdownfilen er tom */}
      {hspInfo && (
        <section
          className="mb-[clamp(1rem,10vw,170px)]">
          <div
            className={[
              "w-full mx-auto md:max-3xl lg:max-w-6xl min-h-[clamp(22rem,50vw,557px)]",
              "px-8 py-8",
              "border border-card-outline rounded-sm",
              "flex flex-col",
            ].join(" ")}
          >
            <div
              className={[
                "mb-[clamp(2rem,6vw,3rem)]",
                "flex flex-col items-center text-center md:flex-row md:justify-center gap-[clamp(2rem,6vw,4rem)]",
              ].join(" ")}
            >
              {/* Logo: under tittel på mobil, venstre på desktop */}
              <div
                className={[
                  "order-2 md:order-1 relative w-32 h-32 shrink-0",
                  "ml-2 mt-6 md:mt-0",
                ].join(" ")}
              >
                <Image
                  src={`${router.basePath}/homepage/hsp_logo.png`} // <------------- BILDE LINK / PATH FOR HPS-LOGO
                  alt=""
                  fill
                  sizes="128px"
                />
              </div>

              {/* Tittel */}
              <h2
                className={[
                  "order-1 md:order-2 m-0",
                  "text-[clamp(32px,5vw,48px)] leading-none",
                  "font-heading font-bold text-text-color",
                ].join(" ")}
              >
                <span className="md:hidden">
                  HOVEDSPONSOR
                  <br />
                  {thisYear}
                </span>
                <span className="hidden md:inline">HOVEDSPONSOR {thisYear}</span>
              </h2>
            </div>

            {/* HSP - infotekst --- PATH nederst i koden */}
            <div
              className="max-w-none flex-1 prose">
              <ReactMarkdown>{hspInfo}</ReactMarkdown>
            </div>

            <div
              className={[
                "mt-auto pt-6",
                "flex flex-col lg:flex-row lg:justify-end gap-[clamp(1rem,2vw,1.5rem)]",
              ].join(" ")}
            >
              <button
                className={buttonClasses(
                  [
                    "h-16 md:min-w-80",
                    "px-5 py-3 gap-10",
                    "rounded-full",
                    "text-sm md:text-lg leading-8",
                    "font-normal transition",
                  ].join(" "),
                )}
              >
                Bli hovedsponsor {thisYear + 1}
                <Image src={rightArrow} alt="" width={12} height={12} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Dagen */}
      <section className={[
        "mb-[clamp(5rem,10vw,170px)] px-4 -mx-4 lg:px-0",
        "lg:mx-0 xl:-mx-16 overflow-x-clip",
      ].join(" ")}
      >
        <div
          className="max-w-[1129px] mr-auto">
          <div
            className={[
              "gap-[clamp(2rem,6vw,81px)]",
              "flex flex-col lg:flex-row",
            ].join(" ")}
          >
            {/* Dagen - Overskrift og tekst - PATH til tekst nederst i koden */}
            <div
              className="w-full lg:max-w-[490px] items-center flex flex-col">
              <h2
                className={[
                  "m-0 text-center",
                  "text-[clamp(32px,5vw,48px)] leading-[1.05]",
                  "font-heading font-bold uppercase",
                ].join(" ")}
              >
                DAGEN@IFI
              </h2>

              <div
                className={[
                  "w-full lg:max-w-[433px]",
                  "mt-[clamp(2.5rem,6vw,4rem)]",
                  "prose",
                ].join(" ")}
              >
                <ReactMarkdown>{dagenInfo}</ReactMarkdown>
              </div>

              <div
                className={[
                  "w-full lg:max-w-[490px]",
                  "mt-[clamp(1.5rem,4vw,2.5rem)]",
                  "flex flex-col items-center sm:flex-row",
                  "sm:items-stretch sm:justify-center",
                  "gap-[clamp(0.5rem,2vw,0.875rem)]",
                ].join(" ")}
              >
                <Link className={buttonClasses("w-full max-w-[187px]")} href={"/bli-med/#funk"}>
                  Bli funk!
                  <Image src={rightArrow} alt="" width={12} height={12} />
                </Link>
                <Link className={buttonClasses("w-full max-w-[232px]")} href={"/bedrift/#stand"}>
                  Stå på stand
                  <Image src={rightArrow} alt="" width={12} height={12} />
                </Link>
              </div>
            </div>

            {/* Dagen - bilde */}
            <div
              className={[
                "order-3 lg:order-1 relative w-full lg:w-[min(558px,50vw)] aspect-square shrink-0",
                "rounded-[4.66px] overflow-hidden",
              ].join(" ")}
            >
              <Image
                src={`${router.basePath}/homepage/dagen.webp`} // <------------- BILDE LINK / PATH FOR DAGEN
                alt=""
                fill
                sizes="(min-width: 1024px) 558px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ettermiddagen */}
      <section className="px-4 -mx-4 lg:px-0 lg:mx-0 xl:-mx-16 overflow-x-clip">
        <div
          className="max-w-[1129px] ml-auto">
          <div
            className={[
              "gap-[clamp(2rem,6vw,81px)]",
              "flex flex-col lg:flex-row",
            ].join(" ")}
          >
            {/* Ettermiddagen - bilde */}
            <div
              className={[
                "order-3 lg:order-1 relative w-full lg:w-[558px] aspect-square shrink-0",
                "rounded-[4.66px] overflow-hidden",
              ].join(" ")}
            >
              <Image
                src={`${router.basePath}/homepage/ettermiddagen.webp`} // <------------- BILDE LINK / PATH FOR ETTERMIDDAGEN
                alt=""
                fill
                sizes="(min-width: 1024px) 558px, 100vw"
                className="object-cover"
              />
            </div>

            {/* Ettermiddagen - Overskrift og tekst - PATH til tekst nederst i koden */}
            <div
              className={[
                "order-1 lg:order-2 w-full min-w-0 lg:max-w-[433px]",
                "flex flex-col items-center lg:items-start",
              ].join(" ")}
            >
              <h2
                className={[
                  "m-0 text-center",
                  "w-full wrap-break-word",
                  "text-[clamp(32px,5vw,42px)] leading-[1.05]",
                  "prose font-bold uppercase",
                ].join(" ")}
              >
                ETTERMIDDAGEN@IFI
              </h2>

              <div
                className={[
                  "w-full min-w-0 lg:max-w-[433px]",
                  "mt-[clamp(2.5rem,6vw,4rem)]",
                  "prose text-left",
                  "wrap-break-word",
                ].join(" ")}
              >
                <ReactMarkdown>{ettermiddagenInfo}</ReactMarkdown>
              </div>

              <div
                className="mt-[clamp(1.5rem,4vw,2.5rem)]">
                <Link className={buttonClasses("w-full max-w-[232px]")} href={"/bedrift/#stand"}>
                  Stå på stand
                  <Image src={rightArrow} alt="" width={12} height={12} />
                </Link>
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

  const thisYear = new Date().getFullYear();

  return {
    props: {
      whatIsDagen,
      hspInfo,
      dagenInfo,
      ettermiddagenInfo,
      thisYear,
    },
  };
}
