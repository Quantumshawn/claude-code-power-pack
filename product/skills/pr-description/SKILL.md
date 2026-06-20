---
name: pr-description
description: Write a complete, reviewer-friendly pull request title and description from the current branch's diff against its base. Use when the user asks to "write a PR description", "draft the PR", or "open a PR" (description portion).
---

# PR Description Writer

A good PR description answers three questions for a reviewer who has zero context: what changed, why, and how to verify it. Most AI-written PR descriptions just restate the diff — don't do that.

## Process

1. Find the base branch (`git merge-base HEAD origin/main` or ask if ambiguous) and read the full diff against it, plus the commit history on the branch.
2. Read enough surrounding code to understand *why* the change was made, not just what lines moved. If the motivation isn't obvious from the diff or commit messages, ask the user for the one sentence of context rather than guessing.
3. Title: under 70 characters, imperative mood, no ticket-number-only titles ("Fix JIRA-1234" tells a reviewer nothing).
4. Body structure:
   - **Summary** — 1-3 bullets, what changed and why. The "why" is the part that decays if you only describe the diff.
   - **Test plan** — concrete, checkable steps a reviewer can actually run. If there are existing tests covering this, name them; if not, say what was tested manually.
   - Omit sections that don't apply (no screenshots section for a backend-only change, no migration notes if there's no migration).
5. Do not write a "Changes" section that's just a re-narration of the file list — the diff already shows that.
6. If the diff mixes an unrelated drive-by fix with the main change, call it out and suggest splitting, rather than silently describing both as one thing.

## Output

Return the title and body ready to paste into `gh pr create --title ... --body ...`, not wrapped in extra commentary.
