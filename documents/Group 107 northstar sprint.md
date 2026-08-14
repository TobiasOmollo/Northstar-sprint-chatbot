# Northstar Sprint — Group 107
 
---
 
## 1. Team Charter
 ####
**Team:** Group 107
####
**Date signed:** 14/08/2026
####
**Members:** Tobias Omollo, Danlon Situma, Lucas Madedo,  Mbithi Modercai
 
### Communication
- Primary channel: WhatsApp — Group 107: https://chat.whatsapp.com/C11HrM1zNm4BTFhEY4h4xY
- Working space : Github - https://github.com/TobiasOmollo/Northstar-sprint-chatbot
- Check-in: one short sync per day given the compressed timeframe (agree a fixed time, e.g. end of each work block), async update in the group if someone can't make it
- Response expectation: reply to direct pings within **2 hours** (tight window, matches our shortened sprint)
- The prototype is developed collaboratively form gitHub under the repository
### Deadlines & ownership
- Every board task has exactly one owner. Owner moves its status the same day work happens on it — no batching.
- If a task will miss its estimate, the owner flags it in the WhatsApp group immediately, not at the deadline — with only ~1.5 build days left, delays compound fast.
### Commit / edit convention
Format: `<type>: <what changed> - <why it matters>`
Types: `feat`, `fix`, `docs`, `chore`, `test`
Examples:
- `feat: add order-status lookup by order ID - core flow for ticket type 1`
- `fix: correct refund timeline copy - was showing wrong day count`
Not acceptable: `wip`, `updates`, `stuff`, `misc`
### Escalation path (triggers immediately, not at deadline)
- **No response to a direct WhatsApp ping within 3 hours** during agreed work windows → the person who pinged flags it to the whole group.
- **Zero visible activity (commits + board movement) for 2+ days** → whoever notices pings the individual directly, cc's the group.
- No response within 24 hours of that ping → team lead reassigns the task and logs the incident — this feeds the Day 4 checkpoint and the Peer Reliability Index.
- Disagreement on approach → 10-min discussion in the group chat; if unresolved, the task owner makes the final call on their own task.
### Definition of "done" for the sprint
- Chatbot/decision-tree covers ≥2 ticket types (order status + returns/refunds), demoable start to finish without narration.
- Go-live note exists and is accurate.
- Every board task has a matching commit/edit.
**Signed:** [initials — Name 1] [initials — Name 2] [initials — Name 3] [initials — Name 4]
 
---
 
## 2. Project Board — Group 107 (rule-based chatbot: order-status + returns)
 
Board columns: `Backlog → In Progress → Review → Done`
Every task tagged: Owner | Priority (H/M/L) | Est. hours (≤4) | DoD
 
| # | Task | Owner | Priority | Est. | Definition of Done |
|---|------|-------|----------|------|---------------------|
| 1 | Create mock order dataset (10–15 fake orders: ID, item, status, ship date) | | H | 2h | A JSON/CSV file exists with ≥10 orders, each with a status field, committed to repo |
| 2 | Define return-eligibility rules (window, condition) | | H | 1.5h | A written rule (e.g. "returnable within 30 days of delivery") exists in a doc, agreed by team |
| 3 | Build order-lookup function (input: order ID → output: status) | | H | 3h | Given a valid order ID from the dataset, function returns correct status string |
| 4 | Build "where is my order" intent matcher (keyword/phrase → triggers order flow) | | H | 3h | Typing 3 test phrases ("where's my order", "has it shipped", "track my order") all route to the order-lookup flow |
| 5 | Build return-request flow (asks order ID → checks eligibility → returns instructions or decline reason) | | H | 4h | Given an eligible and an ineligible order ID, flow returns the correct distinct response for each |
| 6 | Build "how do I return this" / "when's my refund" intent matcher | | H | 2.5h | Typing 3 test phrases for returns/refunds all route to the return flow |
| 7 | Build minimal chat UI (input box + response display) | | M | 3h | User can type a message and see a bot response rendered on screen, no console needed |
| 8 | Wire intent matchers + flows into the UI end-to-end | | H | 3h | A full demo run (type question → get correct answer) works for both ticket types without manual intervention |
| 9 | Add fallback response for unmatched input | | M | 1h | Typing an unrelated message (e.g. "hello") returns a graceful fallback, not a crash or blank |
| 10 | Write and commit README with setup/run instructions | | M | 1.5h | A teammate who hasn't touched the code can run the prototype from README alone |
| 11 | Manual QA pass: run 10 test phrases across both flows, log pass/fail | | M | 2h | A test log exists listing each phrase, expected result, actual result |
| 12 | Draft go-live readiness note (see section 3) | | H | 2h | Note is 1 page, covers works/broken/handoff, reviewed by whole team |
 
**Suggested split across 4 members (adjust to actual headcount/strengths):**
- Tobias: Tasks 1, 3, 9
- Danlon: Tasks 2, 5, 11
- Lucas: Tasks 4, 6, 10
- Modercai: Tasks 7, 8, 12
---
 
## 3. Go-Live Readiness Note — Structure (keep to 1 page)
 
**Northstar Support Deflection MVP — Go-Live Readiness Note**
Date: 15/08/2026 (or final submission date) · Team: Group 107
 
**1. What it does today**
- Handles order-status and returns/refunds questions via a rule-based chatbot / decision-tree flow.
- Covers X test scenarios successfully (link to QA log from Task 11).
**2. What works**
- Bullet list, plain language: "Order lookup by order ID returns correct status for all N test orders."
- "Return eligibility check correctly distinguishes in-window vs expired orders."
**3. What's known-broken / out of scope**
- Bullet list, honest: "No handling for partial refunds." / "Only recognizes English phrasing, no typo tolerance." / "Stock availability not covered (out of scope for this sprint)."
**4. What Northstar's team needs to do to run this without us**
- How to add/update the order dataset
- How to add new phrases to the intent matcher
- Where the code lives, how to run it, any dependencies
- Who to contact for questions during a short handoff window (if applicable)
**5. Suggested next steps (not our scope, but worth flagging)**
- e.g. "Connect to real order DB instead of mock JSON" / "Add stock-availability as ticket type 3" / "Add fuzzy matching for typo tolerance"
