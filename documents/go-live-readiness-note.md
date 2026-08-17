# 🧭 Northstar Support Deflection MVP — Go-Live Readiness Note

**Team:** Group 107 · **Date:** 15/08/2026 · **Status:** ✅ Ready for review

---

## 1. What it does today

A rule-based chatbot that handles **2 of 3** target ticket types without a human:
- 📦 **Order status** — "where's my order," "has it shipped"
- 🔄 **Returns & refunds** — "how do I return this," "when's my refund"

**By the numbers:**

| Metric | Result |
|---|---|
| Ticket types covered | 2 / 3 (order status + returns) ✅ |
| Test phrases run | 10 / 10 passed 🎯 |
| Sample orders in dataset | 15 |
| Board tasks completed | 12 / 12 |
| Bugs found & fixed during QA | 2 🐛→✅ |

---

## 2. ✅ What works

- **Order lookup** — resolves any valid order ID to its live status (`Delivered`, `Shipped`, `Pending`, `Cancelled`), case-insensitive.
- **Return eligibility** — correctly distinguishes eligible vs. ineligible returns using a 30-day-from-delivery window (inclusive), tested against a boundary case (exactly 30 days).
- **Graceful fallback** — unrelated input (e.g. "hello") never crashes or returns blank; it prompts the user toward what the bot *can* help with.
- **End-to-end demo** — confirmed live over real HTTP fetch (not a workaround): type a question with an order ID → get the correct answer, for both ticket types, with zero manual intervention.

---

## 3. 🚧 What's known-broken / out of scope

- **No multi-turn memory** — if the bot asks *"what's your order ID?"* and the user replies in a **separate** message, it's not recognized. Works only when the ID is in the *same* message as the question (e.g. `"where's my order ORD1001"`). Documented, not silently missing.
- **Stock availability (ticket type 3)** — not built this sprint, out of scope by team decision.
- **No condition-based partial refunds or final-sale exclusions** — considered during Task 2, deliberately deferred to keep scope shippable in the time available.
- **English-only, no typo tolerance** — phrasing must roughly match the patterns coded; no fuzzy matching yet.

---

## 4. 🔧 What Northstar's team needs to run this without us

1. **Run it:** serve the project root with any local HTTP server (`npx serve`, Python's `http.server`, or VS Code Live Server) — opening `index.html` directly will **not** work (CORS blocks the dataset fetch). Full steps in `README.md`.
2. **Update orders:** edit `mock-order/mock_order_dataset.csv` directly — columns are `ID, Item, Status, Ship Date, Delivered Date`.
3. **Add new phrasing:** edit the pattern arrays in `src/intents/orderStatusIntent.js` or `returnRefundIntent.js` — no other code changes needed.
4. **Full test coverage:** see `tests/qa-log.md` for all 10 test cases and results.

---

## 5. 🔭 Suggested next steps (not in scope, worth flagging)

- Connect to Northstar's real order database instead of the mock CSV
- Add stock-availability as ticket type 3
- Add follow-up/multi-turn memory for a more natural conversation
- Add fuzzy matching for typos and misspellings

---

**Reviewed and agreed by:** ☐ Tobias · ☐ Danlon · ☐ Lucas · ☐ Modercai
