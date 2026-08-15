// --- Load the dataset ----
async function loadOrders(csvPath = "mock_order_dataset.csv") {
  const response = await fetch(csvPath);
  const text = await response.text();

  const [headerLine, ...rows] = text.trim().split("\n");
  const headers = headerLine.split(",").map(h => h.trim());

  return rows.map(row => {
    const values = row.split(",");
    const order = {};
    headers.forEach((header, i) => {
      order[header] = (values[i] || "").trim();
    });
    return order;
  });
}

// --- The lookup function  -----------------------------------------

function getOrderStatus(orderId, orders) {
  const normalizedId = orderId.trim().toUpperCase();
  const match = orders.find(o => o.ID.toUpperCase() === normalizedId);

  if (!match) {
    return `No order found with ID "${orderId}". Please double-check the order number.`;
  }

  return match.Status;
}

async function runExampleTests() {
  const orders = await loadOrders();

  const testIds = ["ORD1001", "ord1007", "ORD9999", "ORD1013"];
  testIds.forEach(id => {
    console.log(`${id} -> ${getOrderStatus(id, orders)}`);
  });
}

export { loadOrders, getOrderStatus };