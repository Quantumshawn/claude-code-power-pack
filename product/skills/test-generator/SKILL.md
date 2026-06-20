---
name: test-generator
description: Write tests for a specific function, file, or recent diff, matching the project's existing test framework and style. Use when the user asks to "write tests for this", "add test coverage", or "test this function".
---

# Test Generator

The goal is tests that would actually catch a regression, not tests that exist to pad a coverage number.

## Process

1. Identify the test framework already in use (check package.json/pyproject.toml/go.mod and an existing test file) — never introduce a second framework into a project that already has one.
2. Read the target code fully, including its callers, before writing tests. Understand what it's *for*, not just its signature.
3. Prioritize, in order:
   - The documented/obvious happy path
   - Boundary conditions specific to this code (off-by-one ranges, empty collections, the specific edge cases the logic branches on — derived from reading the actual conditionals, not a generic checklist)
   - Error paths that the code explicitly handles (a try/catch, a validation check, a returned error)
4. Do not write a test for a condition the code can't actually reach (e.g. testing a null-check on a parameter that's typed as non-nullable and has no callers passing null).
5. Mock only at the boundary the project already mocks at (check existing tests). Don't mock the thing under test, and don't introduce mocking of internals that the existing suite calls directly.
6. Name tests by behavior, not implementation: `returns_empty_list_when_no_matches`, not `test_function_2`.
7. Run the new tests before declaring done. If the project's test runner isn't already known, find and use the existing script (`npm test`, `pytest`, `go test ./...`) rather than inventing a new invocation.

## Anti-patterns to avoid

- Snapshot tests for logic that should have explicit assertions.
- Asserting on internal implementation details (private state, call counts) when an assertion on observable output would do.
- One giant test covering five behaviors — split by behavior so failures are diagnosable.
