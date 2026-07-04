// ============================================================
// PlayPalette order & payment configuration
// Full setup instructions: see ORDERS_SETUP.md in the project root.
// The site works without these — orders fall back to WhatsApp.
// ============================================================

// WhatsApp number that receives orders (country code + number, no "+")
export const WHATSAPP_NUMBER = "919723094760";

// Google Apps Script "web app" URL that appends orders to your Google Sheet.
// Leave empty ("") until you finish the Google Sheet setup in ORDERS_SETUP.md.
export const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzhuKf9Sd0VaVZinvZDD6mZe3tNFWzo3SeIMA2VsL9tOBuU7oTMlGQdA7_8J1pWk09tHg/exec";

// Razorpay publishable key id (looks like "rzp_live_..." or "rzp_test_...").
// Leave empty ("") until you create your Razorpay account — checkout will
// use the WhatsApp flow instead so no sales are lost in the meantime.
export const RAZORPAY_KEY_ID = "";

// Shown on the checkout page and used in Razorpay branding.
export const STORE_NAME = "PlayPalette";
export const STORE_THEME_COLOR = "#f97316";
