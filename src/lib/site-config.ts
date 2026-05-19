export interface SiteConfig {
  storeName: string;
  address: string;
  phone: string;
  googleMapsUrl: string;
  weedmapsMenuUrl: string;
  dutchieMenuUrl: string;
  janeMenuUrl: string;
  activeMenuProvider: "weedmaps" | "dutchie" | "jane";
  googleReviewUrl: string;
  ommaLicense: string;
}

export type MenuProvider = "weedmaps" | "dutchie" | "jane";

export const siteConfig: SiteConfig = {
  storeName: "The Purple Dragon",
  address: "1314 W Gore Blvd, Lawton, OK 73501",
  phone: "+1 (580) 699-7474",
  googleMapsUrl: "https://maps.google.com/?q=The+Purple+Dragon+1314+W+Gore+Blvd+Lawton+OK+73501",
  weedmapsMenuUrl: "https://weedmaps.com/dispensaries/the-purple-dragon",
  dutchieMenuUrl: "",
  janeMenuUrl: "", 
  activeMenuProvider: "weedmaps",
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJT4N2-cO0NogRsz4e2iY-h2A",
  ommaLicense: "OMMA-DISP-36192"
};

export function resolveMenuUrl(provider: MenuProvider, config: SiteConfig = siteConfig): string | null {
  const candidate =
    provider === "weedmaps"
      ? config.weedmapsMenuUrl
      : provider === "dutchie"
        ? config.dutchieMenuUrl
        : config.janeMenuUrl;
  const normalized = candidate?.trim();
  return normalized ? normalized : null;
}

export function resolveActiveMenuUrl(config: SiteConfig = siteConfig): string | null {
  return resolveMenuUrl(config.activeMenuProvider, config);
}
