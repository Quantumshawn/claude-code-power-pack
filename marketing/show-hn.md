# Show HN draft

Post at https://news.ycombinator.com/submit (must be logged in). Title field and URL field are separate from the text body — Show HN posts can either link to the site directly (title field references "Show HN:") or be a text post; linking to the site is standard for this kind of thing.

**Important HN norms, different from Reddit:**
- No emoji, no "🧵", no hype language at all — HN's culture actively downvotes anything that reads like marketing copy.
- Be specific and factual. Technical detail earns credibility; adjectives ("powerful," "game-changing") cost it.
- You (the account owner) should actually reply to comments promptly for the first hour or two — HN ranking rewards threads with real founder engagement, and the audience will ask pointed/skeptical questions about a paid product. Be ready for "why isn't this free/open source" type comments and answer plainly rather than defensively.
- Posting time matters a lot: weekday mornings US Eastern (roughly 7-9am ET) tend to get the most initial traffic to build momentum.

---

**Title:** Show HN: Claude Code Power Pack – skills, hooks, and multi-agent workflows for Claude Code

**URL:** https://claude-power-pack.vercel.app/

**First comment (post this yourself immediately after submitting, HN expects the OP to add context):**

Hi HN — I've been using Claude Code daily and kept re-explaining the same standards every session (commit message format, what makes a good PR description, when a "refactor" is secretly a behavior change). I packaged the ones that actually held up into reusable skills, plus some hook recipes and three multi-agent workflow scripts (parallel code review with adversarial verification, loop-until-dry bug hunting, and a migration workflow that uses worktree isolation so parallel edits don't collide).

One full skill is shown on the page itself so you can judge the quality before paying anything — it's a $15 one-time zip, no subscription. Delivery is automated: Stripe checkout → a small serverless function verifies the payment server-side → download releases only after that check passes.

Happy to go into the design reasoning behind any specific skill or workflow script — genuinely interested in what people who've built their own Claude Code tooling would change.
