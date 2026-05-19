import type { Metadata } from "next";
import { seoPages } from "@/lib/seo-pages";
import SEOFunnelPage from "@/components/SEOFunnelPage";

const pageKey = "flower-deals-lawton";
const pageData = seoPages[pageKey];

export const metadata: Metadata = {
  title: pageData.title,
  description: pageData.description,
};

export default function FlowerDealsLawton() {
  return <SEOFunnelPage data={pageData} />;
}
