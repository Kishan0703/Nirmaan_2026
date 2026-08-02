# Design Reference — units.gr Style

Source: https://units.gr/en/homepage/ (built by Big Horror Athens studio — known for minimal, image-led, GSAP-animated interactive sites)

## 1. Overall Vibe
Editorial, premium, calm. Big full-bleed photography + generous whitespace. Feels like lifestyle/real-estate brand, not corporate. Confident short copy, one big idea per section.

## 2. Layout / UX Structure
- Full-viewport hero image + short headline + single CTA button
- Sticky/minimal top nav: logo left, few links center, CTA button right, socials
- Sections stack: Hero → Value props (icon row) → Feature cards w/ image (alternating) → Icon grid (amenities) → Community/story section → "What defines us" 3-column pillar block → Instagram feed → Footer
- Repeating pattern: image left/right + text block right/left (zig-zag layout)
- Icon + short label rows (amenities, features) — no long paragraphs
- CTA buttons repeated at multiple scroll points, not just top

## 3. Color Theme
- Neutral, warm base: off-white / cream background, charcoal/near-black text
- One accent color used sparingly for CTA buttons + highlights (brand color, not loud — muted earthy tone typical of this studio: terracotta / sand / warm beige)
- Photography carries the color — palette shifts per image, UI stays neutral so photos pop
- Suggest for hackathon: swap to bold single accent (electric blue/purple/lime) since hackathon = energetic, keep neutral base for legibility

## 4. Typography
- Large, confident sans-serif for headlines — geometric/grotesk style (e.g. similar to Neue Montreal, General Sans, Suisse Int'l — common in this agency's stack)
- Big line-height on headlines, generous letter-spacing on small caps labels ("Locations", "Community")
- Body copy: smaller, muted gray, short sentences
- Two-tier hierarchy only: big headline + small body — no clutter of font sizes

## 5. Animations (typical of Big Horror Athens builds — GSAP heavy)
- Scroll-triggered fade/slide-up on section entry
- Image parallax on scroll (bg image moves slower than scroll)
- Smooth scroll (Lenis/GSAP ScrollSmoother style)
- Icon rows: staggered fade-in one by one
- Hover: subtle scale-up on image cards, underline-draw on nav links
- Page transitions: fade, no hard cuts
- Custom cursor on interactive elements (common in this studio's other work)

## 6. UI Components to Reuse
- Icon + label chip row (amenities/features) — reusable for hackathon tracks/perks
- Alternating image-text feature block — reusable for "About/Theme/Prizes" sections
- 3-column pillar block ("For People / By Design / With Care") — reusable for "Why join / Tracks / Values"
- Sticky nav with CTA button — reusable for "Register Now"
- Footer: logo + legal links + socials, minimal
## 7. Adaptation Notes for Hackathon Site
- Hero: swap lifestyle photo for event/venue or abstract tech visual + headline + "Register Now" CTA
- Icon row → hackathon perks (Wifi, Food, Swag, Mentors, 24/7 access, Prizes)
- Feature blocks → Theme, Tracks, Timeline, Judging
- 3-pillar block → Innovation / Collaboration / Impact (or similar hackathon values)
- Community section → past participants / sponsors / community wall
- Keep: whitespace, big photography, scroll animations, single accent CTA color
