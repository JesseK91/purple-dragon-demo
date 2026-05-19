import type { Metadata } from "next";
import { seoPages } from "@/lib/seo-pages";
import SEOFunnelPage from "@/components/SEOFunnelPage";

const pageKey = "fort-sill-dispensary";
const pageData = seoPages[pageKey];

export const metadata: Metadata = {
  title: pageData.title,
  description: pageData.description,
};

export default function FortSillDispensary() {
  return <SEOFunnelPage data={pageData} />;
}
