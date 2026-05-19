# CLAUDE.md

Authoritative policy doc for the Purple Dragon repository.

**Tradeoff:** These guidelines bias toward caution, regulatory compliance, and surgical changes.

---

## 1. Repo-Critical Compliance & Architecture Rules (Non-Negotiable)

* **Cannabis SMS Constraints:** 
  * **Rule:** Never implement direct Twilio, GHL, or SMTP API calls for marketing or transactional SMS in the client storefront code.
  * **Reason:** Carrier filtering is extremely aggressive for cannabis-related messaging (A2P 10DLC).
* **Solution:** All intake requests, alerts, and lead captures must route exclusively through the unified Lead Guard API endpoint: `https://lead-guard-api.fly.dev/v1/purple-dragon/intake/request`.

* **Email-First / SMS-Optional Intake Policy:**
  * **Rule:** When designing lead intake or alert signup forms, the mobile number field must be optional, and there must be an explicit, unchecked SMS marketing consent checkbox with disclosure language.
  * **Reason:** Preserves carrier-grade opt-in compliance and allows patients without mobile numbers to still join email drops.

* **Review-Flow Anti-Gating:**
  * **Rule:** Do not implement gatekeeper modals that block unsatisfied users from leaving reviews. Happy patients are smoothly routed to Google Review, while unsatisfied ones submit a private customer service ticket. Both pathways must remain fully accessible.
  * **Reason:** Direct gating violates Google Business Profile Terms of Service.

* **Approved Menu-Provider Routing:**
  * **Rule:** Never hardcode menu or checkout links on buttons. Use the dynamic helper `resolveActiveMenuUrl(config)` or `resolveMenuUrl(provider, config)` referencing the configuration mapping in `src/lib/site-config.ts` (Weedmaps, Dutchie, Jane).

* **Compliance Copy Guardrails:**
  * **Rule:** All storefront hero texts, forms, footers, and pickup guides must explicitly clarify that **OMMA resident/temporary patient credentials** and a **government-issued photo ID** are strictly required at curbside hand-off. No recreational cannabis purchases are allowed.

---

## 2. Next.js App Router Architecture & Static Export Behavior

* **Next.js Version Constraints:**
  * **Notice:** This project uses specific conventions for TypeScript page layout headers, route handlers, metadata exports, and static compilation outputs.
  * **Action:** Review project structure and configuration files (`next.config.ts`, `tsconfig.json`) to align structure.
  * **Surgical Scope:** When modifying route files, ensure metadata exports (`export const metadata`) are kept inside server components or layouts, and interactive UI logic is contained in client components (`"use client"`).

---

## 3. Surgical Changes & Simplicity

* **Surgical Diff Rule:** Touch only what you must. Do not rewrite, reformat, or "improve" adjacent lines or comments. 
* **Cleanup Orphans:** Remove imports, styles, and variables that your edits directly orphan. Do not clean up pre-existing dead code unless explicitly requested.
