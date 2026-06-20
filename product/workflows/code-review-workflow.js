export const meta = {
  name: 'multi-dimension-review',
  description: 'Review the current diff across correctness, security, and performance in parallel, then adversarially verify each finding before reporting it.',
  phases: [
    { title: 'Review', detail: 'one agent per dimension' },
    { title: 'Verify', detail: 'adversarial check on every finding' },
  ],
}

// Usage: Workflow({ scriptPath: 'code-review-workflow.js' })
// Why this shape: a single reviewer agent tends to anchor on the first issue type
// it finds and under-report the others. Splitting by dimension and verifying
// adversarially catches more real bugs with fewer false positives than one
// big "review everything" prompt.

const FINDINGS_SCHEMA = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          file: { type: 'string' },
          line: { type: 'number' },
          title: { type: 'string' },
          detail: { type: 'string' },
        },
        required: ['file', 'title', 'detail'],
      },
    },
  },
  required: ['findings'],
}

const VERDICT_SCHEMA = {
  type: 'object',
  properties: {
    real: { type: 'boolean' },
    reasoning: { type: 'string' },
  },
  required: ['real', 'reasoning'],
}

const DIMENSIONS = [
  { key: 'correctness', prompt: 'Review the current diff for correctness bugs: logic errors, off-by-one, wrong edge case handling, broken assumptions. Report only issues you are confident are real bugs, with file and line.' },
  { key: 'security', prompt: 'Review the current diff for security issues: injection, auth/authz gaps, secrets in code, unsafe deserialization, missing input validation at trust boundaries. Report only concrete issues, with file and line.' },
  { key: 'performance', prompt: 'Review the current diff for performance issues: N+1 queries, unnecessary loops over large collections, missing indexes implied by new queries, accidental O(n^2). Report only issues with a real, demonstrable cost, with file and line.' },
]

phase('Review')
const reviews = await parallel(
  DIMENSIONS.map((d) => () => agent(d.prompt, { label: `review:${d.key}`, schema: FINDINGS_SCHEMA }))
)

const allFindings = reviews.filter(Boolean).flatMap((r) => r.findings)
log(`${allFindings.length} candidate findings across ${DIMENSIONS.length} dimensions`)

phase('Verify')
const verified = await parallel(
  allFindings.map((f) => () =>
    agent(
      `Adversarially verify this code review finding. Try to refute it — default to real=false if you are not confident it is a genuine, reproducible issue.\n\nFinding: ${f.title}\nFile: ${f.file}:${f.line ?? '?'}\nDetail: ${f.detail}`,
      { label: `verify:${f.file}`, schema: VERDICT_SCHEMA }
    ).then((v) => ({ ...f, verdict: v }))
  )
)

const confirmed = verified.filter(Boolean).filter((f) => f.verdict?.real)
log(`${confirmed.length}/${allFindings.length} findings confirmed after adversarial check`)

return { confirmed, rejected: verified.filter(Boolean).filter((f) => !f.verdict?.real) }
