# Claude Code Power Pack

Skills, hooks, multi-agent workflows, and permission templates for getting more out of Claude Code, day one.

## What's in here

```
skills/                  6 ready-to-use custom skills
  changelog-writer/       generate user-facing CHANGELOG entries from git history
  pr-description/         write reviewer-friendly PR descriptions from a diff
  commit-message/         precise conventional commit messages from staged changes
  test-generator/         tests that match your existing framework and actually catch regressions
  bug-repro/               turn a vague bug report into a minimal deterministic repro
  refactor-planner/       staged, reviewable refactor plans before you touch any code

hooks/README.md           5 copy-paste hook recipes (auto-format, protected paths,
                           desktop notifications, pre-commit test gate, audit logging)

workflows/                3 multi-agent workflow scripts (for the Workflow tool)
  code-review-workflow.js    parallel review by dimension + adversarial verification
  bug-bash-workflow.js       loop-until-dry bug finding with a 3-lens verify panel
  migration-workflow.js      discover → transform (worktree-isolated) → verify

settings-templates/       starter permission allowlists for Node, Python, and Go projects

cheatsheet.md             one-page reference for daily use
```

## Install

1. Copy whichever `skills/*` folders you want into your project's `.claude/skills/` (or your global `~/.claude/skills/` to use them everywhere).
2. Copy the hook recipe(s) you want from `hooks/README.md` into your `.claude/settings.json`.
3. Copy a `settings-templates/*.settings.json` into `.claude/settings.json` as a starting allowlist, then adjust to your project.
4. Workflow scripts: use directly with `Workflow({ scriptPath: 'workflows/code-review-workflow.js' })`, or paste the contents into the `script` argument.

## A note on versions

Claude Code's exact hook event names, environment variables, and skill frontmatter fields can change between releases. Everything here reflects the patterns and conventions as of mid-2026. If something doesn't fire as expected, check `/help` or your installed version's docs for the current field names — the *structure and reasoning* behind each recipe is the durable part; exact field names are the part to double check.

## License

Personal/team use. Don't resell or redistribute this pack as-is. Adapt it, build on it, ship it — just don't repackage and flip it.
