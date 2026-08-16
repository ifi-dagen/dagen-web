import { CSSProperties, useRef, useState } from "react";

const MIN_ZOOM = 0.75;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.25;
const BASE_MIN_WIDTH = 1100;

export function useStandMapZoom() {
  const [zoom, setZoom] = useState(1);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const applyZoom = (nextZoom: number) => {
    const scroller = scrollerRef.current;
    const visibleCenter = scroller
      ? (scroller.scrollLeft + scroller.clientWidth / 2) / scroller.scrollWidth
      : 0.5;

    setZoom(nextZoom);

    requestAnimationFrame(() => {
      if (!scroller) return;
      scroller.scrollLeft =
        visibleCenter * scroller.scrollWidth - scroller.clientWidth / 2;
    });
  };

  const zoomIn = () => applyZoom(Math.min(MAX_ZOOM, zoom + ZOOM_STEP));
  const zoomOut = () => applyZoom(Math.max(MIN_ZOOM, zoom - ZOOM_STEP));

  const contentStyle: CSSProperties = {
    width: `${zoom * 100}%`,
    minWidth: BASE_MIN_WIDTH * zoom,
    marginInline: "auto",
  };

  return {
    zoom,
    zoomIn,
    zoomOut,
    canZoomIn: zoom < MAX_ZOOM,
    canZoomOut: zoom > MIN_ZOOM,
    contentStyle,
    scrollerRef,
  };
}
