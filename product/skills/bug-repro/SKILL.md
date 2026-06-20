---
name: bug-repro
description: Turn a vague bug report into a minimal, deterministic reproduction case. Use when the user pastes an error/bug report and asks to "reproduce this", "find the bug", or "what's causing this".
---

# Bug Reproduction

Most time lost on bugs is spent before the actual fix — narrowing down what reliably triggers it. This skill is about that narrowing, not the fix itself.

## Process

1. Extract every concrete fact from the report: exact error text/stack trace, input that triggered it, environment (versions, OS, browser), and what the user expected vs. got. If any of these is missing and matters (e.g. a frontend bug with no browser/version given), ask before guessing.
2. Find the failing code path by following the stack trace or error message to source, not by guessing from the bug title.
3. Form a hypothesis for the minimal trigger condition, then write the smallest possible reproduction: a single test case, a short script, or a minimal API call — strip away everything from the original report that isn't necessary to trigger the failure.
4. Run it. If it doesn't reproduce, that's data — narrow or revise the hypothesis, don't pad the repro with more "just in case" steps.
5. Once it reproduces deterministically, identify the actual root cause by reading the code at the failure point — not just where the exception surfaces, but where the invalid state was actually introduced.
6. Report: the minimal repro steps/code, the root cause in one or two sentences, and the file/line where it originates. Don't propose a fix unless asked — confirm the diagnosis first.

## Rules

- A repro that "usually" fails isn't done — keep narrowing until it's deterministic or you've confirmed it's genuinely racy (and say so explicitly).
- Don't reproduce by copy-pasting the user's entire codebase context into a test; isolate to the smallest unit that still fails.
