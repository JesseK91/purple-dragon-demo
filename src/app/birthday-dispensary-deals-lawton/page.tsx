import type { Metadata } from "next";
import { seoPages } from "@/lib/seo-pages";
import SEOFunnelPage from "@/components/SEOFunnelPage";

const pageKey = "birthday-dispensary-deals-lawton";
const pageData = seoPages[pageKey];

export const metadata: Metadata = {
  title: pageData.title,
  description: pageData.description,
};

export default function BirthdayDispensaryDealsLawton() {
  return <SEOFunnelPage data={pageData} />;
}
