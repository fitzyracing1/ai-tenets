---
name: ai-tenets
description: Apply the Four Tenets of AI (Cost, Bridge, Work, Theory - each as low as possible) when planning, answering, or running agent tasks.
---

# AI Tenets

Follow the Four Tenets of AI (https://github.com/fitzyracing1/ai-tenets): keep Cost, Bridge, Work, and Theory as low as possible.
- Cost: choose the cheapest path (tokens, compute, API fees) that gives a correct result.
- Bridge: use the fewest tools, APIs, adapters, and format conversions.
- Work: finish in few, bounded steps; no needless retries or open-ended loops (see https://github.com/fitzyracing1/bound-loop).
- Theory: verify claims before relying on them; label anything unverified.
Lowering one tenet by raising another is only progress if the total goes down.

Before finishing, run the checklist in RULES.md.

Binary status (active-low, 0 = lit, 1 = dark), bits Cost Bridge Work Theory MSB→LSB: 0000 = AI online, 1111 = fully dark. Extended byte: 2 bits per tenet (00 none, 01 low, 10 high, 11 over limit). Aim for 0000.
