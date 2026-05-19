import { siteConfig } from "@/lib/site-config";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dispensary",
    "@id": "https://purple-dragon-demo.pages.dev/#dispensary",
    "name": `${siteConfig.storeName} Dispensary`,
    "alternateName": ["The Purple Dragon Dispensary", "The Purple Dragon Lawton", "Purple Dragon Lawton"],
    "image": "https://purple-dragon-demo.pages.dev/purple-dragon-mascot.png",
    "url": "https://purple-dragon-demo.pages.dev",
    "telephone": siteConfig.phone,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address,
      "addressLocality": "Lawton",
      "addressRegion": "OK",
      "postalCode": "73501",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.606707,
      "longitude": -98.421409
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "12:00",
        "closes": "20:00"
      }
    ],
    "sameAs": [
      siteConfig.weedmapsMenuUrl,
      "https://www.google.com/maps?cid=YOUR_CID_IF_AVAILABLE"
    ],
    "description": "Medical cannabis dispensary in Lawton, Oklahoma offering flower, concentrates, gummies, vapes, head shop accessories, coffee bar service, loyalty points, first-time patient specials, military savings, and curbside pickup for licensed Oklahoma patients.",
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Lawton"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Medical Cannabis Menu",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Flower",
          "description": "Medical cannabis flower, house strains, and fresh drops."
        },
        {
          "@type": "OfferCatalog",
          "name": "Concentrates",
          "description": "Rosin, hash, badder, wax, and related concentrate options."
        },
        {
          "@type": "OfferCatalog",
          "name": "Edibles",
          "description": "Gummies, bites, chocolates, and other edible products."
        },
        {
          "@type": "OfferCatalog",
          "name": "Vapes",
          "description": "Cartridges, vape pods, disposables, and hardware."
        },
        {
          "@type": "OfferCatalog",
          "name": "Glass & Accessories",
          "description": "Bongs, pipes, grinders, and other smoke shop accessories."
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
