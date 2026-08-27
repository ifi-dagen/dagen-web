import { StandMapViewBox } from "./standMapData";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

async function inlineImages(source: SVGSVGElement, clone: SVGSVGElement) {
  const sourceImages = Array.from(source.querySelectorAll("image"));
  const clonedImages = Array.from(clone.querySelectorAll("image"));

  await Promise.all(
    sourceImages.map(async (image, index) => {
      const href = image.getAttribute("href") || image.getAttribute("xlink:href");
      if (!href || href.startsWith("data:")) return;

      const response = await fetch(new URL(href, window.location.href));
      if (!response.ok) {
        throw new Error(`Kunne ikke hente et bilde i standkartet (${response.status}).`);
      }

      const dataUrl = await blobToDataUrl(await response.blob());
      clonedImages[index]?.setAttribute("href", dataUrl);
      clonedImages[index]?.removeAttribute("xlink:href");
    })
  );
}

async function createStandaloneSvg(
  source: SVGSVGElement,
  viewBox: StandMapViewBox
): Promise<SVGSVGElement> {
  const clone = source.cloneNode(true) as SVGSVGElement;
  await inlineImages(source, clone);

  clone.querySelectorAll('[role="button"]').forEach((element) => element.remove());
  clone.setAttribute("xmlns", SVG_NAMESPACE);
  clone.setAttribute("viewBox", `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`);
  clone.setAttribute("width", String(viewBox.width));
  clone.setAttribute("height", String(viewBox.height));
  clone.setAttribute("preserveAspectRatio", "xMidYMid meet");
  clone.removeAttribute("class");

  const rootStyles = getComputedStyle(document.documentElement);
  const style = document.createElementNS(SVG_NAMESPACE, "style");
  style.textContent = `
    svg {
      --primary: ${rootStyles.getPropertyValue("--primary").trim() || "#D0EEF3"};
      --dagen-color: ${rootStyles.getPropertyValue("--dagen-color").trim() || "#008080"};
      --white: ${rootStyles.getPropertyValue("--white").trim() || "#FFFFFF"};
      --font-heading: "IBM Plex Mono", "Roboto Mono", monospace;
      --font-sans: "Inter", Arial, sans-serif;
    }
    text { text-rendering: geometricPrecision; }
  `;

  const background = document.createElementNS(SVG_NAMESPACE, "rect");
  background.setAttribute("x", String(viewBox.x));
  background.setAttribute("y", String(viewBox.y));
  background.setAttribute("width", String(viewBox.width));
  background.setAttribute("height", String(viewBox.height));
  background.setAttribute("fill", "#FFFFFF");

  clone.prepend(background);
  clone.prepend(style);
  return clone;
}

function serializeSvg(svg: SVGSVGElement) {
  return new XMLSerializer().serializeToString(svg);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

export async function downloadStandMapSvg(
  source: SVGSVGElement,
  viewBox: StandMapViewBox,
  filename: string
) {
  const svg = await createStandaloneSvg(source, viewBox);
  const content = `<?xml version="1.0" encoding="UTF-8"?>\n${serializeSvg(svg)}`;
  downloadBlob(new Blob([content], { type: "image/svg+xml;charset=utf-8" }), filename);
}

export async function downloadStandMapPng(
  source: SVGSVGElement,
  viewBox: StandMapViewBox,
  filename: string
) {
  const svg = await createStandaloneSvg(source, viewBox);
  const blob = new Blob([serializeSvg(svg)], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const image = new Image();

  try {
    image.src = url;
    await image.decode();

    const scale = Math.min(2, 6_000 / viewBox.width, 6_000 / viewBox.height);
    const width = Math.round(viewBox.width * scale);
    const height = Math.round(viewBox.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Nettleseren kunne ikke lage PNG-filen.");

    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    const png = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => result ? resolve(result) : reject(new Error("PNG-filen ble tom.")),
        "image/png"
      );
    });
    downloadBlob(png, filename);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function svgForSlice(svgMarkup: string, viewBox: StandMapViewBox) {
  const document = new DOMParser().parseFromString(svgMarkup, "image/svg+xml");
  const svg = document.documentElement;
  svg.setAttribute("viewBox", `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`);
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  return new XMLSerializer().serializeToString(svg);
}

export async function printStandMapOnThreeA3Pages(
  source: SVGSVGElement,
  viewBox: StandMapViewBox,
  eventLabel: string
) {
  // Open synchronously so browsers do not treat the print preview as a popup.
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    throw new Error("Tillat sprettoppvinduer for å åpne utskriftsvisningen.");
  }

  printWindow.document.write("<!doctype html><title>Forbereder utskrift …</title><p>Forbereder standkartet …</p>");
  printWindow.document.close();

  try {
    const standalone = await createStandaloneSvg(source, viewBox);
    const markup = serializeSvg(standalone);
    const overlap = viewBox.width * 0.012;
    const baseSliceWidth = viewBox.width / 3;
    const slices = Array.from({ length: 3 }, (_, index) => {
      const leftOverlap = index === 0 ? 0 : overlap;
      const rightOverlap = index === 2 ? 0 : overlap;
      return {
        x: viewBox.x + index * baseSliceWidth - leftOverlap,
        y: viewBox.y,
        width: baseSliceWidth + leftOverlap + rightOverlap,
        height: viewBox.height,
      };
    });
    const safeLabel = escapeHtml(eventLabel);
    const pages = slices.map((slice, index) => `
      <section class="page">
        <header>
          <strong>STANDKART</strong>
          <span>${safeLabel}</span>
          <small>Ark ${index + 1} av 3</small>
        </header>
        <div class="map">${svgForSlice(markup, slice)}</div>
        <footer>${index < 2 ? "Inkluderer litt overlapp mot neste ark" : "Heng arkene fra venstre mot høyre"}</footer>
      </section>
    `).join("");

    printWindow.document.open();
    printWindow.document.write(`<!doctype html>
      <html lang="no">
        <head>
          <meta charset="utf-8">
          <title>${safeLabel} – standkart – 3 x A3</title>
          <style>
            @page { size: A3 portrait; margin: 10mm; }
            * { box-sizing: border-box; }
            html, body { margin: 0; padding: 0; background: #fff; color: #008080; }
            body { font-family: Inter, Arial, sans-serif; }
            .page {
              width: 277mm;
              height: 400mm;
              display: flex;
              flex-direction: column;
              overflow: hidden;
              break-after: page;
              page-break-after: always;
            }
            .page:last-child { break-after: auto; page-break-after: auto; }
            header {
              min-height: 19mm;
              display: grid;
              grid-template-columns: 1fr auto;
              align-items: end;
              border-bottom: 0.6mm solid #008080;
              padding: 0 1mm 3mm;
            }
            header strong { font: 700 24pt "IBM Plex Mono", monospace; letter-spacing: .08em; }
            header span { grid-column: 1; font-size: 11pt; margin-top: 1mm; }
            header small { grid-column: 2; grid-row: 1 / span 2; align-self: center; font-size: 10pt; }
            .map { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; }
            .map svg { display: block; width: 100%; height: 100%; }
            footer { height: 8mm; padding-top: 2mm; border-top: .25mm solid #008080; font-size: 8pt; }
            @media print {
              html, body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>${pages}<script>window.setTimeout(() => window.print(), 350)<\/script></body>
      </html>`);
    printWindow.document.close();
  } catch (error) {
    printWindow.close();
    throw error;
  }
}
