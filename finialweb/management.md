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
| A1 | Replace the "trusted partners" brand-logo row with actual **client** logos | ⬜ |
| A2 | Replace the images used in the Projects showcase section on the homepage | ⬜ |
| A3 | Testimonials section: rewrite in Saudi dialect, or replace with real Google reviews | ⬜ |
| A4 | Quote/contact form has leftover English placeholder text in some fields — translate to Arabic | ⬜ |

### B. Sitewide
| # | Task | Status |
|---|------|--------|
| B1 | FAQ accordions show questions with **no answers** when expanded, across all product pages — needs investigation (JS binding or missing answer markup) | ⬜ |

### C. Product Pages
| # | Task | Status |
|---|------|--------|
| C1 | Security Gates & Entrances page: replace the "barrier arms" image and the "mobile hydraulic blockers" image | ⬜ |
| C2 | Gate Motors page: rename "Iron Door Motors" → "Double-Leaf Door Motors" everywhere on the page | ⬜ |
| C3 | Shutters page: copy says "Electric / Manual" — change to "Remote control or internal switch operation" | ⬜ |
| C4 | Aircraft Hangar Doors: client wants **two separate products** (Bi-Folding and Sliding), not one combined page — see ⚠️ in Notes | ⬜ |
| C5 | Aircraft Hangar Doors: a section (looked like the trust-badge row) isn't centered | ⬜ |
| C6 | `product-road-barriers.html` is broken — live "Road Barriers" card on the homepage 404s | ⬜ |
| C7 | Automatic Glass Doors: add a Hospital Doors variant | ⬜ |
| C8 | Automatic Glass Doors: split into separate products per type (Sliding, Double-Leaf/Swing, Revolving) instead of one bundled page | ⬜ |
| C9 | An "Overhead/Sliding-Up Door" product card has a stray empty icon element that needs removing | ⬜ |

### D. Projects Page (`projects.html`)
| # | Task | Status |
|---|------|--------|
| D1 | Almost every project card image doesn't match its labeled product — needs a full re-pairing pass | ⬜ |

---

## History
- **2026-07-12** — Fixed broken "You May Also Need" related-product links on `product-glass-doors.html` and `product-revolving-doors.html` (pointed to pages that no longer exist); repointed to real, live pages.
- **2026-07-12** — Created `product-hangar-doors.html` (previously missing at top level, only existed in `old/`), styled to match the other product pages, using the `aircraft-hangar-doors` image set; fixed a broken image path on the homepage's hangar doors card.
- **2026-07-12** — Reviewed `assets/Madar randa review.docx` (15 annotated screenshots + Arabic notes) and built the task list above.

---

## Notes / Open Questions
- **⚠️ C4 conflicts with what I just built.** The review doc asks for hangar doors to be two separate products (bi-fold vs. sliding), but I built one page with both as configurations within it. Need your call: split into two pages (e.g. `product-hangar-doors-bifold.html` / `product-hangar-doors-sliding.html`, cross-linked), or keep one page but make the two types read more clearly as distinct products?
- **C6 confirmed real**: the homepage service card (`index.html:148`) already links to `product-road-barriers.html` with a live image (`assets/images/products/road-barriers/automatic-arm.png`), and the contact form has a "Road Barriers" dropdown option — but the page only exists in `old/`. Same situation as hangar doors before the fix. I can restore it the same way once you confirm.
- **C9 location found**: the screenshot's 4-card grid (Fire-Rated, Industrial, Villa/Palace, Showroom/Mall doors) matches images in `assets/images/products/industrial-commercial-doors/overhead-doors/` — but there's no live top-level page for this "Overhead/Sectional Doors" category yet either. Likely a third missing page in the same pattern as hangar doors and road barriers.
- Some screenshots may reflect an older build. C5 (trust-bar centering) looks already correct in the current CSS (`.pd-trust__row { justify-content:center }`) — will re-verify against the live page rather than assume it's still broken.
- `old/` folder is proving useful as reference/source material for restoring missing pages (hangar doors, road barriers, overhead doors) — worth keeping around rather than deleting, at least until this task list is closed out.
