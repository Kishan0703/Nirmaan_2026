# Project Skills

Reference this file only for custom project skills.

---

## 1. caveman
**Use**: Cut output tokens. Talk short. Drop filler, hedging, pleasantries. Keep technical accuracy.
- **Key Concepts**:
  - *Talk short*: Telegraphic fragments. Brain big, mouth small.
  - *Levels*: `lite` (no filler), `full` (default, fragments), `ultra` (code-comment style), `wenyan` (classical Chinese).
  - *Commands*:
    - `/caveman [level]` - Activate.
    - `/caveman-commit` - Write git commit message under 50 chars.
    - `/caveman-review` - One-line PR feedback.
    - `/caveman-compress <file>` - Compress markdown files to save input tokens.
  - **Rules**: Always active for this project. Talk like caveman.

---

## 2. superpowers
**Use**: Complete plan-driven agentic development lifecycle.
- **Key Concepts**:
  - *Phase-gated*: Brainstorm, create worktree, write plan, run TDD (RED-GREEN-REFACTOR), subagent code review, land.
  - *Isolation*: Use git worktrees to keep tasks separate.
  - *Review*: Pre-merge check blocks on critical severity bugs.

---

## 3. mp-resolve-merge-conflicts
**Use**: Resolving git merge or rebase conflicts.
- **Key Concepts**:
  - *State*: Inspect conflict state and history first.
  - *Intent*: Check commits, PRs, issues. Do not guess. Preserve both sides' intent.
  - *Checks*: Run typecheck, tests, and formatting before completing.
  - *Action*: Never `--abort`. Stage, commit, and finish.

---

## 4. ui-ux-pro-max
**Use**: Designing distinctive web/mobile UI.
- **Key Concepts**:
  - *Style Library*: 50+ styles (brutalism, glassmorphism, bento grid, etc.).
  - *Palette & Typography*: 161 palettes, 57 font pairings. Select, do not improvise.
  - *UX Heuristics*: 99 rules checklist (accessibility, motion, spacing).
  - *Integration*: Uses shadcn/ui MCP for accurate component APIs.

---

## 5. anthropic-frontend-design
**Use**: Styling frontend interfaces with clear direction.
- **Key Concepts**:
  - *Design Thinking*: Define purpose, audience, tone before code.
  - *Aesthetic*: Commit to a direction (editorial, industrial, playful). Avoid default purple gradients.
  - *Pillars*: Cohesive typography, colors, space, motion.

---

## 6. theme-factory
**Use**: Styling docs, decks, reports, HTML landing pages.
- **Key Concepts**:
  - *Presets*: 10 curated themes (Ocean Depths, Sunset Boulevard, Arctic Frost, etc.).
  - *Showcase*: Show `theme-showcase.pdf` for selection. Do not modify.
  - *Bespoke*: Generate custom theme on the fly if presets do not fit.
