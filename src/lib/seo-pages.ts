export interface SEOPageData {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  primaryCta: string;
  sourceTag: string;
  defaultInterest: string;
  heroBadge: string;
  sections: { title: string; content: string; highlight?: string }[];
  faqs: { question: string; answer: string }[];
  relatedPages: { title: string; slug: string }[];
}

export const seoPages: Record<string, SEOPageData> = {
  "lawton-dispensary-deals": {
    slug: "lawton-dispensary-deals",
    title: "Lawton Dispensary Deals & Medical Marijuana Specials | The Purple Dragon",
    description:
      "Save at The Purple Dragon on Gore Blvd. Featured specials include 20% off your 1st visit, 25% off your 2nd visit, and 30% off your 3rd visit, plus 10% everyday Military discount.",
    h1: "Lawton Medical Marijuana Deals & Daily Specials",
    intro:
      "Welcome to the home of Lawton's best patient specials. From our signature 20%, 25%, and 30% first-visit discounts to everyday military savings and free pre-rolls for review feedback, we keep the rules transparent and the savings direct.",
    primaryCta: "Get Today's Deals by Text",
    sourceTag: "source_lawton_deals_page",
    defaultInterest: "Budget Deals",
    heroBadge: "LAWTON DEALS",
    sections: [
      {
        title: "Today's Specials",
        content:
          "Our core promotions are built around the patient. New to the store? Claim our three-tiered welcome: 20% off your first visit, 25% off your second, and 30% off your third. We also offer 10% off everyday for military veterans, and a free pre-roll when you leave us a review.",
        highlight:
          "Bring an active OMMA patient license and photo ID. Final pricing and availability are confirmed in store."
      },
      {
        title: "Deal Alerts Without the Hunt",
        content:
          "Marketplace menus are useful, but they are not always the easiest way to catch a quick special. Join our SMS list to get direct notifications about fresh flower drops, cart specials, and exclusive double-point loyalty days."
      }
    ],
    faqs: [
      {
        question: "Do you have a first-time patient deal?",
        answer:
          "Yes! We offer a tiered sequence: 20% off your 1st visit, 25% off your 2nd visit, and 30% off your 3rd visit on all medical cannabis purchases."
      },
      {
        question: "Do you offer military or senior citizen discounts?",
        answer:
          "Yes, active military and retired veterans receive 10% off their order everyday. Valid ID and OMMA license required."
      },
      {
        question: "How do I get a free pre-roll?",
        answer:
          "Leave a Google or Weedmaps review of your visit, show it to your budtender at checkout, and receive a free high-quality pre-roll (limit 1 per patient)."
      }
    ],
    relatedPages: [
      { title: "First-Time Patients", slug: "first-time-patients" },
      { title: "Flower Deals", slug: "flower-deals-lawton" },
      { title: "Near Fort Sill", slug: "fort-sill-dispensary" }
    ]
  },
  "birthday-dispensary-deals-lawton": {
    slug: "birthday-dispensary-deals-lawton",
    title: "Birthday Dispensary Deals in Lawton, OK | The Purple Dragon",
    description:
      "Looking for birthday dispensary deals in Lawton? Join The Purple Dragon text alerts for birthday reminders, fresh drops, and weekly medical marijuana specials.",
    h1: "Birthday Medical Marijuana Deals in Lawton",
    intro:
      "Birthday week is a good excuse to check the menu. Join the birthday list and we will keep the reminder simple: what to bring, what is available, and how to find the current deal.",
    primaryCta: "Text Me Birthday Deals",
    sourceTag: "source_birthday_deals_page",
    defaultInterest: "Birthday Deals",
    heroBadge: "BIRTHDAY DEALS",
    sections: [
      {
        title: "Birthday Specials for OMMA Patients",
        content:
          "If there is a birthday offer running, this is where it should live. No mystery language, no fake scarcity. Bring your ID, bring your OMMA card, and ask the team what birthday options are active that week.",
        highlight:
          "Birthday offers may change by week and may not combine with every other special."
      },
      {
        title: "Get the Reminder Before You Forget",
        content:
          "A lot of people remember their birthday deal after the day has already passed. Text reminders fix that. Sign up once, choose the categories you care about, and get the birthday note when it is actually useful."
      }
    ],
    faqs: [
      {
        question: "Do Lawton dispensaries offer birthday deals?",
        answer:
          "Some do, and the details vary by store. The Purple Dragon can use this page to keep birthday terms clear instead of burying them in a social post."
      },
      {
        question: "What should I bring to claim a birthday special?",
        answer:
          "Bring your active OMMA patient license and a government-issued photo ID that shows your birthday."
      },
      {
        question: "Can birthday deals stack with other discounts?",
        answer:
          "Usually not. If multiple specials are available, staff can help identify the best eligible option at checkout."
      }
    ],
    relatedPages: [
      { title: "Lawton Deals", slug: "lawton-dispensary-deals" },
      { title: "First-Time Patients", slug: "first-time-patients" },
      { title: "Join Text Deals", slug: "join" }
    ]
  },
  "flower-deals-lawton": {
    slug: "flower-deals-lawton",
    title: "Flower Deals in Lawton, OK | The Purple Dragon",
    description:
      "Find Lawton flower deals, fresh drops, budget flower, and weekly medical marijuana specials from The Purple Dragon.",
    h1: "Lawton Flower Deals & Fresh Drops",
    intro:
      "If you mostly shop flower, you do not want to dig through a whole menu every day. This page keeps the flower lane separate: fresh drops, value eighths, ounce specials when available, and quick links to the full menu.",
    primaryCta: "Get Flower Deals by Text",
    sourceTag: "source_flower_deals_page",
    defaultInterest: "Flower",
    heroBadge: "FLOWER ALERTS",
    sections: [
      {
        title: "Fresh Flower, When It Is Actually Fresh",
        content:
          "Good flower shoppers ask different questions: how fresh is it, what size is available, what is the price tier, and is it still on the shelf? The final menu should answer those questions plainly without dressing every strain up like a luxury product.",
        highlight:
          "THC, terpene, and batch details can vary. Check current labels or ask staff for the latest product information."
      },
      {
        title: "Budget and Better-Shelf Options",
        content:
          "Some patients want the best value. Some want the prettier eighth. Most want to know what is worth the trip today. Flower alerts can separate budget deals, better-shelf drops, and fresh restocks so people are not guessing."
      }
    ],
    faqs: [
      {
        question: "Are flower deals updated weekly?",
        answer:
          "They should be updated whenever the store changes specials or receives a meaningful restock. Freshness matters more than stale SEO copy."
      },
      {
        question: "Can I get flower deals by text?",
        answer:
          "Yes. Choose Flower as your interest when signing up and future alerts can be tagged around flower specials and fresh drops."
      },
      {
        question: "Are THC values exact?",
        answer:
          "No. Values vary by batch and label. Use the live menu and in-store product information for current details."
      }
    ],
    relatedPages: [
      { title: "Daily Deals", slug: "lawton-dispensary-deals" },
      { title: "Near Fort Sill", slug: "fort-sill-dispensary" },
      { title: "Join Text Deals", slug: "join" }
    ]
  },
  "first-time-patients": {
    slug: "first-time-patients",
    title: "First-Time Medical Marijuana Patients in Lawton | The Purple Dragon",
    description:
      "First time visiting The Purple Dragon? Claim our first-time patient deals: 20% off your 1st visit, 25% off your 2nd visit, and 30% off your 3rd visit on Gore Blvd.",
    h1: "First-Time Patient Welcome Rewards: 20%, 25%, & 30% Off",
    intro:
      "Welcome to The Purple Dragon. To make your first visits memorable, we offer a three-tiered welcome reward sequence: 20% off your entire first visit, 25% off your second visit, and 30% off your third consecutive visit.",
    primaryCta: "Claim Your 20% First-Visit Deal",
    sourceTag: "source_first_time_patients_page",
    defaultInterest: "First-Time Offers",
    heroBadge: "FIRST VISIT",
    sections: [
      {
        title: "Three-Tiered Welcome Specials",
        content:
          "Unlike generic stores, we reward your loyalty over multiple visits. On your first visit, get 20% off everything. When you return for your second visit, enjoy 25% off. On your third visit, complete the sequence with 30% off your entire order.",
        highlight:
          "Available for all active OMMA cardholders on their first three visits. Cannot stack with other daily discounts."
      },
      {
        title: "What to Bring",
        content:
          "You need an active OMMA patient license and a government-issued photo ID. That is the part that matters most. If either one is missing or expired, the store cannot complete a medical cannabis sale.",
        highlight:
          "Check your OMMA card before you leave home. It saves an annoying second trip."
      },
      {
        title: "How Curbside Works",
        content:
          "Check the menu, choose what you want, and follow the store's current pickup process. When you arrive on Gore Blvd, staff will verify your license and ID before completing the order. Simple, but still regulated."
      }
    ],
    faqs: [
      {
        question: "What are the first-time patient deals at The Purple Dragon?",
        answer:
          "We offer a three-tiered discount structure for new patients: 20% off your 1st visit, 25% off your 2nd visit, and 30% off your 3rd visit."
      },
      {
        question: "Can I use the first-time discount on any products?",
        answer:
          "Yes, the discounts apply to your entire order, including premium flower, cartridges, and edibles. Exclusions may apply to select handcrafted local glass items."
      },
      {
        question: "What do I need to bring to claim a deal?",
        answer:
          "Bring your active OMMA Medical Marijuana Patient License and a government-issued photo ID."
      }
    ],
    relatedPages: [
      { title: "Lawton Deals", slug: "lawton-dispensary-deals" },
      { title: "Near Fort Sill", slug: "fort-sill-dispensary" },
      { title: "Join Text Deals", slug: "join" }
    ]
  },
  "fort-sill-dispensary": {
    slug: "fort-sill-dispensary",
    title: "Medical Marijuana Dispensary Near Fort Sill | The Purple Dragon Lawton",
    description:
      "Looking for a medical marijuana dispensary near Fort Sill? The Purple Dragon serves Lawton OMMA patients with deals, fresh drops, curbside pickup, and menu access.",
    h1: "Medical Marijuana Dispensary Near Fort Sill",
    intro:
      "The Purple Dragon is on W Gore Blvd in Lawton, a practical stop for licensed Oklahoma patients coming from the Fort Sill side of town. Check the menu first, then get directions when you are ready.",
    primaryCta: "Get Directions",
    sourceTag: "source_fort_sill_page",
    defaultInterest: "Veteran Specials",
    heroBadge: "FORT SILL AREA",
    sections: [
      {
        title: "A Lawton Stop Near Fort Sill",
        content:
          "This page is for local context, not a shortcut around the rules. The Purple Dragon serves licensed OMMA patients in Lawton. If you are near Fort Sill, use this page to check current deals, menu access, directions, and pickup information before making the drive.",
        highlight:
          "Oklahoma medical marijuana purchases require a valid OMMA patient license and photo ID."
      },
      {
        title: "Veteran and Local Deal Alerts",
        content:
          "If veteran specials are active, they should be easy to find. Join alerts for veteran offers, flower drops, and practical deal updates instead of waiting for a marketplace listing or old social post to tell the story."
      },
      {
        title: "Know Your Own Restrictions",
        content:
          "Patients are responsible for understanding employer, federal, military, or base-related restrictions that may apply to them. The store can verify OMMA eligibility, but it cannot make those outside decisions for you."
      }
    ],
    faqs: [
      {
        question: "Is The Purple Dragon near Fort Sill?",
        answer:
          "It is located on W Gore Blvd in Lawton, within the broader Fort Sill/Lawton area. Use the directions button for the current route from your location."
      },
      {
        question: "Do I need an Oklahoma medical marijuana card?",
        answer:
          "Yes. You need an active OMMA patient license and a government-issued photo ID."
      },
      {
        question: "Are there veteran or military specials?",
        answer:
          "Veteran or military specials may be available. Check current deal information or join alerts so the store can send updates when those offers are active."
      }
    ],
    relatedPages: [
      { title: "Lawton Deals", slug: "lawton-dispensary-deals" },
      { title: "Flower Deals", slug: "flower-deals-lawton" },
      { title: "Review Your Visit", slug: "review" }
    ]
  }
};
