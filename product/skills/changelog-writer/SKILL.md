---
name: changelog-writer
description: Generate a clean, user-facing CHANGELOG entry from a git diff or range of commits. Use when the user asks to "write a changelog", "summarize this release", or "what changed since last tag".
---

# Changelog Writer

Generate a CHANGELOG.md entry that a *user* of the software would want to read — not a commit log dump.

## Process

1. Determine the range: if the user gave a tag/branch/commit range, use it. Otherwise default to `git log $(git describe --tags --abbrev=0)..HEAD --oneline` (fall back to last 20 commits if no tags exist).
2. Read the actual diffs for non-trivial commits (`git show <sha>`), not just commit messages — messages are often stale or vague.
3. Bucket changes into: **Added**, **Changed**, **Fixed**, **Removed**, **Security**. Drop empty buckets.
4. Write each entry as a single line, present tense, no trailing period, no commit hashes, no internal ticket numbers unless the user's project conventions show them in prior entries (check existing CHANGELOG.md for style).
5. Merge duplicate/related commits into one bullet (e.g. "fix typo" + follow-up "fix typo again" → one bullet).
6. Skip noise: version bumps, merge commits, CI config tweaks, formatting-only commits — unless the user explicitly wants an internal/dev-facing changelog instead of a user-facing one (ask if ambiguous).
7. Prepend the new entry to CHANGELOG.md under today's date / the new version header, matching the existing file's heading style. If no CHANGELOG.md exists, create one using the Keep a Changelog format.

## Output discipline

- No marketing language ("exciting", "powerful", "blazing fast") — describe what changed, not how great it is.
- One line per change. If a change needs more than one line to explain, it's two changes or it's badly scoped — ask the user, don't pad.
