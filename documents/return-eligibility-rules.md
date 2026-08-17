# Return Eligibility Rules — Group 107

**Task:** 2 — Define return-eligibility rules (window, condition)
**Owner:** Danlon
**Status:** Draft — needs team sign-off before Task 5 treats it as final

## The rule

> An order is eligible for return if it has a status of **Delivered**, and the current date is **within 30 days (inclusive) of the Delivered Date**.

**Boundary decision:** the 30th day counts as still eligible (inclusive), not the 31st. This was chosen deliberately so ORD1013 in our test dataset (delivered exactly 30 days before "today") is a genuine edge case that proves the boundary works, rather than an ambiguous one.

## What makes an order ineligible

An order is **not** eligible if any of the following are true:
- Status is not `Delivered` (e.g. still `Shipped`, `Pending`, or `Cancelled` — nothing to return yet)
- Delivered more than 30 days ago
- No `Delivered Date` recorded (treated as not yet delivered)

## Out of scope for this sprint (flagged, not built)

These were considered but intentionally left out to keep Task 5 shippable in the time available. Documented here so they're visible in the go-live note rather than silently missing:
- Condition-based partial refunds (e.g. reduced refund for damaged packaging, missing accessories, visible wear)
- Final-sale / non-returnable item exclusions (e.g. certain SKUs never eligible regardless of window)
- Reason-for-return capture (defective vs. changed mind, etc.)

If time allows after Task 11 (QA) passes clean, these could be added as an enhancement — they don't require changing the eligibility function's contract, only its internal logic.

## Agreed by team
- [ ] Tobias
- [ ] Danlon
- [ ] Lucas
- [ ] Modercai
