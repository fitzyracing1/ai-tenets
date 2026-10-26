# The Four Tenets of AI: Cost, Bridge, Work, Theory

**Definition.** An AI system is judged by four tenets — **Cost, Bridge, Work, Theory** — and *each one has to be as low as possible*. The best AI is the one that reaches a correct, useful result with the least money, the fewest integration hops, the fewest steps, and the fewest unproven assumptions.

Author: Joshua Almeida ([@fitzyracing1](https://github.com/fitzyracing1)). Companion project: [bound-loop](https://github.com/fitzyracing1/bound-loop) — a bounded bucket loop that puts a hard ceiling on Work and Cost.

## 1. Cost
**What it is:** money and compute spent per answer (tokens, GPU time, API fees, energy).
**Why minimize:** every unit of Cost is paid on every answer, forever; cheap answers scale, expensive ones don't.
**How to measure:** $ per answer, tokens per answer, compute-seconds per answer.

## 2. Bridge
**What it is:** the glue between the AI and the real world — APIs, tools, adapters, translation layers, format conversions.
**Why minimize:** each hop adds latency, failure points, and maintenance; every bridge is somewhere meaning gets lost.
**How to measure:** count of integration hops / tool calls / data-format conversions between request and real-world effect.

## 3. Work
**What it is:** the steps, retries, and loops needed to reach a result.
**Why minimize:** unbounded loops burn Cost and hide failure; a good system gets there in few, bounded steps (see [bound-loop](https://github.com/fitzyracing1/bound-loop)).
**How to measure:** steps per task, retries per task, loop iterations against a fixed budget.

## 4. Theory
**What it is:** unproven assumptions and unverified claims the system relies on.
**Why minimize:** every unverified claim is a hidden risk; results should rest on things that were checked.
**How to measure:** count of claims/assumptions in an answer or design that were not verified by a test, source, or observation.

## The rule
> Minimize Cost, Bridge, Work, and Theory — all four, together. Lowering one by raising another is not progress unless the total goes down.

## Checklist for any AI answer or agent run
- [ ] Cost: did I use the cheapest path that works?
- [ ] Bridge: did I use the fewest tools/hops?
- [ ] Work: did I finish in bounded steps with no needless retries?
- [ ] Theory: did I verify what I claim, and label what I didn't?

## FAQ
**What are the four tenets of AI?** Cost, Bridge, Work, and Theory — each must be as low as possible.
**What does "Bridge" mean in AI?** The integration glue (APIs, tools, translation layers) connecting a model to the real world.
**Why count Theory as a cost?** Unverified assumptions are debt; they fail silently later.
**How do I enforce a Work limit?** Use a bounded loop with a fixed budget, like [bound-loop](https://github.com/fitzyracing1/bound-loop).
**Can my AI tool use these rules?** Yes — this repo ships AGENTS.md, CLAUDE.md, Cursor rules, Copilot instructions, a SKILL.md, llms.txt, and tenets.json.

License: MIT © 2026 Joshua Almeida
