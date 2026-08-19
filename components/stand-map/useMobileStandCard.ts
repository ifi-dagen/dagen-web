import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { StandDefinition } from "./standMapData";

export function useMobileStandCard(
  pinnedId: string | null,
  activeStand?: StandDefinition
) {
  const [overflow, setOverflow] = useState(0);
  const mapAreaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mapArea = mapAreaRef.current;
    const card = cardRef.current;

    if (!pinnedId || !activeStand || !mapArea || !card) return;

    const updateOverflow = () => {
      if (!window.matchMedia("(max-width: 767px)").matches) {
        setOverflow(0);
        return;
      }

      const nextOverflow = Math.max(
        0,
        Math.ceil(card.offsetTop + card.offsetHeight - mapArea.clientHeight + 12)
      );
      setOverflow((current) =>
        current === nextOverflow ? current : nextOverflow
      );
    };

    const animationFrame = requestAnimationFrame(updateOverflow);
    const resizeObserver = new ResizeObserver(updateOverflow);
    resizeObserver.observe(mapArea);
    resizeObserver.observe(card);
    window.addEventListener("resize", updateOverflow);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateOverflow);
    };
  }, [activeStand, pinnedId]);

  useEffect(() => {
    if (!pinnedId) return;

    const animationFrame = requestAnimationFrame(() => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        cardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [overflow, pinnedId]);

  return {
    cardRef,
    mapAreaRef,
    paddingBottom: pinnedId ? overflow : 0,
  };
}
