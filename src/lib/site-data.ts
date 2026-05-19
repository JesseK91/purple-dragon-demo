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
    description: "Get 20% off your entire first visit, plus a Budtender's Choice pre-roll.",
    finePrint: "Valid for first-time OMMA card holders only. Cannot combine with other specials."
  },
  {
    id: "first-time-2",
    title: "2nd Visit: 25% OFF",
    badge: "25% OFF",
    description: "Return for your second visit and receive 25% off your entire purchase.",
    finePrint: "Must be used on your second consecutive visit. Discounts do not stack."
  },
  {
    id: "first-time-3",
    title: "3rd Visit: 30% OFF",
    badge: "30% OFF",
    description: "Complete the trilogy! Get 30% off your entire third order.",
    finePrint: "Must be used on your third consecutive visit. Discounts do not stack."
  },
  {
    id: "veteran",
    title: "Military Appreciation",
    badge: "10% OFF",
    description: "Military patients receive 10% off with valid ID.",
    finePrint: "Check current in-store policy for qualifying ID requirements."
  },
  {
    id: "happy-hour",
    title: "Happy Hour",
    badge: "15% OFF",
    description: "15% off the entire store during Happy Hour from 9AM-1PM and 9PM-10PM.",
    finePrint: "Discounts do not stack. Check current days and active hours in store."
  },
  {
    id: "review-promo",
    title: "Leave a Review, Get a Pre-Roll",
    badge: "FREE PRE-ROLL",
    description: "Show your live Google or Weedmaps review at checkout and receive a free pre-roll.",
    finePrint: "Limit one per patient. Review must be live at checkout."
  }
];
