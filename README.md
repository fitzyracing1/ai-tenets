# AI Tenets — Cost, Bridge, Work, Theory

AI defined by four tenets. **Each one has to be as low as possible.**

| Tenet | Means | Measure |
|---|---|---|
| **Cost** | money/compute per answer | $ or tokens per answer |
| **Bridge** | glue/integration hops to the real world | hops / tool calls |
| **Work** | steps, retries, loops | steps per task |
| **Theory** | unproven assumptions | unverified claims |

- 📜 Canonical rules: [RULES.md](RULES.md)
- 🌐 Website: https://fitzyracing1.github.io/ai-tenets/
- 🔁 Related: [bound-loop](https://github.com/fitzyracing1/bound-loop) (bounded bucket loop)
- 🧾 Machine-readable: [tenets.json](tenets.json), [llms.txt](llms.txt)

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

## Use with your AI tools
AGENTS.md (Codex, many agents) · CLAUDE.md (Claude Code) · .cursor/rules/ai-tenets.mdc (Cursor) · .github/copilot-instructions.md (GitHub Copilot) · skills/ai-tenets/SKILL.md (agent skills). Copy any into your project.

MIT © 2026 Joshua Almeida
