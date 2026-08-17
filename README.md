# Northstar Support Deflection MVP — Group 107

A rule-based chatbot that handles two Northstar Retail ticket types without a human:
- **Order status** ("where's my order", "has it shipped")
- **Returns & refunds** ("how do I return this", "when's my refund")

Built for the Northstar Sprint — see `documents/Group 107 northstar sprint.md` for the team charter, board, and architecture.

## Prerequisites

- A modern web browser (Chrome, Firefox, Edge)
- A way to serve local files over HTTP — **you cannot just double-click `index.html`**, because the app fetches the CSV dataset, and browsers block that (CORS) when opening a file directly from disk.

You need one of the following installed. If you already have Node.js, VS Code, or Python, you have what you need:

| Option | Command |
|---|---|
| Node.js (`npx`) | `npx serve` |
| VS Code | Install the "Live Server" extension, right-click `src/ui/index.html` → "Open with Live Server" |
| Python 3 | `python3 -m http.server` |

## How to run the prototype

1. Clone or download this repository.
2. Open a terminal in the project's root folder (`Northstar-sprint-chatbot/`).
3. Start a local server using one of the options above. For example, with Node:
   ```
   npx serve
   ```
4. Open the URL it gives you (usually `http://localhost:3000` or similar) in your browser.
5. Navigate to `src/ui/index.html` in that URL, e.g. `http://localhost:3000/src/ui/index.html`.
6. You should see the Northstar Support Bot chat window. Type a question, or click one of the quick-action buttons.

## Try it out

Type any of these into the chat box:
- `where's my order ORD1001`
- `has ORD1013 shipped`
- `how do I return ORD1001`
- `when's my refund for ORD1003`
- `hello` (to see the fallback response)

Full test coverage and results are in `tests/qa-log.md`.

## Project structure

```
Northstar-sprint-chatbot/
├── mock-order/
│   └── mock_order_dataset.csv     ← sample order data (15 fake orders)
├── src/
│   ├── orderLookup.js             ← looks up an order's status by ID
│   ├── returnEligibility.js       ← 30-day return-eligibility rule
│   ├── intents/
│   │   ├── orderStatusIntent.js   ← matches order-status phrases
│   │   └── returnRefundIntent.js  ← matches return/refund phrases
│   ├── fallback.js                ← graceful response for unmatched input
│   ├── chatbot.js                 ← wires everything together (the entry point)
│   └── ui/
│       ├── index.html             ← the chat window
│       ├── style.css
│       └── app.js                 ← connects the UI to chatbot.js
├── tests/
│   └── qa-log.md                  ← manual QA results
└── documents/
    ├── Group 107 northstar sprint.md   ← charter, board, architecture
    ├── return-eligibility-rules.md     ← the written return policy
    └── go-live-readiness-note.md       ← what works, what's broken, handoff notes
```

## How to update the order dataset

Edit `mock-order/mock_order_dataset.csv` directly. It needs these columns: `ID, Item, Status, Ship Date, Delivered Date`. Status should be one of `Shipped`, `Delivered`, `Pending`, or `Cancelled`. Only `Delivered` orders with a `Delivered Date` are checked against the return-eligibility window.

## How to add new phrases the bot understands

- For order-status phrasing: edit `ORDER_STATUS_PATTERNS` in `src/intents/orderStatusIntent.js`.
- For return/refund phrasing: edit `RETURN_REFUND_PATTERNS` in `src/intents/returnRefundIntent.js`.

Both are arrays of regular expressions — add a new pattern to the array to recognize a new way of asking the same question.

## Known limitations

See `documents/go-live-readiness-note.md` for the full list. The short version: the bot doesn't remember context between messages, so the order ID must be included in the same message as the question (e.g. `"where's my order ORD1001"`, not `"where's my order"` followed by `"ORD1001"` as a separate message).
