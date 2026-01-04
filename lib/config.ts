export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/dagen-ifi/",
  facebook: "https://facebook.com/dagenatifi",
  instagram: "https://instagram.com/dagenatifi"
} as const;

export const CONTACT_INFO = {
  address: "Gaustadalléen 23B",
  postalCode: "0373 Oslo",
  organizationName: "IFI-DAGEN"
} as const;

export const SITE_CONFIG = {
  title: "dagen@ifi",
  description: "Institutt for informatikks karrieredager"
} as const;

export const LINK_MAP: Record<string, string> = {
  Hjem: "/",
  Bedrift: "/bedrift",
  BliMed: "/bli_med",
  Stillingsannonser: "/stillingsannonser",
  Kontakt: "kontakt",
}