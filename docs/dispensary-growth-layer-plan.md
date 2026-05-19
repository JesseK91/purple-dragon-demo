# Purple Dragon Dispensary Growth Layer Plan

## Positioning

This repo should become an owned dispensary growth layer, not a standalone brochure site.

The owner-facing promise:

> Keep Weedmaps, Dutchie, Jane, and Google for discovery and ordering. Use your own site to capture patient intent, promote deals, grow the text list, route patients into the current menu, and track the actions that lead to store visits.

The live demo should make a dispensary owner think:

- This gives us a better branded front door.
- This works with our current menu provider instead of replacing it.
- This captures patients before they disappear into a marketplace.
- This makes curbside, daily deals, text alerts, reviews, and repeat visits easier to run.
- This shows which actions patients actually take.

## Current Repo State

The app is a static-export Next.js site deployed to Cloudflare Pages.

Relevant files:

- `src/app/page.tsx`: page composition, curbside section, order drawer, local state.
- `src/components/Hero.tsx`: first-viewport brand and primary calls to action.
- `src/components/Navbar.tsx`: fixed desktop/mobile nav and order button.
- `src/components/ProductRegistry.tsx`: menu preview, category filters, availability modal, text/availability lead capture.
- `src/app/layout.tsx`: metadata.
- `src/app/globals.css`: typography/utilities.
- `next.config.ts`: `output: "export"` and unoptimized images.

Current limitation:

Everything is local React state. There is no persistent lead capture, analytics endpoint, admin dashboard, menu-provider routing config, or review flow yet.

## Target Page Structure

### 1. Hero: Conversion First

File: `src/components/Hero.tsx`

Goal: make curbside/menu/deals/text list the obvious actions.

Target copy:

- Headline: `Fresh Drops. Daily Deals. Lawton Medical Cannabis.`
- Subhead: `Browse Purple Dragon's featured flower, carts, edibles, and patient specials. Then shop the full menu, get directions, or join drop alerts.`
- Buttons:
  - `Shop Full Menu`
  - `Get Directions`
  - `Join Text Deals`

Implementation:

- Replace current `Order Curbside`/`How Curbside Works` pair with a three-action group.
- `Shop Full Menu` opens configured Weedmaps/Dutchie/Jane URL.
- `Get Directions` opens Google Maps directions.
- `Join Text Deals` opens the text club modal or scrolls to the text club section.

### 2. Sticky Mobile Action Bar

New component: `src/components/StickyActionBar.tsx`

Actions:

- `Menu`
- `Deals`
- `Call`
- `Directions`
- `Text Club`

Implementation:

- Fixed bottom bar on mobile only.
- Use icon buttons from `lucide-react`.
- Emit tracking events for every tap.
- Hide or compress when the order drawer/modal is open.

Tracking event names:

- `mobile_menu_tap`
- `mobile_deals_tap`
- `mobile_call_tap`
- `mobile_directions_tap`
- `mobile_text_club_tap`

### 3. Today's Patient Specials

New component: `src/components/DealsSection.tsx`

Place immediately below hero, before curbside.

Example deals:

- `First-time patient special`
- `Veteran discount`
- `Flower Friday`
- `Cart bundle`
- `Selected gummies`

Buttons:

- `Claim Deal`
- `Text Me Deals`
- `Shop Full Menu`

Implementation:

- Deals should come from a typed data file, not inline JSX.
- Create `src/lib/site-data.ts` and export `deals`.
- A deal claim should open a lightweight lead capture modal with first name, phone, favorite category, and consent.
- For the static demo, store claimed deals in local state and show a success receipt.
- Future backend endpoint: `POST /v1/{client_id}/deal-claims` in `lead-guard-api`.

Tracking event names:

- `deal_view`
- `deal_claim_click`
- `deal_claim_submit`
- `deal_menu_click`

### 4. Curbside Pickup System

Existing section: `src/app/page.tsx`

Refactor into: `src/components/CurbsideSection.tsx`

Current copy is directionally right. It needs to become a primary system section, not incidental page content.

Steps:

1. `Build your order`
2. `Get confirmation`
3. `Curbside handoff`

Add owner-relevant microcopy:

> Fast pickup is a conversion feature. The site should make curbside ordering obvious before the patient leaves for Weedmaps or Google Maps.

Implementation:

- Move hardcoded section out of `page.tsx`.
- Add CTA buttons:
  - `Start Curbside Order`
  - `Open Full Menu`
  - `Call Store`
- Track CTA taps.

### 5. Featured Menu / Fresh Drops

Existing component: `src/components/ProductRegistry.tsx`

This should not look like a fake ecommerce platform or a Weedmaps clone.

Refactor goals:

- Rename component to `FeaturedMenu.tsx`.
- Keep product cards, but position them as `Featured Menu Preview`.
- Do not use generic titles like `Indoor Flower Shelf`, `House Deals`, or `Live Resin Deals`.
- Use strain/product names and realistic sizes:
  - Flower: grams or eighths.
  - Concentrates: grams.
  - Pre-rolls: 1g singles or packs.
  - Vapes: carts/disposables.
  - Accessories: product names.
- Add visible demo disclaimer near the section footer.

Footer disclaimer:

> Demo product data. Final menu, pricing, lab data, and availability are supplied by the dispensary or synced through its current menu provider.

Card CTAs:

- `Check Availability`
- `Start Curbside Order`
- `Shop Full Menu`

Tracking event names:

- `featured_product_view`
- `featured_product_curbside_click`
- `featured_product_availability_click`
- `featured_product_full_menu_click`

### 6. Full Menu Integration Block

New component: `src/components/FullMenuRouting.tsx`

Purpose:

Show that this system wraps around existing Weedmaps/Dutchie/Jane infrastructure.

Target copy:

> Use Purple Dragon's existing Weedmaps, Dutchie, or Jane menu for live availability and pickup ordering. This site acts as the branded front door for deals, fresh drops, text alerts, reviews, and local trust.

Buttons:

- `Open Weedmaps Menu`
- `Order Pickup`
- `View Deals First`

Implementation:

- Add `src/lib/site-config.ts` with:
  - `storeName`
  - `address`
  - `phone`
  - `googleMapsUrl`
  - `weedmapsMenuUrl`
  - `dutchieMenuUrl`
  - `janeMenuUrl`
  - `activeMenuProvider`
  - `googleReviewUrl`
- If a provider URL is missing, hide that button.

Tracking event names:

- `weedmaps_menu_click`
- `dutchie_menu_click`
- `jane_menu_click`
- `pickup_order_click`

### 7. Text Club / Drop Alerts

New component: `src/components/TextClubSection.tsx`

This is the retention wedge.

Fields:

- First name
- Phone
- Favorite category
- Consent checkbox

Interest options:

- Flower
- Carts
- Edibles
- Concentrates
- Budget deals
- Premium drops
- Veteran specials

Consent copy:

> I agree to receive recurring promotional text messages from Purple Dragon. Message and data rates may apply. Reply STOP to opt out.

Implementation:

- Client-side validation for phone and consent.
- Static demo success state.
- Future backend endpoint: `POST /v1/{client_id}/text-club-signups`.
- In production, route this to Lead Guard API and Twilio-compliant opt-in storage.

Tracking event names:

- `text_club_view`
- `text_club_submit`
- `text_club_interest_selected`

### 8. Rewards / Repeat Patient Block

New component: `src/components/RewardsSection.tsx`

Purpose:

Show future retention infrastructure without claiming they already run a rewards program.

Target copy:

> Built for repeat patients. Add points, birthday offers, veteran specials, and return-visit campaigns when the store is ready.

Feature cards:

- Birthday offers
- Veteran specials
- Return-visit reminders
- Lost-patient winbacks
- QR signup cards

Tracking event names:

- `rewards_section_view`
- `rewards_interest_click`

### 9. Review and Feedback Flow

New component: `src/components/ReviewFlowSection.tsx`

Purpose:

Route happy patients to Google and unhappy patients to private feedback.

Target headline:

`Had a good visit? Help local patients find us.`

Actions:

- `Leave a Google Review`
- `Send Private Feedback`

Implementation:

- `Leave a Google Review` opens `siteConfig.googleReviewUrl`.
- `Send Private Feedback` opens a modal with name, phone/email, visit date, message.
- Static demo success state.
- Future backend endpoint: `POST /v1/{client_id}/feedback`.

Tracking event names:

- `google_review_click`
- `private_feedback_open`
- `private_feedback_submit`

### 10. Location / Local SEO Block

New component: `src/components/LocationSection.tsx`

Data source: `src/lib/site-config.ts`

Content:

- Address: `1311 W Gore Blvd, Lawton, OK`
- Phone
- Hours placeholder
- Google Maps button
- Call button
- Service area copy:
  - Lawton
  - Fort Sill
  - Cache
  - Elgin
  - Medicine Park
  - Southwest Oklahoma

SEO copy:

> Medical cannabis dispensary serving Lawton and Southwest Oklahoma OMMA patients.

Avoid:

- `best dispensary`
- medical outcome claims
- cure/treat/relieve language

Tracking event names:

- `directions_click`
- `phone_click`
- `map_interaction`

### 11. Compliance Footer

New component: `src/components/ComplianceFooter.tsx`

Replace current footer.

Required copy:

- `OMMA patient license required.`
- `Medical use only.`
- `Product availability changes daily.`
- `THC/CBD values vary by batch.`
- `No medical advice.`
- `Keep out of reach of children.`
- `Demo data shown for concept purposes.`
- `License number: [placeholder]`

Avoid:

- clinically verified
- cures
- relieves
- treats
- guaranteed
- medical-grade effects

## Owner Dashboard Mockup

New route: `src/app/owner/page.tsx`

This should be a static mockup, not a real admin yet.

Modules:

### Today's Actions

- Menu clicks
- Direction taps
- Phone taps
- Text signups
- Deal claims
- Review clicks

### Promotions

- Create daily deal
- Feature fresh drop
- Set expiration date
- Generate QR code
- Add promo code

### Text Club

- New subscribers
- Favorite categories
- Export contacts
- Segment by interest
- Send campaign draft

### Reviews

- Review requests sent
- Positive feedback
- Private complaints
- Google review clicks

### Menu Routing

- Weedmaps clicks
- Dutchie/Jane clicks
- Top product-card clicks

Owner-facing line:

> You will know which promos got clicks, how many people tapped directions, how many joined the text list, and which categories people care about.

## Data and Tracking Architecture

### Phase 1: Static Demo Tracking

New file: `src/lib/analytics.ts`

```ts
export function track(eventName: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  console.info("[demo-track]", eventName, payload ?? {});
}
```

Use this in all CTA handlers so the demo visibly behaves like software.

### Phase 2: Persistent Tracking

Future API target:

- `POST /v1/{client_id}/events`

Event payload:

```ts
{
  event_name: string;
  source: "website";
  page_path: string;
  session_id: string;
  lead_id?: string;
  metadata?: Record<string, unknown>;
}
```

This should eventually connect to `lead-guard-api` so the same infrastructure tracks:

- menu clicks
- call taps
- direction taps
- deal claims
- text signups
- review clicks
- feedback submissions

## Build Phases

### Phase 1: Sellable MVP

Build now in this repo:

1. `site-config.ts`
2. `site-data.ts`
3. `analytics.ts`
4. `StickyActionBar.tsx`
5. `DealsSection.tsx`
6. `CurbsideSection.tsx`
7. Rename/refactor `ProductRegistry.tsx` to `FeaturedMenu.tsx`
8. `FullMenuRouting.tsx`
9. `TextClubSection.tsx`
10. `ReviewFlowSection.tsx`
11. `LocationSection.tsx`
12. `ComplianceFooter.tsx`
13. Static owner dashboard at `/owner`

Definition of done:

- Mobile-first conversion path is obvious.
- Sticky mobile bar is present.
- Every major CTA calls `track()`.
- Demo has no medical claims.
- Menu provider routing is explicit.
- Text club and review flow have functional demo modals.
- Build passes with `npm run build`.

### Phase 2: Retention Layer

Connect to backend:

- Text club submissions
- Deal claims
- Private feedback
- Review request events
- Basic event tracking
- QR signup source codes

Backend target:

- Extend `lead-guard-api` with cannabis-safe endpoints and client config.

### Phase 3: Integrations

Only after local traction:

- Dutchie embedded menu or direct-domain menu.
- Jane storefront link/embed where appropriate.
- Weedmaps menu routing.
- POS/loyalty integrations where commercially viable.
- Purchase-history-based campaign segmentation.
- Inventory-driven promo alerts.

## Refined Offer

Name:

`Dispensary Growth Layer`

Core promise:

> Turn your dispensary website into a branded hub for menu traffic, daily deals, text-list growth, reviews, and repeat visits.

Includes:

- Branded dispensary website
- Weedmaps/Dutchie/Jane menu routing
- Daily deals section
- Fresh drops section
- Text club capture
- Google review flow
- Direction/call/menu tracking
- QR code signup concept
- Monthly performance summary mockup
- Compliance-safe copy structure

Does not initially:

- Replace POS
- Replace Weedmaps
- Require changing menu providers
- Require staff to learn a complex system
- Make medical claims
- Promise Google ranking overnight

## Owner-Facing Explanation

Purple Dragon Digital Growth Concept

I built this concept around how successful dispensaries actually operate online.

The strongest dispensaries do not rely on one channel. They use Weedmaps, Dutchie, Jane, Google, loyalty programs, text alerts, online menus, and their own branded website together. Weedmaps is useful for discovery, but it should not be the entire customer relationship.

The goal of this concept is to give Purple Dragon its own branded patient-conversion hub while still working with the tools the store already uses.

Patients should be able to land on the site and immediately view today's deals, see fresh drops, open the full menu page, tap for directions, call the store, join text alerts, or leave a review after a good visit.

The point is not just to make the store look better online. The point is to capture and route patient intent.

A visitor who comes from Google, social media, a QR code, or a referral should not disappear into a third-party marketplace without the store gaining anything. The site should capture that interest, promote current deals, grow the text list, and then send the patient into the existing menu or ordering flow.

This creates a stronger system:

`Owned website -> daily deals -> fresh drops -> menu/order routing -> text alerts -> reviews -> repeat visits`

That is the layer most small dispensaries are missing.

## Short Owner Message

I built this as more than a website concept. The idea is to give Purple Dragon an owned digital hub around the tools dispensaries already use: Weedmaps/menu routing, daily deals, fresh drops, text alerts, reviews, and Google/local trust.

Weedmaps is useful, but it should not be the whole customer relationship. This gives the store a branded front door that captures patient interest first, then routes them into the existing menu/order flow.

The real value is tracking and growing the actions that matter: menu clicks, direction taps, phone taps, text-list signups, deal claims, and repeat-patient campaigns.
