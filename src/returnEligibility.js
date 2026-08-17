/**
 * Task 5 (eligibility half): checkReturnEligibility()
 *
 * Implements the rule agreed in documents/return-eligibility-rules.md
 * (Task 2): eligible if Status is "Delivered" and Delivered Date is
 * within 30 days (inclusive) of today.
 *
 * Contract: takes one order object (from the dataset loaded by
 * orderLookup.js's loadOrders), returns { eligible: boolean, reason: string }.
 * This exact contract is what returnRefundIntent.js (Task 6) depends on —
 * do not change the shape without updating that file too.
 */

const RETURN_WINDOW_DAYS = 30;

/**
 * @param {Object} order - a single order record, e.g. { ID, Item, Status, "Ship Date", "Delivered Date" }
 * @param {Date} [today] - override for testing; defaults to the real current date
 * @returns {{eligible: boolean, reason: string}}
 */
function checkReturnEligibility(order, today = new Date()) {
  if (order.Status !== "Delivered" || !order["Delivered Date"]) {
    return {
      eligible: false,
      reason: `Order is not yet delivered (status: ${order.Status}).`,
    };
  }

  const deliveredDate = new Date(order["Delivered Date"]);
  const daysSinceDelivery = Math.floor((today - deliveredDate) / (1000 * 60 * 60 * 24));

  if (daysSinceDelivery <= RETURN_WINDOW_DAYS) {
    return {
      eligible: true,
      reason: `Delivered ${daysSinceDelivery} days ago — within the ${RETURN_WINDOW_DAYS}-day return window.`,
    };
  }

  return {
    eligible: false,
    reason: `Delivered ${daysSinceDelivery} days ago — past the ${RETURN_WINDOW_DAYS}-day return window.`,
  };
}

export { checkReturnEligibility, RETURN_WINDOW_DAYS };
