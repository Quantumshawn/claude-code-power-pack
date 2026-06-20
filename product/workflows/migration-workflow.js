export const meta = {
  name: 'migrate-sites',
  description: 'Discover every call site matching an old pattern, then transform each one independently (in isolated worktrees so parallel edits never collide), then verify the whole migration.',
  phases: [
    { title: 'Discover', detail: 'find all call sites' },
    { title: 'Transform', detail: 'one agent per site, worktree-isolated' },
    { title: 'Verify', detail: 'confirm no remaining old-pattern usages and build is green' },
  ],
}

// Usage: Workflow({ scriptPath: 'migration-workflow.js', args: { from: 'oldFn(', to: 'newFn(', glob: '**/*.ts' } })
// Why worktree isolation matters here: when N agents edit files in parallel
// in the SAME working tree, concurrent writes can clobber each other's
// changes. isolation: 'worktree' gives each transform agent its own
// checkout so edits never race — at the cost of slower setup, which is
// worth it any time agents mutate files concurrently.

const { from, to, glob } = args || {}
if (!from || !to) {
  throw new Error('migration-workflow requires args: { from, to, glob? }')
}

phase('Discover')
const discovery = await agent(
  `Find every file matching glob "${glob || '**/*'}" that contains the pattern: ${from}\nReturn each as a file path, one per line, with no other commentary.`,
  { label: 'discover' }
)
const files = discovery.split('\n').map((l) => l.trim()).filter(Boolean)
log(`${files.length} files to migrate`)

phase('Transform')
const transforms = await parallel(
  files.map((file) => () =>
    agent(
      `In ${file}, replace every usage of "${from}" with "${to}". Preserve surrounding formatting and logic exactly — this is a mechanical rename, not a refactor. If a usage doesn't cleanly map (different arg count, different semantics), leave it unchanged and report it instead of guessing.`,
      { label: `transform:${file}`, isolation: 'worktree' }
    )
  )
)

phase('Verify')
const remaining = await agent(
  `Search the codebase for any remaining usages of "${from}" matching glob "${glob || '**/*'}". Report file:line for each, or say "none" if there are no remaining usages.`,
  { label: 'verify-remaining' }
)

return { filesTransformed: files.length, transforms, remaining }
