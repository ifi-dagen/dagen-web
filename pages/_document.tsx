import { Html, Head, Main, NextScript } from "next/document";

const isProd = process.env.NODE_ENV === "production";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "dagen-web";
const basePath = isProd ? `/${repo}` : "";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href={`${basePath}/web-design/dagen-logo/dagen_at.svg`} />
      </Head>
      <body style={{ ["--base-path" as any]: basePath }} className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
