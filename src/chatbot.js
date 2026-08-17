/**
 * Task 8: Wire intent matchers + flows into the UI end-to-end
 *
 * DoD: A full demo run (type question → get correct answer) works for
 * both ticket types without manual intervention.
 *
 * This is the single entry point the UI (Task 7) calls. It:
 * 1. Loads the order dataset once on startup
 * 2. Exposes one function, handleUserMessage(text), that the UI calls
 *    on every message — routes through order-status (Task 4), then
 *    returns/refunds (Task 6), then fallback (Task 9)
 */

import { loadOrders } from "./orderLookup.js";
import { routeOrderStatusMessage } from "./intents/orderStatusIntent.js";
import { routeReturnRefundMessage } from "./intents/returnRefundIntent.js";
import { getFallbackResponse } from "./fallback.js";

let ordersCache = null;

/**
 * Loads the dataset once and caches it, so every keystroke/message
 * doesn't re-fetch the CSV. Call this once on page load.
 */
async function initChatbot(csvPath = "../mock-order/mock_order_dataset.csv") {
  ordersCache = await loadOrders(csvPath);
  return ordersCache;
}

/**
 * The single function the UI calls for every user message.
 * Never throws — always returns a string response.
 * @param {string} text - raw user input
 * @returns {string} the bot's response
 */
function handleUserMessage(text) {
  if (!ordersCache) {
    return "The chatbot is still starting up — please try again in a moment.";
  }
  if (!text || !text.trim()) {
    return getFallbackResponse();
  }

  const orderStatusResponse = routeOrderStatusMessage(text, ordersCache);
  if (orderStatusResponse !== null) {
    return orderStatusResponse;
  }

  const returnRefundResponse = routeReturnRefundMessage(text, ordersCache);
  if (returnRefundResponse !== null) {
    return returnRefundResponse;
  }

  return getFallbackResponse();
}

export { initChatbot, handleUserMessage };
