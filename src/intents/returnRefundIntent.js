/**
 * Task 6: "How do I return this" / "When's my refund" Intent Matcher
 * Input: raw user text
 * Output: routes to the return flow (Task 5) if matched
 *
 * DoD: Typing 3 test phrases for returns/refunds all route to the
 * return flow.
 *
 * DEPENDENCY NOTE: this file calls checkReturnEligibility(order), which
 * is Task 5's job to implement for real (using Task 2's eligibility rule).
 * A placeholder version is included below so this file is testable end
 * to end right now. Task 5's owner should replace ONLY the placeholder
 * function — keep the same signature so nothing else here needs to change.
 */

// --- Intent detection -----------------------------------------------------

const RETURN_REFUND_PATTERNS = [
  /how.*(do i|can i|to).*return/i,
  /when.*(is|will|'s|does).*refund/i,
  /want.*(to )?return/i,
  /return.*(this|it|my order|ORD\d)/i,
  /refund.*status/i,
  /(get|receive).*(my )?(money|refund)/i,
];

/**
 * Returns true if the input text matches the return/refund intent.
 * @param {string} text - raw user message
 * @returns {boolean}
 */
function matchesReturnRefundIntent(text) {
  return RETURN_REFUND_PATTERNS.some(pattern => pattern.test(text));
}

// --- Order ID extraction (same pattern as Task 4, kept local so this
//     file has no import-order dependency on orderStatusIntent.js) --------

const ORDER_ID_PATTERN = /ORD\d{3,}/i;

function extractOrderId(text) {
  const match = text.match(ORDER_ID_PATTERN);
  return match ? match[0].toUpperCase() : null;
}

// --- PLACEHOLDER for Task 5 -------------------------------------------------
// Replace this function's internals with the real eligibility check.
// Contract: takes one order object (from the dataset), returns
// { eligible: boolean, reason: string }
// Current placeholder rule: eligible if Delivered within 30 days (matches
// the test data mix we built into mock_order_dataset.csv).
function checkReturnEligibility(order) {
  if (order.Status !== "Delivered" || !order["Delivered Date"]) {
    return { eligible: false, reason: `Order is not yet delivered (status: ${order.Status}).` };
  }

  const deliveredDate = new Date(order["Delivered Date"]);
  const today = new Date("2026-08-15"); // sprint "today" — replace with real Date() in production
  const daysSinceDelivery = Math.floor((today - deliveredDate) / (1000 * 60 * 60 * 24));

  if (daysSinceDelivery <= 30) {
    return { eligible: true, reason: `Delivered ${daysSinceDelivery} days ago — within the 30-day return window.` };
  }
  return { eligible: false, reason: `Delivered ${daysSinceDelivery} days ago — past the 30-day return window.` };
}

// --- Routing into the return flow (Task 5) ----------------------------------

/**
 * Handles a return/refund intent end-to-end:
 * - if the message already contains an order ID, check eligibility and respond
 * - if not, ask the user for one
 *
 * @param {string} text - raw user message
 * @param {Array<Object>} orders - loaded order dataset (from Task 3's loadOrders)
 * @returns {string} the bot's response
 */
function handleReturnRefundIntent(text, orders) {
  const orderId = extractOrderId(text);

  if (!orderId) {
    return "No problem — what's your order ID? (e.g. ORD1001)";
  }

  const order = orders.find(o => o.ID.toUpperCase() === orderId);
  if (!order) {
    return `No order found with ID "${orderId}". Please double-check the order number.`;
  }

  const { eligible, reason } = checkReturnEligibility(order);
  if (eligible) {
    return `Good news — order ${orderId} is eligible for return. ${reason} Here's how to start your return: [return instructions link].`;
  }
  return `Order ${orderId} isn't eligible for return right now. ${reason}`;
}

// --- Top-level router (what Task 8 will eventually call) -------------------

/**
 * Given any user message, checks if it matches the return/refund intent
 * and if so, routes it through the flow. Returns null if no match,
 * so Task 8's router can try other intents (order status, fallback, etc.)
 * Matches the same null-on-no-match contract used in Task 4.
 */
function routeReturnRefundMessage(text, orders) {
  if (!matchesReturnRefundIntent(text)) {
    return null; // not our intent — let the router try something else
  }
  return handleReturnRefundIntent(text, orders);
}

export {
  matchesReturnRefundIntent,
  extractOrderId,
  checkReturnEligibility,
  handleReturnRefundIntent,
  routeReturnRefundMessage,
};
