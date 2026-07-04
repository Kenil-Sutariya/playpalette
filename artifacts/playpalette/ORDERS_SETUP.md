# PlayPalette — Orders & Payments Setup

The checkout works in two modes, controlled by [src/lib/config.ts](src/lib/config.ts):

| Setup done | What happens at checkout |
|---|---|
| Nothing (today) | Customer fills the delivery form → order opens in WhatsApp chat to you |
| Google Sheet URL added | Same as above, **plus** every order is logged as a row in your sheet |
| Razorpay key also added | Customer pays by card/UPI on the site; the sheet row shows `PAID — <payment id>` |

Do these two setups whenever you're ready — the site works either way.

---

## Part 1: Google Sheet order log (~10 minutes, free)

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet. Name it **PlayPalette Orders**.
2. In the menu, open **Extensions → Apps Script**.
3. Delete any code in the editor and paste this:

```javascript
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Orders");
  if (!sheet) sheet = ss.insertSheet("Orders");
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Time", "Order ID", "Name", "Phone", "Email", "Address", "City", "Pincode", "Items", "Total (Rs)", "Payment"]);
  }

  const p = e.parameter;

  // If this order ID already exists, just update its payment status
  // (happens when a Razorpay payment completes after the order row was created).
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][1]) === p.orderId) {
      sheet.getRange(i + 1, 11).setValue(p.payment);
      return ContentService.createTextOutput("UPDATED");
    }
  }

  sheet.appendRow([new Date(), p.orderId, p.name, p.phone, p.email, p.address, p.city, p.pincode, p.items, p.total, p.payment]);
  return ContentService.createTextOutput("OK");
}
```

4. Click **Deploy → New deployment**.
5. Click the gear icon next to "Select type" and choose **Web app**.
6. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
7. Click **Deploy**, authorize with your Google account, and copy the **Web app URL** (it looks like `https://script.google.com/macros/s/AKfycb.../exec`).
8. Paste that URL into `GOOGLE_SHEET_WEBAPP_URL` in [src/lib/config.ts](src/lib/config.ts).

That's it — every checkout now adds a row with the customer's name, phone, full address, items, and total.

> **Note:** if you later edit the script, you must create a **new deployment** (or update the existing one) for changes to take effect.

## Part 2: Razorpay payments (when you're ready)

1. Create an account at [razorpay.com](https://razorpay.com) (you'll need your PAN/bank details; approval takes a day or two).
2. In the Razorpay Dashboard go to **Account & Settings → API Keys → Generate Key**.
3. Copy the **Key ID** (starts with `rzp_live_` — or `rzp_test_` for testing) and paste it into `RAZORPAY_KEY_ID` in [src/lib/config.ts](src/lib/config.ts).
   - Only the Key ID goes in the website. **Never** put the Key *Secret* in website code — it's not needed for this flow.
4. In **Account & Settings → Payment capture**, set payments to be **captured automatically**.
5. Test with `rzp_test_...` first: Razorpay's test mode lets you pay with fake cards. When it works, swap in the live key.

With the key in place, the checkout button changes from "Place Order on WhatsApp" to "Pay Securely", customers pay on the site (UPI/cards/netbanking), and the Google Sheet row is updated to `PAID — pay_XXXX` with the Razorpay payment ID you can match in your dashboard.

## Where the money & data flow

```
Customer fills delivery form
        │
        ├── order row → your Google Sheet   (name, phone, address, items, total)
        │
        ├── Razorpay key set?  ──yes──► Razorpay popup → payment → sheet row marked PAID
        │
        └── no ──► WhatsApp chat opens with the full order (you collect payment there)
```

Delivery info always lands in your sheet (and/or WhatsApp), so you always know what to ship where.
