export interface Deal {
  id: string;
  title: string;
  badge: string;
  description: string;
  finePrint: string;
}

export const deals: Deal[] = [
  {
    id: "first-time-1",
    title: "1st Visit: 20% OFF",
    badge: "20% OFF",
    description: "Get 20% off your entire first medical order on flower, cartridges, and edibles.",
    finePrint: "Valid for first-time OMMA card holders only. Cannot combine with other specials."
  },
  {
    id: "first-time-2",
    title: "2nd Visit: 25% OFF",
    badge: "25% OFF",
    description: "Return for your second visit and receive 25% off your entire purchase.",
    finePrint: "Must be used on your second consecutive visit. Excludes select head shop glass items."
  },
  {
    id: "first-time-3",
    title: "3rd Visit: 30% OFF",
    badge: "30% OFF",
    description: "Complete the trilogy! Get 30% off your entire third order.",
    finePrint: "Must be used on your third consecutive visit. Some brand exclusions apply."
  },
  {
    id: "veteran",
    title: "Military Appreciation",
    badge: "10% OFF EVERYDAY",
    description: "Active duty and veteran patients receive 10% off as part of our appreciation discount.",
    finePrint: "Must present qualifying ID and an active OMMA patient license at checkout."
  },
  {
    id: "review-promo",
    title: "Leave a Review, Get a Pre-Roll",
    badge: "FREE PRE-ROLL",
    description: "Show our budtenders your live review on Google or Weedmaps and receive a high-quality free pre-roll.",
    finePrint: "Limit one per patient. Review must be live and shown at checkout."
  }
];

