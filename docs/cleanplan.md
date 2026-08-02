# Production Cleanup Plan

## Summary

- Preserve the current website design, layout, colors, assets, section order, and copy style.
- Keep `README.md` as the only Markdown file at the repository root.
- Move supporting documentation and project skills into `docs/`.
- Make production-readiness code changes that remove placeholders, debug behavior, and fragile client logic without redesigning the site.

## Code Changes

- Replace the `Register on Unstop` placeholder with `NEXT_PUBLIC_REGISTRATION_URL`.
- Fall back to the existing participation modal when no registration URL is configured.
- Remove modal debug logging and show a local success state after submit.
- Clean game timers so spawned bug cleanup timeouts are cleared on unmount or game reset.
- Guard persisted high-score parsing before using `localStorage` data.
- Add lightweight data typing and named constants where it improves maintainability without changing behavior.

## Docs And Repo Cleanup

- Move `plan.md`, `design.md`, `skills.md`, and `NIRMAAN_HOSTING_SITE_DESIGN.md` into `docs/`.
- Move `skills/` into `docs/skills/`.
- Update `README.md` with current setup, structure, environment configuration, and verification commands.
- Remove tracked `.DS_Store` files and `tsconfig.tsbuildinfo`.
- Update `.gitignore` to ignore nested `.DS_Store` files and TypeScript build info.

## Commit Plan

- Commit 1: docs consolidation, clean plan, and README update.
- Commit 2: generated-file cleanup and ignore rules.
- Commit 3: production-safe registration CTA and modal submit cleanup.
- Commit 4: timer/game cleanup plus small type/key hygiene.
- Commit 5: final verification fixes only if lint/build require them.

## Verification

- Run `npm run lint`.
- Run `npm run build`.
- Confirm no root Markdown files remain except `README.md`.
- Confirm registration falls back to the modal without `NEXT_PUBLIC_REGISTRATION_URL`.
- Confirm registration uses the external URL when `NEXT_PUBLIC_REGISTRATION_URL` is set.
- Confirm the bug game starts, scores, ends, and cleans timers.

## Follow-Up Quality Fixes

- Add the missing FAQ section anchor so navigation and footer FAQ links resolve correctly.
- Replace the hard-coded visible countdown with real event-date countdown logic.
- Prevent closed mobile menu links from remaining keyboard-focusable.
- Improve modal keyboard behavior with focus restoration and a basic focus trap.
- Add visible focus states where interactive elements currently remove outlines.
- Rename the announcement video from `aanoucement.mp4` to `announcement.mp4`.
- Review oversized or unused media assets and optimize only where it does not change visual output.
