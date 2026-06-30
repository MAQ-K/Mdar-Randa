Multi-variant CTA button for all interactive elements in the Madar Randa design system. Enforces engineering-precision aesthetics: 4px radius, condensed uppercase font, no pill shapes.

```jsx
// Hero section — primary CTA on dark navy background
<Button variant="accent" size="lg" arrow>Request a Quote</Button>

// Secondary CTA alongside accent on dark background
<Button variant="outline-white" size="lg">View Our Projects</Button>

// Standard content section CTA
<Button variant="primary" arrow href="/contact">Get Started</Button>

// Tertiary / ghost action
<Button variant="ghost" size="sm">Download Brochure</Button>

// Danger action
<Button variant="danger" onClick={handleDelete}>Remove System</Button>

// Full-width form submit
<Button variant="accent" fullWidth>Submit Request for Quotation →</Button>
```

Notable variants/props:
- `accent` — accent blue fill; hero CTAs, maintenance CTAs, primary conversion actions
- `outline-white` — white outline on dark navy sections only
- `primary` — navy fill; standard content section usage
- `secondary` — navy outline; secondary actions on light backgrounds
- `ghost` — minimal; tertiary or low-emphasis actions
- `arrow` — adds → trailing symbol; use on forward-navigation CTAs
- `fullWidth` — 100% width with centered text; use in forms and cards
