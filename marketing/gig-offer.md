# Second revenue stream: Custom Claude Code Setup

Direct-offer service, no marketplace signup/approval wait. You post it, buyers DM you, you relay their details to me, I generate the deliverable, you send it back. Turnaround can be same-day since the actual generation takes minutes once I have what's needed.

## Tiers

**Quick Setup — $25**
A `.claude/settings.json` permission allowlist tailored to their actual stack (language, package manager, test runner) + a starter `CLAUDE.md` for their repo's conventions.
*What I need from the client:* what language/framework, what test/build commands they run, any specific things they want blocked (e.g. "never let it touch our migrations folder").

**Custom Skills Pack — $60**
Everything in Quick Setup, plus 3 custom skills built around their actual workflow (e.g. their specific commit convention, their PR template, their test framework's quirks) instead of generic ones.
*What I need:* the above, plus 2-3 examples of good commits/PRs from their repo so the skill matches their real style, and what repetitive instructions they're tired of giving Claude.

**Full Tune-Up — $120**
Everything above, plus hook recipes matched to their CI/formatter, and one custom multi-agent workflow script for a repeatable task specific to their codebase (e.g. a migration pattern they run often, or a review workflow matching their team's actual review checklist).
*What I need:* the above, plus a description of the repeatable task they want automated and roughly how many files/call sites it usually touches.

## Post copy (X/Reddit reply or standalone post)

> Also doing custom Claude Code setups if you want something tailored instead of generic — permission allowlists, skills matched to your actual repo conventions, hooks, multi-agent workflows. $25-120 depending on scope. DM me.

## Payment

Venmo is simplest here (no new signups, no per-tier Payment Link setup) — collect payment upfront before starting, standard freelance practice for small jobs. If a buyer prefers card payment, you can create a Stripe Payment Link per tier the same way as the main product, but don't bother setting that up until someone actually asks for it.

## Fulfillment checklist

1. Buyer pays, sends intake info (see "What I need" per tier above) — if they leave something out, ask before starting, don't guess at their stack.
2. Relay their answers to me, plus which tier.
3. I generate the files.
4. You send them back as a zip or pasted files, plus a one-line "here's what changed vs. the generic pack and why" — that's the part that makes a custom job feel worth the higher price vs. just buying the $15 pack.
