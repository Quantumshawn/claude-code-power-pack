# Claude Code Cheat Sheet

## Daily-driver slash commands
- `/clear` — wipe context when switching tasks (cheaper and sharper than letting context bloat)
- `/help` — current built-in commands and flags for your installed version
- `/fast` — toggle faster output on Opus tiers without downgrading model

## Permission model, fast
- `.claude/settings.json` (shared, committed) vs `.claude/settings.local.json` (personal, gitignored) — put team-wide allowlists in the former, your own shortcuts in the latter.
- Start every new project narrow (`Read(**)` plus a couple of safe Bash patterns) and widen the allowlist as you hit real friction — don't paste a broad allowlist on day one.
- `deny` rules win over `allow` — use them for anything that should never run regardless of mode (`rm -rf`, secrets files, publish commands).

## Getting good output from an agent
- Specific beats clever: "fix the null check in auth.ts:42" outperforms "fix the bug" almost every time.
- If you're about to ask for something irreversible (force push, dropping a table, deleting a branch), say so explicitly and expect — and want — a confirmation step.
- Long tasks: let the agent finish a logical unit before interrupting; steering mid-edit produces worse results than steering between edits.

## When to reach for a subagent vs. just doing it
- Single targeted lookup (one file, one symbol) → do it directly, don't spawn anything.
- Open-ended "where is X" across an unfamiliar codebase → a search/explore-type agent.
- Independent multi-step work that doesn't need your running context → background agent, so you can keep working in the foreground.

## When to reach for a multi-agent workflow
- You need genuine parallel fan-out (N independent reviewers, N independent finders) AND/OR an adversarial verification pass before trusting a result.
- You do NOT need one for a task that's fundamentally sequential and fits in one context — that's just slower and more expensive for no benefit.

## CLAUDE.md hygiene
- Keep it to: project-specific conventions, where things live, non-obvious constraints. Skip anything derivable by reading the code (architecture, file structure) — that goes stale and the agent can just look.
- One clear sentence beats a paragraph. If a rule needs three sentences to state, the rule is probably two rules.

## Fast triage for "agent went off track"
1. Did the prompt actually specify the constraint it violated, or was the constraint only in your head?
2. Is the relevant file/convention discoverable from the repo, or only from tribal knowledge? If the latter, that's a CLAUDE.md gap, not an agent failure.
3. For repeated mistakes on the same kind of task, write the correction down (CLAUDE.md or a memory/note) instead of re-explaining it each session.
