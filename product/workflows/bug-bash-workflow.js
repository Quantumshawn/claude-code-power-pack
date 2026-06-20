export const meta = {
  name: 'bug-bash',
  description: 'Loop multiple independent bug-finder agents over the codebase until two consecutive rounds turn up nothing new, then verify each candidate with a 3-lens panel.',
  phases: [
    { title: 'Find', detail: 'parallel finders, loop until dry' },
    { title: 'Verify', detail: '3-lens panel per candidate' },
  ],
}

// Usage: Workflow({ scriptPath: 'bug-bash-workflow.js', args: { path: 'src/' } })
// Why loop-until-dry instead of a fixed agent count: a fixed count of finders
// plateaus quickly on small/medium codebases and wastes budget on large ones.
// Looping until two rounds in a row find nothing new adapts to actual codebase
// size instead of guessing a number up front.

const target = (args && args.path) || '.'

const BUGS_SCHEMA = {
  type: 'object',
  properties: {
    bugs: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          file: { type: 'string' },
          line: { type: 'number' },
          description: { type: 'string' },
        },
        required: ['file', 'description'],
      },
    },
  },
  required: ['bugs'],
}

const VERDICT_SCHEMA = {
  type: 'object',
  properties: { real: { type: 'boolean' }, reasoning: { type: 'string' } },
  required: ['real', 'reasoning'],
}

const FINDERS = [
  `Search ${target} for bugs by tracing data flow: pick a few entry points and follow input through the system looking for unvalidated or mistyped data.`,
  `Search ${target} for bugs by reading error handling: every catch/rescue/error-return block — does it actually handle the failure correctly, or silently swallow/misreport it?`,
  `Search ${target} for bugs by checking boundary conditions in loops, array/slice indexing, and pagination logic.`,
]

function bugKey(b) {
  return `${b.file}:${b.line ?? ''}:${b.description.slice(0, 60)}`
}

const seen = new Set()
const confirmed = []
let dryRounds = 0

phase('Find')
while (dryRounds < 2) {
  const rounds = await parallel(
    FINDERS.map((p, i) => () => agent(p, { label: `finder-${i}`, schema: BUGS_SCHEMA }))
  )
  const found = rounds.filter(Boolean).flatMap((r) => r.bugs)
  const fresh = found.filter((b) => !seen.has(bugKey(b)))

  if (!fresh.length) {
    dryRounds++
    log(`Round dry (${dryRounds}/2)`)
    continue
  }

  dryRounds = 0
  fresh.forEach((b) => seen.add(bugKey(b)))
  log(`${fresh.length} new candidates this round, ${seen.size} total`)

  phase('Verify')
  const judged = await parallel(
    fresh.map((b) => () =>
      parallel(
        ['correctness', 'security', 'reproducibility'].map((lens) => () =>
          agent(
            `Judge via the ${lens} lens — is this a real, reproducible bug? Default to real=false if uncertain.\n\n${b.file}:${b.line ?? '?'} — ${b.description}`,
            { schema: VERDICT_SCHEMA }
          )
        )
      ).then((votes) => ({ bug: b, real: votes.filter(Boolean).filter((v) => v.real).length >= 2 }))
    )
  )
  confirmed.push(...judged.filter((j) => j.real).map((j) => j.bug))
  phase('Find')
}

return { confirmed, totalCandidates: seen.size }
