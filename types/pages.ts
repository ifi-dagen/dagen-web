import type { CardData, ApplyLinks } from "./domain";

export type BliMedPageProps = {
  bliMedInfo: string;
  funkInfo: string;
  funkExtended: string;
  internInfo: string;
  internExtended: string;
  styretInfo: string;
  styretExtended: string;
  internCards: CardData[];
  styretCards: CardData[];
  applyLinks: ApplyLinks;
};