# QA Log — Task 11

**Tester:** [name] · **Date:** [date] · **Tested against:** production files in `src/` (not a mock/duplicate)

Ran 10 test phrases across both flows through the real, wired `chatbot.js` router (order-status intent → return/refund intent → fallback), using the actual `mock_order_dataset.csv`.

| # | Phrase | Expected Result | Actual Result | Pass/Fail |
|---|--------|-----------------|----------------|-----------|
| 1 | where's my order | Order status flow: prompts for order ID | Sure, I can check that. What's your order ID? (e.g. ORD1001) | PASS |
| 2 | where's my order ORD1001 | Order status flow: returns 'Delivered' | Order ORD1001: Delivered | PASS |
| 3 | has ORD1013 shipped | Order status flow: returns 'Delivered' | Order ORD1013: Delivered | PASS |
| 4 | track my order ORD9999 | Order status flow: graceful not-found message | Order ORD9999: No order found with ID "ORD9999". Please double-check the order number. | PASS |
| 5 | order status ORD1002 | Order status flow: returns 'Shipped' | Order ORD1002: Shipped | PASS |
| 6 | how do I return this | Return flow: prompts for order ID | No problem — what's your order ID? (e.g. ORD1001) | PASS |
| 7 | how do I return ORD1001 | Return flow: eligible (within 30-day window) | Good news — order ORD1001 is eligible for return. Delivered 26 days ago — within the 30-day return window. | PASS |
| 8 | when's my refund for ORD1003 | Return flow: ineligible (past 30-day window) | Order ORD1003 isn't eligible for return right now. Delivered 73 days ago — past the 30-day return window. | PASS |
| 9 | I want to return ORD1002 | Return flow: ineligible (not yet delivered) | Order ORD1002 isn't eligible for return right now. Order is not yet delivered (status: Shipped). | PASS |
| 10 | hello | Neither flow matches: graceful fallback message | Sorry, I didn't quite catch that. I can help with order status... | PASS |

**Result: 10/10 PASS**

## Bugs found and fixed during this QA pass

Two real bugs were caught and fixed while running this log, worth recording since they were genuine, not hypothetical:

1. **Missing import in `orderStatusIntent.js`** — the file called `getOrderStatus()` without importing it from `orderLookup.js`. Would have crashed on any order-status question that included an order ID. Fixed by adding `import { getOrderStatus } from "../orderLookup.js";`.
2. **Parameter shadowing in `handleOrderStatusIntent`** — a function parameter named `getOrderStatus` shadowed the imported function of the same name, causing it to be `undefined` at call time. Fixed by removing the redundant parameter so the function relies on the module-level import.

## Known gaps (not covered by this pass, out of scope for the sprint)
- Multi-turn conversation (bot asks for order ID, user replies in a *separate* message) — documented as a known limitation, see go-live note.
- Condition-based partial refunds and final-sale exclusions — considered in Task 2's rule doc, deliberately left out of this sprint's scope.
