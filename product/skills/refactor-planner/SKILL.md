---
name: refactor-planner
description: Produce a staged, reviewable refactor plan for a messy module or pattern spread across many files — without writing the code yet. Use when the user asks "how would you refactor this" or wants a plan before a large change.
---

# Refactor Planner

Large refactors fail in review when they land as one giant diff. The job here is to produce a plan that can be executed (by you or the user) as a sequence of small, independently-reviewable, always-green steps.

## Process

1. Map the current state: every file/call site touched by the pattern being refactored. Use grep/search, not memory — list them explicitly.
2. Identify the end state in one or two sentences. If the user's request is vague ("clean this up"), pin down the concrete target before planning steps — a plan against a fuzzy goal produces fuzzy steps.
3. Break the path from current to end state into steps where:
   - Each step compiles/passes tests on its own (no "step 3 of 7 leaves it broken until step 7").
   - Each step is reviewable in isolation — a reviewer shouldn't need to hold the whole plan in their head to approve one step.
   - Mechanical, low-risk steps (renames, moving code without changing it) come before risky, behavior-changing steps — land the boring 80% first so the risky 20% is a small, focused diff.
4. Flag any step that's actually a behavior change disguised as a refactor (e.g. "while I'm in here, also fix X") — call it out as a separate decision, don't fold it in silently.
5. Note what existing test coverage protects each step, and where there's a gap that should be filled with a test *before* that step, not after.

## Output

A numbered list of steps, each with: what changes, why it's safe on its own, and what verifies it (existing test / new test / manual check). Do not start implementing until the user picks a starting point — this skill produces the plan, not the diff.
