import { getMarkdownContent } from "@/lib/getMarkdownContent";
import type { ApplyLinks } from "@/types/domain";

const toLinkOrNull = (s: string) => {
  const v = s.trim();
  return v.length > 0 ? v : null;
};

export function getApplyLinks(): ApplyLinks {
  return {
    funk: toLinkOrNull(getMarkdownContent("bli-med/apply-links/apply_funk")),
    intern: toLinkOrNull(getMarkdownContent("bli-med/apply-links/apply_intern")),
  };
}
