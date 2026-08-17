/**
 * app.js — Task 7 (UI) + Task 9 (fallback display)
 *
 * IMPORTANT: this file does NOT re-implement order lookup, eligibility,
 * or intent matching. All of that already exists, is tested, and is
 * the single source of truth in ../chatbot.js (Task 8), ../orderLookup.js
 * (Task 3), and ../intents/*.js (Tasks 4 & 6). This file only handles
 * display — it calls handleUserMessage() and renders whatever comes back,
 * including the graceful fallback message from Task 9.
 */

import { initChatbot, handleUserMessage } from "../chatbot.js";

const responseArea = document.getElementById("responseDisplay");
const emptyState = document.getElementById("emptyState");
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

/**
 * Renders a single bot message, replacing whatever was shown before —
 * matches the teammate's original single-message display style.
 */
function displayResponse(text) {
  emptyState.style.display = "none";
  chatMessages.style.display = "block";
  chatMessages.innerHTML = "";

  const msgDiv = document.createElement("div");
  msgDiv.className = "msg-item bot-message";
  msgDiv.innerHTML = `<i class="fas fa-robot"></i><span>${text.replace(/\n/g, "<br>")}</span>`;
  chatMessages.appendChild(msgDiv);
  responseArea.scrollTop = 0;
}

function handleSubmit() {
  const raw = userInput.value.trim();
  if (!raw) return;

  // handleUserMessage() never throws and never returns blank — Task 9's
  // fallback covers unmatched input automatically, so no extra handling
  // is needed here.
  const reply = handleUserMessage(raw);
  displayResponse(reply);
  userInput.value = "";
}

// Called by the quick-action buttons in index.html
window.quickAsk = function (phrase) {
  userInput.value = phrase;
  handleSubmit();
};

sendBtn.addEventListener("click", handleSubmit);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSubmit();
});

async function start() {
  await initChatbot(); // loads mock_order_dataset.csv once, per Task 8
  displayResponse(
    "👋 Welcome! I'm Northstar's self-service assistant. Ask about your order " +
    "(e.g. \"where's my order ORD1001\") or returns/refunds. Quick buttons above."
  );
}

start();
