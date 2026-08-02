---
name: superpowers
description: Use when you want a full agentic dev methodology — brainstorm, worktree, plan, TDD, subagent review, and land — wired into your coding agent. v6 combines review agents for up to 50% faster, 60% cheaper builds.
source: https://github.com/obra/superpowers
generated: 2026-05-17T04:18:39.274Z
category: framework
audience: engineers
---

## When to use

- Starting a non-trivial feature and you want an opinionated plan-first workflow
- Spinning up isolated git worktrees per task instead of mutating main
- Driving development through RED-GREEN-REFACTOR TDD instead of ad-hoc coding
- Dispatching subagents to execute bite-sized 2-5 minute tasks with review gates
- Running a pre-merge code review pass that blocks on critical severity issues
- Standardizing on a 'systematic over ad-hoc' workflow across Claude Code, Codex, OpenCode, Cursor, Pi, Antigravity, Kimi Code, Droid, or Copilot CLI

## Key concepts

### Brainstorming stage

Superpowers begins by refining rough ideas through questions, exploring alternatives, and presenting the design in sections for validation before any code is written, so scope is locked in before execution starts.

### Visual Brainstorming

An optional design-visualization step in the brainstorm workflow that renders the design so you can validate the shape of the work visually, not just in prose. Disableable via environment variable.

### Git worktrees per task

After the design is approved, the framework creates an isolated workspace on a new branch and verifies project setup. Each unit of work happens in its own worktree, keeping main clean and parallelizable.

### Bite-sized plans

Plans are broken into tasks that take 2-5 minutes each. Every task has exact file paths, complete code, and verification steps so a fresh subagent can pick it up and execute deterministically.

### Subagent-driven development

Tasks are dispatched to fresh subagents that execute one task per session, with a two-stage review — first checking specification compliance, then code quality — before the main agent commits the change.

### TDD as the primary loop

Superpowers enforces RED-GREEN-REFACTOR: write a failing test, watch it fail, write the minimal code to make it pass, watch it pass, then commit. This is described as the framework's core mechanic, not an optional style.

### Branch completion gate

Before landing, the framework verifies tests pass against the original plan, reports issues by severity, and presents merge / PR / keep / discard options. Critical issues block progress until resolved.

### v6 efficiency pass

Superpowers 6 combines the review agents, pre-generates review packages to cut git commands, and tunes orchestrator guidance for agent selection — landing builds up to 50% faster and up to 60% cheaper than prior versions.

## API reference

```
/plugin install superpowers@claude-plugins-official
```

Install Superpowers into Claude Code via the official plugin marketplace.

```
/plugin install superpowers@claude-plugins-official
```

```
/plugins → search superpowers (Codex)
```

Install Superpowers into Codex CLI/App: open /plugins, search 'superpowers', and select Install.

```
/plugins
```

```
OpenCode INSTALL.md
```

Install Superpowers into OpenCode by following the repo's OpenCode install instructions.

```
Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md
```

```
/add-plugin superpowers (Cursor)
```

Install Superpowers into Cursor via its plugin command.

```
/add-plugin superpowers
```

```
pi install git:github.com/obra/superpowers
```

Install Superpowers into Pi directly from the GitHub repo.

```
pi install git:github.com/obra/superpowers
```

```
agy plugin install <repo> (Antigravity)
```

Install Superpowers into Antigravity from the GitHub repo.

```
agy plugin install https://github.com/obra/superpowers
```

```
/plugins install <repo> (Kimi Code)
```

Install Superpowers into Kimi Code via the plugin marketplace or repo URL.

```
/plugins install https://github.com/obra/superpowers
```

```
droid plugin marketplace add / install
```

Register and install Superpowers inside Factory Droid.

```
droid plugin marketplace add https://github.com/obra/superpowers
droid plugin install superpowers@superpowers
```

```
copilot plugin marketplace add / install
```

Install Superpowers inside GitHub Copilot CLI through its plugin marketplace.

```
copilot plugin marketplace add obra/superpowers-marketplace
copilot plugin install superpowers@superpowers-marketplace
```

## Gotchas

- Tasks must be 2-5 minutes each — larger steps break the subagent dispatch model and the verification loop
- Critical-severity issues from the code review stage block progress; you cannot land a branch over them
- RED-GREEN-REFACTOR is mandatory: you must actually watch the test fail before writing implementation code
- Worktree-per-branch means project setup has to be verified inside the new worktree, not assumed from the parent checkout
- Skipping the brainstorm stage and jumping to plans defeats the methodology — design validation in sections is load-bearing
- Gemini is no longer in the documented agent list as of v6 — supported harnesses are Claude Code, Codex, OpenCode, Cursor, Pi, Antigravity, Kimi Code, Droid, and Copilot CLI

---
Generated by SkillMake from https://github.com/obra/superpowers on 2026-05-17T04:18:39.274Z.
Verify against source before relying on details.