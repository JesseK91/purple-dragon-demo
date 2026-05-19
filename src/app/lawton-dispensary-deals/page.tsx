import type { Metadata } from "next";
import { seoPages } from "@/lib/seo-pages";
import SEOFunnelPage from "@/components/SEOFunnelPage";

const pageKey = "lawton-dispensary-deals";
const pageData = seoPages[pageKey];

export const metadata: Metadata = {
  title: pageData.title,
  description: pageData.description,
};

export default function LawtonDispensaryDeals() {
  return <SEOFunnelPage data={pageData} />;
}
