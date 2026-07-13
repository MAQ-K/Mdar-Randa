# Madar Randa Website — Management

## Project Brief
Madar Randa (مدار رندا) is a Saudi Arabia–based engineering company for automatic doors and access systems — glass doors, revolving doors, gate motors, security gates/barriers, loading dock equipment, aluminum window shutters, and aircraft hangar doors. The site (`finialweb/`) is a static bilingual (EN/AR) HTML site:
- Individual product pages use the shared `pd-` template (`css/product-pages.css`) — hero, intro, features, FAQ, related products, CTA. Example: `product-glass-doors.html`.
- Category-style pages use the `pp-` template with a floating sub-nav for variants. Example: `product-gate-motors.html`.
- An `old/` folder holds a previous generation of pages, several of which are no longer linked from the live site but still contain useful reference content (and sometimes the only working copy of a page that's now missing at the top level).

This file tracks fixes requested by the client in **`assets/Madar randa review.docx`** — a walkthrough doc with 15 annotated screenshots and Arabic notes pointing at specific problems across the live site.

## How this file works
- Tasks are grouped by area below.
- Status flags: ⬜ Not started · 🔄 In progress · ✅ Done, pending your verification · ✔️ Verified/closed
- **Workflow: one task at a time.** After finishing a task I update its status here and stop — I wait for you to verify before starting the next one.

---

## Task Groups

### A. Home Page (`index.html`)
| # | Task | Status |
|---|------|--------|
| A1 | Replace the "trusted partners" brand-logo row with actual **client** logos | ⬜ **Blocked — waiting on you to supply logo files in `assets/logos/`** |
| A2 | Replace the images used in the Projects showcase section on the homepage | ⬜ |
| A3 | Testimonials section: rewrite in Saudi dialect | ⬜ |
| A4 | Quote/contact form has leftover English placeholder text in some fields — translate to Arabic | ⬜ |

### B. Sitewide
| # | Task | Status |
|---|------|--------|
| B1 | FAQ accordions show questions with **no answers** when expanded, across all product pages — needs investigation (JS binding or missing answer markup) | ⬜ |

### C. Product Pages
| # | Task | Status |
|---|------|--------|
| C1 | Security Gates & Entrances page: "Barrier Arms" and "Mobile Blockers" sections both wrongly reuse the hydraulic-blocker/tube-barrier images instead of their own photo — swap "Barrier Arms" to `road-barriers/automatic-arm.png` (already a fit); "Mobile Blockers" has no matching asset yet | ⬜ |
| C2 | Gate Motors page: rename "Iron Door Motors" → "Double-Leaf Door Motors" everywhere on the page | ✅ done, pending your verification |
| C3 | Shutters page: copy says "Electric / Manual" — change to "Remote control or internal switch operation" | ✅ done, pending your verification |
| C4 | Aircraft Hangar Doors — **decided: keep one page**, just make the Bi-Fold vs. Sliding configuration comparison read more clearly as two distinct products | ⬜ |
| C5 | Aircraft Hangar Doors: a section (looked like the trust-badge row) isn't centered | ⬜ verify — current CSS already has `justify-content:center`, may already be fixed |
| C6 | `product-road-barriers.html` is broken — live "Road Barriers" card on the homepage 404s (page only exists in `old/`) | ⬜ |
| C7 | Automatic Glass Doors: add a Hospital Doors variant | ⬜ image already available: `automatic-glass-doors/hospital-doors/hospital-door.png` |
| C8 | Automatic Glass Doors: split into separate products per type (Sliding, Double-Leaf/Swing, Revolving) instead of one bundled page | ⬜ |
| C9 | "Overhead Sliding Door" sub-card on `products.html` has no photo (placeholder arrow icon instead) — client wants it **deleted**, not fixed | ✅ done, pending your verification |

### D. Projects Page (`projects.html`)
| # | Task | Status |
|---|------|--------|
| D1 | Almost every project card image doesn't match its labeled product — needs a full re-pairing pass | ⬜ **Blocked — waiting on you to supply real project site-photos** |

---

## History
- **2026-07-13** — C9 done: removed the empty "Overhead Sliding Door" card (`products.html:207-215`) from the Industrial/Commercial Doors sub-product grid — it had a placeholder arrow icon instead of a real photo. Grid now has 4 clean cards (Industrial, Fire-Rated, Showroom & Mall, Villa & Palace), all with real images. Left the section's generic "Need an overhead door?" CTA text as-is since it refers to the whole category, not the deleted card.
- **2026-07-13** — C3 done: reworded `product-shutters.html` throughout — meta description, both FAQ answers (schema + on-page accordion), intro paragraph, sub-card title/description, and the comparison table's "Manual" row — from "Electric / Manual" to "Remote Control / Internal Switch." Also dropped the now-inaccurate "no power needed" claim on the old Manual row since these are always electric.
- **2026-07-13** — C2 done: renamed the "Iron Door/Gate Motors" section on `product-gate-motors.html` to "Double-Leaf Door Motors" (Arabic: محركات الأبواب الضلفتين) — nav tab, H1, nav card, section heading, benefits heading, image alt text, and WhatsApp prefilled message. Left generic descriptive sentences that use "iron doors" as a material term (not the product name) untouched, and left `index.html`'s unrelated "Sliding Door Motors" card as-is (different section, out of scope).
- **2026-07-12** — Fixed broken "You May Also Need" related-product links on `product-glass-doors.html` and `product-revolving-doors.html` (pointed to pages that no longer exist); repointed to real, live pages.
- **2026-07-12** — Created `product-hangar-doors.html` (previously missing at top level, only existed in `old/`), styled to match the other product pages, using the `aircraft-hangar-doors` image set; fixed a broken image path on the homepage's hangar doors card.
- **2026-07-12** — Reviewed `assets/Madar randa review.docx` (15 annotated screenshots + Arabic notes) and built the task list above.

---

## Notes / Open Questions
- **Resolved (2026-07-13):** C4 — keeping hangar doors as one page, just clarifying the two configurations. C1 — "Barrier Arms" fix uses `road-barriers/automatic-arm.png`; "Mobile Blockers" still has no real photo (no matching asset exists — flag if you find/send one). C9 — turned out to be a `products.html` markup issue, not a missing page; the card just needs removing.
- **C6 confirmed real**: the homepage service card (`index.html:148`) already links to `product-road-barriers.html` with a live image (`assets/images/products/road-barriers/automatic-arm.png`), and the contact form has a "Road Barriers" dropdown option — but the page only exists in `old/`. Same situation as hangar doors before the fix. Will restore the same way.
- **Blocked, waiting on you:** A1 (client logo files), D1 (real project site-photos). Everything else below is unblocked.
- Some screenshots may reflect an older build. C5 (trust-bar centering) looks already correct in the current CSS (`.pd-trust__row { justify-content:center }`) — will re-verify against the live page rather than assume it's still broken.
- `old/` folder is proving useful as reference/source material for restoring missing pages (hangar doors, road barriers) — worth keeping around rather than deleting, at least until this task list is closed out.
