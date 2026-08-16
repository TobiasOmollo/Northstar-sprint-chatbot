/**
 * Task 4: "Where is my order" Intent Matcher
 * Input: raw user text
 * Output: routes to the order-lookup flow (Task 3) if matched
 *
 * DoD: Typing 3 test phrases ("where's my order", "has it shipped",
 * "track my order") all route to the order-lookup flow.
 */

// --- Intent detection -----------------------------------------------------

// Keyword/phrase patterns that signal an order-status question.
// Kept broad on purpose: real users won't type the exact 3 test phrases,
// they'll type variations of them.
const ORDER_STATUS_PATTERNS = [
  /where.*(my|is).*order/i,
  /has.*shipped/i,
  /track.*(my )?order/i,
  /order.*status/i,
  /when.*(will|does).*(arrive|deliver)/i,
  /is.*(my )?order.*(shipped|delivered|on the way)/i,
];

/**
 * Returns true if the input text matches the order-status intent.
 * @param {string} text - raw user message
 * @returns {boolean}
 */
function matchesOrderStatusIntent(text) {
  return ORDER_STATUS_PATTERNS.some(pattern => pattern.test(text));
}

// --- Order ID extraction ---------------------------------------------------

// Matches IDs like "ORD1001" anywhere in the message, case-insensitive.
const ORDER_ID_PATTERN = /ORD\d{3,}/i;

/**
 * Pulls an order ID out of free text, if present.
 * @param {string} text - raw user message
 * @returns {string|null}
 */
function extractOrderId(text) {
  const match = text.match(ORDER_ID_PATTERN);
  return match ? match[0].toUpperCase() : null;
}

// --- Routing into the order-lookup flow (Task 3) ---------------------------

/**
 * Handles an order-status intent end-to-end:
 * - if the message already contains an order ID, look it up immediately
 * - if not, ask the user for one (real flow would wait for their reply;
 *   here we return the prompt as the response)
 *
 * @param {string} text - raw user message
 * @param {Array<Object>} orders - loaded order dataset (from Task 3's loadOrders)
 * @param {Function} getOrderStatus - the Task 3 lookup function
 * @returns {string} the bot's response
 */
function handleOrderStatusIntent(text, orders, getOrderStatus) {
  const orderId = extractOrderId(text);

  if (!orderId) {
    return "Sure, I can check that. What's your order ID? (e.g. ORD1001)";
  }

  const status = getOrderStatus(orderId, orders);
  return `Order ${orderId}: ${status}`;
}

// --- Top-level router (what Task 8 will eventually call) -------------------

/**
 * Given any user message, checks if it matches the order-status intent
 * and if so, routes it through the flow. Returns null if no match,
 * so Task 8's router can try other intents (returns, fallback, etc.)
 */
function routeOrderStatusMessage(text, orders, getOrderStatus) {
  if (!matchesOrderStatusIntent(text)) {
    return null; // not our intent — let the router try something else
  }
  return handleOrderStatusIntent(text, orders, getOrderStatus);
}

export {
  matchesOrderStatusIntent,
  extractOrderId,
  handleOrderStatusIntent,
  routeOrderStatusMessage,
};
