# Reddit post draft

**Where to post:** r/ClaudeAI, r/ClaudeCode (if it exists / is active on your account check), r/sideproject (frame as "I made a thing" there, not a hard sell). Check each sub's self-promo rules before posting — some require a flair, some cap self-promo frequency, some require posting your account's read history first. A ban for ignoring rules costs you more than the post is worth.

**Best practice:** give real value in the post itself (one full free skill, copy-pasteable) so it stands on its own even for people who don't buy.

---

**Title:** I packaged the Claude Code skills/hooks/workflows I actually use daily — sharing one free, selling the rest

**Body:**

Been using Claude Code heavily for the last few months and kept rewriting the same instructions every session ("write a good commit message," "don't pad the PR description," etc.) so I turned the ones that actually stuck into proper skills.

Here's one free, in full, so you can judge the quality before I link the rest:

```
---
name: commit-message
description: Write a precise, conventional commit message for the currently staged changes.
---

# Commit Message Writer

1. Run `git diff --staged`. If nothing is staged, say so.
2. If the diff contains two unrelated changes, flag it and suggest splitting
   rather than writing one message that covers both.
3. Format: <type>(<scope>): <summary>, imperative mood, under 72 chars.
4. Never write "various fixes" or "misc changes" — if the diff is that
   scattered, say so and recommend splitting.
5. Match the repo's existing convention (check git log) over this template
   if they conflict.
```

Drop that in `.claude/skills/commit-message/SKILL.md` and it just works.

I bundled 5 more like it (PR descriptions, test generation, bug repro, refactor planning, changelog writing) plus hook recipes and 3 multi-agent workflow scripts (parallel code review w/ adversarial verification, loop-until-dry bug hunting, a migration workflow) into a pack: [Stripe link] — $19.

Happy to answer questions about any of the skill design choices in the comments, paid or not.
