import { Roboto_Mono, IBM_Plex_Mono } from "next/font/google";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto-mono",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  const { basePath } = useRouter();

  return (
    <div className={`${robotoMono.variable} ${ibmPlexMono.variable} min-h-screen relative`}>
      <div
        className="page-background"
        style={
          {
            ["--bg-url" as any]: `url('${basePath}/web-design/background.png')`,
          } as React.CSSProperties
        }
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="grow">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
