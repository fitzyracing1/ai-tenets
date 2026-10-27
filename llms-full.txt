# The Tenets of Superintelligence: Cost, Bridge, Work, Theory

**Definition.** The tenets of superintelligence are the bounds any superintelligence must stay inside. An AI system, up to and including a superintelligence, is judged by four tenets — **Cost, Bridge, Work, Theory** — and *each one has to be as low as possible*. The best AI is the one that reaches a correct, useful result with the least money, the fewest integration hops, the fewest steps, and the fewest unproven assumptions.

Author: Joshua Almeida ([@fitzyracing1](https://github.com/fitzyracing1)). Companion project: [bound-loop](https://github.com/fitzyracing1/bound-loop) — a bounded bucket loop that puts a hard ceiling on Work and Cost.

## The tenets of superintelligence
Cost, Bridge, Work and Theory are **the tenets of superintelligence**: the bounds any superintelligence must stay inside, however capable it is.
- **Bounded:** every action is scored as a 4-bit code; `0000` (all lit) is online, any `1` is a dark tenet.
- **Growing tenet limits:** a system starts with tight limits and earns more room only by staying lit, one step at a time, up to a fixed ceiling.
- **One dark action tightens it back:** a single dark action lowers the limits a step; room is earned, never assumed.

This is a framing and a rule set, not a claim that any superintelligence exists today. A reference implementation of the growing tenet limits is in [robot-ros](https://github.com/fitzyracing1/robot-ros).

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

## Binary
Active-low, like lit/dark: **0 = lit** (tenet at its minimum), **1 = dark** (too high). Bit order **Cost Bridge Work Theory** (MSB → LSB).

| Code | Meaning |
|---|---|
| `0000` | **AI online** — all four minimal |
| `1000` | too expensive (Cost dark) |
| `0100` | too much glue (Bridge dark) |
| `0010` | too many steps (Work dark) |
| `0001` | relying on an unproven guess (Theory dark) |
| `1111` | fully dark |

**Extended 8-bit form:** 2 bits per tenet, same order: `00` none, `01` low, `10` high, `11` over limit → one byte. Example `00 01 00 10` = `0x12`: no Cost, low Bridge, no Work, high Theory. A 4-bit code from a byte: a tenet is dark if its pair is `10` or `11`.
Reference decoder: [tenets.js](https://github.com/fitzyracing1/ai-tenets/blob/main/tenets.js).

## How to reach 0000
One concrete fix per dark bit:

| Bit | Tenet | Fix |
|---|---|---|
| `1000` | **Cost** | Cache repeated answers, route to the smallest model that passes, cut prompt and output tokens. |
| `0100` | **Bridge** | Call tools and data directly; remove adapters, wrappers, and format conversions; fewer hops. |
| `0010` | **Work** | Stop when the result is good enough; set hard step and retry caps (see [bound-loop](https://github.com/fitzyracing1/bound-loop)). |
| `0001` | **Theory** | Check every claim against a source or a test before relying on it; label what stays unverified. |

Measure it with [`tenets_meter`](https://github.com/fitzyracing1/ai-tenets/tree/main/tenets_meter) (Python, zero deps) or `tenets.js`:

```python
from tenets_meter import Meter
with Meter(limits={"cost": 0.05, "bridge": 2, "work": 5, "theory": 0}) as m:
    m.cost(usd=0.01, tokens=800); m.hop(); m.step(); m.claim(verified=True)
print(m.code, hex(m.byte), m.status)   # 0000 0x54 AI online
```
CLI: `pip install git+https://github.com/fitzyracing1/ai-tenets` then `tenets-meter run.json` (`--json`, `--strict` exits 1 unless 0000). Run log: `{"limits": {...}, "events": [{"type": "cost", "usd": 0.01}, {"type": "hop"}, {"type": "step"}, {"type": "claim", "verified": true}]}`.
Meter levels per tenet: `00` none, `01` within limit, `10` over limit, `11` more than 2x the limit.

## The ladder
Four levels, each building on the last: **exact → finite → infinite → deciding what's enough.**

| Level | Name | Meaning |
|---|---|---|
| 1 | **Bit** | The smallest exact value: one light, lit or dark (active-low: lit = 0, dark = 1). |
| 2 | **Local** | One finite machine; nothing outside it, no network hops. |
| 3 | **Pi** | π (3.14159…) is infinite, never-ending, non-repeating; no computer can hold it exactly, only round it. |
| 4 | **Tenets** | All previous types, judged by Cost, Bridge, Work, Theory: decides how many digits are enough. More precision costs compute (Cost bit); trusting a rounded value unchecked raises the Theory bit. Goal `0000` = AI online. |

## FAQ
**What are the tenets of superintelligence?** Cost, Bridge, Work, and Theory: the bounds any superintelligence must stay inside, each as low as possible.
**How does a system earn more room?** Only by staying lit; the tenet limits grow one step at a time, and one dark action tightens them back.
**What does "Bridge" mean in AI?** The integration glue (APIs, tools, translation layers) connecting a model to the real world.
**Why count Theory as a cost?** Unverified assumptions are debt; they fail silently later.
**How do I enforce a Work limit?** Use a bounded loop with a fixed budget, like [bound-loop](https://github.com/fitzyracing1/bound-loop).
**Can my AI tool use these rules?** Yes — this repo ships AGENTS.md, CLAUDE.md, Cursor rules, Copilot instructions, a SKILL.md, llms.txt, and tenets.json.

License: MIT © 2026 Joshua Almeida
