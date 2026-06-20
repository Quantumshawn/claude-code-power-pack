---
name: commit-message
description: Write a precise, conventional commit message for the currently staged changes. Use when the user asks to "write a commit message" or "commit this" without dictating the message themselves.
---

# Commit Message Writer

## Process

1. Run `git diff --staged`. If nothing is staged, say so — don't write a message for unstaged work without confirming that's intentional.
2. Identify the single dominant purpose of the change. If the staged diff contains two unrelated changes (e.g. a bug fix + a dependency bump), flag it and suggest splitting into two commits rather than writing one message that tries to cover both.
3. Format: `<type>(<scope>): <summary>` where type is one of feat/fix/refactor/perf/test/docs/chore/build, scope is the affected module/package (omit if the repo doesn't use scopes — check recent `git log` for the convention actually in use).
4. Summary line: imperative mood ("add", not "added" or "adds"), under 72 characters, no trailing period.
5. Body (only if the summary line can't carry the necessary context): explain *why*, not what — the diff already shows what. Wrap at 72 characters.
6. Footer: only include `BREAKING CHANGE:`, `Fixes #`, or `Refs #` if actually applicable — never invent an issue number.

## Rules

- Never write "various fixes," "misc changes," or "update files" — if the diff is genuinely that scattered, say so and recommend splitting rather than papering over it with a vague message.
- Match the repo's actual existing convention (check `git log --oneline -20`) over this template if they conflict — a consistent house style beats a textbook-correct format.
