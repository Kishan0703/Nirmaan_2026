# Nirmaan Hackathon Hosting Site Design Spec

## Goal

Build the existing Next.js site into a Nirmaan hackathon hosting experience using the visual language from `index.html`: bold modular blocks, high-contrast color bands, large expressive typography, full-bleed media, ticker strips, pinned/scroll-driven motion, playful CTA overlays, and a structured left navigation rail. Follow the pattern and energy, but do not copy the exact Units content or layout order.

The site should feel like an architecture/design-led hackathon platform: precise, technical, creative, and event-ready. Think "Archdeco meets builder workspace": structured grids, blueprint-style marks, construction module language, bright signals, black outlines, large typography, and motion that feels engineered.

## Source Page Analysis

`index.html` is a WordPress-exported Units homepage. Ignore SEO/plugin noise and keep these design principles:

- Typography: large display headings with short punchy copy. Existing repo already has `Bunch` for display and `Aeonik Pro` for body.
- Layout: fixed left navigation rail on desktop, compact mobile header, full-width modular sections with generous gaps.
- Shape system: big rounded modules, pill labels, circular/pill CTAs, sharp icon glyphs, black outline accents.
- Color system: saturated blue, yellow, orange, red, green, purple, black, and warm paper background.
- Hero: full-bleed image/video with centered headline and primary CTA.
- Content blocks: one large information block paired with media, map, gallery, carousel, or animated surface.
- Tickers: horizontal marquee bands between major sections.
- Motion: GSAP-style scroll reveals, pinned horizontal panels, slow image drift, repeating marquee, animated SVG/lottie-style icons, CTA color-fill overlays.
- Interaction: modal from CTA, hover arrow movement, custom cursor/gallery affordance in the source.

## Nirmaan Adaptation

Use the same system for hackathon hosting content:

- `Nirmaan` as the first-viewport brand signal.
- Primary CTA: `Host a Hackathon` or `Start Hosting`.
- Secondary CTA: `View Playbook` or `Explore Tracks`.
- Audience: colleges, communities, student clubs, startup ecosystems, and sponsors who want to run a high-quality hackathon.
- Tone: build-focused, architectural, credible, energetic.
- Content should explain how Nirmaan helps host a hackathon from planning to submissions, judging, demos, and post-event community.

## Page Structure

### 1. Desktop Rail / Mobile Header

Keep the rail pattern, but rename items:

- `01` Host
- `02` Tracks
- `03` Schedule
- `04` Sponsors
- CTA: `Start Hosting`
- Optional bottom pill: `Nirmaan 2026`

Implementation:

- Update `menuItems` in `lib/data.ts`.
- Keep the vertical colored blocks from `Rail`.
- Replace `Book your Unit` with `Start Hosting` across CTA/modal.
- Mobile menu should keep the same colored tile treatment.

### 2. Hero

Pattern: full-bleed media with large centered text.

Content direction:

- Headline: `Nirmaan builds hackathons that build back.`
- Supporting copy: `A hosting platform for colleges, clubs, and communities to run design-led hackathons with tracks, teams, submissions, judging, and live demos in one flow.`
- CTA: `Start Hosting`

Visual direction:

- Replace student housing lounge image with hackathon/build imagery: teams around tables, laptops, prototypes, architectural grids, or generated visual of builders in a studio.
- Add subtle blueprint/construction grid overlay, not a heavy gradient.
- Keep high contrast and centered hero copy.

### 3. Hosting Map / Event Control Block

Pattern from `locations`: colored info panel plus map-like visual.

Content:

- Label: `Hosting`
- Title: `From idea to demo day`
- Copy: Explain Nirmaan handles event setup, tracks, registration, team formation, mentor flow, submissions, judging, and showcase.
- Tags: `Campus`, `Online`, `Hybrid`

Visual:

- Replace map with an event command board: grid background, timeline pins, venue/online nodes, check-in marker, demo-stage marker.
- Use black grid lines on green or blue, similar to `.map-grid`.

### 4. Capability Marquee

Pattern from red/blue marquees.

Ticker examples:

- `Registration`
- `Team formation`
- `Track pages`
- `Mentor rooms`
- `Live submissions`
- `Judging`
- `Demo day`
- `Sponsor booths`

Implementation:

- Reuse `Marquee`.
- Use red/yellow and blue/green-light combinations.
- Repeat 3-4 times for seamless motion.

### 5. Hosting Engine / Horizontal Cards

Pattern from `living`: fixed info module plus horizontal carousel/cards.

Content cards:

- `Plan`: Tracks, rules, timeline, prize structure.
- `Launch`: Landing page, registrations, team creation, announcements.
- `Run`: check-ins, mentor slots, live support, submission windows.
- `Judge`: rubrics, reviewer assignment, scoreboards, finalist selection.
- `Showcase`: project gallery, demo links, winners, certificates.

Visual:

- Use cards with real/generative hackathon visuals or code/blueprint screenshots.
- Keep image drift classes for subtle movement.
- Use existing carousel state first; upgrade to GSAP pinned horizontal scroll later if needed.

### 6. Tracks / Challenge Modules

Pattern from `typical_unit`: info block plus animated gallery cloud.

Content:

- Label: `Tracks`
- Title: `Challenges with structure`
- Copy: Nirmaan can host multiple challenge tracks with prompts, datasets/APIs, sponsor briefs, scoring criteria, and deliverables.
- Feature chips:
  - AI + Automation
  - Climate + Cities
  - FinTech
  - Health
  - Open Innovation
  - Design Systems
  - Hardware
  - Social Impact

Visual:

- Gallery cloud becomes a moving wall of track cards, not random photos.
- Each tile can show a track name, icon, color, and small prompt.

### 7. Community / Live Event Energy

Pattern from `community`: image, red info block, image.

Content:

- Label: `Community`
- Title: `Teams, mentors, sponsors, one build floor`
- Copy: Explain participant experience: team discovery, mentor sessions, checkpoints, community updates, demo day.
- CTA: `Open community flow`

Visual:

- Use two images: team collaboration and final demo/judging.
- Middle block should stay loud and short.

### 8. What Defines Nirmaan

Pattern from arrows header plus three cards.

Cards:

- `Built for Hosts`: clean admin flow, reusable event templates, sponsor-ready pages.
- `Built for Builders`: team formation, transparent rules, submissions that feel simple.
- `Built for Outcomes`: judging, demos, winner archive, follow-up community.

Keep the arrow header but retitle it: `What makes Nirmaan work`.

### 9. Hosting Modal

Pattern from booking modal.

Rename and simplify fields:

- Organizer name
- Organization / community
- Email
- Expected participants
- Mode: Campus / Online / Hybrid
- Target month
- Notes
- Submit label: `Request hosting setup`

Later integration:

- Store request in backend/API route.
- Add email notification or CRM handoff.
- Validate with `react-hook-form` + `zod` if the form grows.

## Animation Plan

Use progressive complexity:

### Phase 1: Current lightweight motion

- Keep IntersectionObserver reveal via `useReveal`.
- Keep CSS marquees.
- Keep hover CTA fill.
- Keep image drift.
- Keep modal slide-in.

### Phase 2: GSAP polish

Install `gsap` and implement:

- Hero headline split reveal with `SplitText` or manual word spans.
- Pinned horizontal scroll for the hosting engine cards.
- ScrollTrigger color changes on marquee/sections.
- CTA overlay animation using layered SVG paths or CSS pseudo-elements.
- Footer logo/grid reveal on scroll.

### Phase 3: Optional rich interactions

- Custom cursor for gallery/track cards.
- Lottie-style animated Nirmaan construction mark.
- Scramble text for track names or countdown.
- Draggable track wall if useful on desktop.

Respect `prefers-reduced-motion` and keep all motion optional.

## Design Tokens

Keep existing Tailwind tokens unless the brand palette changes:

- `paper`: `#f4e9e1`
- `ink`: `#000000`
- `blue`: `#0072e3`
- `yellow`: `#ffb200`
- `orange`: `#ff6100`
- `red`: `#ef333a`
- `green`: `#00aa3c`
- `green-light`: `#1be349`
- `purple`: `#ab54f7`

Add architectural accents if needed:

- Blueprint line texture using CSS gradients.
- Thin black grid modules.
- Small construction glyphs: arrow, bolt, square, pin, bracket, beam, node.
- Avoid one-color dominance; rotate loud colors section by section.

## Next.js Build Plan

### Data

Update `lib/data.ts`:

- Rename `menuItems`.
- Replace `livingCards` with `hostingCards`.
- Replace `unitFeatures` with `trackFeatures`.
- Replace `values` with Nirmaan values.
- Add `marqueeOne`, `marqueeTwo`, and optionally `tracks`.

### Components

Update `components/site-experience.tsx`:

- `Rail`: labels and CTA.
- `Hero`: Nirmaan copy/media.
- `Locations` -> `HostingControl`.
- `Living` -> `HostingEngine`.
- `Units` -> `Tracks`.
- `Community`: Nirmaan event community copy/media.
- `Values`: Nirmaan differentiators.
- `BookingModal` -> `HostingModal`.

### Styling

Update `app/globals.css`:

- Keep fonts and token setup.
- Add `.blueprint-grid` or adapt `.map-grid`.
- Add `.track-cloud` if gallery tiles become track cards.
- Keep reveal, marquee, modal, and reduced-motion rules.

### Assets

Use either:

- Existing local assets temporarily for layout validation.
- New generated bitmap hero/event images.
- Real hackathon photos if brand/legal ownership is clear.

For final polish, the hero should not use a generic stock-like crop. It should show actual builders, prototypes, or a clear constructed event environment.

## Suggested Copy Set

Hero:

- `Nirmaan builds hackathons that build back.`
- `Plan, host, judge, and showcase high-energy hackathons without losing the structure that makes teams ship.`

Hosting block:

- `From idea to demo day`
- `Set tracks, open registrations, form teams, run mentor checkpoints, collect submissions, score projects, and publish winners from one hosting flow.`

Tracks:

- `Challenges with structure`
- `Every track gets a prompt, resources, judging criteria, deliverables, sponsor context, and a clear path from kickoff to demo.`

Community:

- `One build floor, many teams`
- `Participants get clarity. Mentors get context. Judges get clean submissions. Hosts get a live operating layer for the whole event.`

Values:

- `Built for Hosts`
- `Built for Builders`
- `Built for Outcomes`

## Implementation Order

1. Replace content/data first so the page becomes Nirmaan-specific.
2. Swap images and icons after copy is stable.
3. Rename components only where it improves readability; avoid a large refactor before the first working version.
4. Validate desktop and mobile spacing.
5. Add GSAP pinned scroll and split text only after the content layout is stable.
6. Run `npm run build`.
7. Start dev server and inspect with screenshots before final handoff.

## Acceptance Checklist

- First viewport clearly says `Nirmaan` and hackathon hosting.
- No student housing or Units-specific copy remains.
- Desktop rail works with Nirmaan sections.
- Mobile header/menu remains usable.
- CTA opens a hosting request modal.
- Marquees use hackathon capabilities.
- Hosting cards explain the event lifecycle.
- Track section communicates challenge hosting.
- Motion is smooth and disabled under reduced motion.
- Layout has no text overlap on mobile or desktop.
- Build passes.
