# PlayPalette — Orders & Payments Setup

The checkout works in two modes, controlled by [src/lib/config.ts](src/lib/config.ts):

| Setup done | What happens at checkout |
|---|---|
| Nothing | Customer fills the delivery form → order opens in WhatsApp chat to you |
| Google Sheet URL added | Same as above, **plus** every order is logged as a row in your sheet |
| Razorpay key also added | Customer pays by card/UPI on the site; the sheet row shows `PAID — <payment id>` |

---

## Part 1: Google Sheet order log (~10 minutes, free)

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet. Name it **PlayPalette Orders**.
2. In the menu, open **Extensions → Apps Script**.
3. Delete any code in the editor and paste the full script from the
   [Apps Script code](#apps-script-code) section below.
4. Click **Deploy → New deployment**.
5. Click the gear icon next to "Select type" and choose **Web app**.
6. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone (exactly "Anyone", *not* "Anyone with Google account")
7. Click **Deploy**, authorize with your Google account, and copy the **Web app URL** (it looks like `https://script.google.com/macros/s/AKfycb.../exec`).
8. Paste that URL into `GOOGLE_SHEET_WEBAPP_URL` in [src/lib/config.ts](src/lib/config.ts).

> **Note:** whenever you edit the script, changes only go live after
> **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**.
> Editing alone is not enough.

## Part 2: Referral / coupon codes

Codes live in a second tab of the same spreadsheet — the website never
contains any codes; Apps Script is the only source of truth.

1. Add a sheet tab named exactly **ReferralCodes** with these columns:

   | A: Code | B: Owner | C: DiscountType | D: DiscountValue | E: Status | F: UsageCount |
   |---|---|---|---|---|---|
   | PLAY10 | PlayPalette | percentage | 10 | Active | 0 |
   | WELCOME100 | Launch Campaign | fixed | 100 | Active | 0 |

   - **DiscountType:** `percentage` (DiscountValue = % off) or `fixed` (DiscountValue = ₹ off)
   - **Status:** `Active` to enable; anything else (e.g. `Paused`) disables the code
   - **UsageCount:** starts at 0; the script increments it on every placed order that uses the code

2. Make sure the deployed script is the current version from this file (it
   contains the `doGet` validation endpoint). Redeploy a **New version** if needed.

How it behaves on the site: the customer enters a code at checkout and clicks
**Apply** to preview the discount (doesn't count usage). When they click
**Place Order**, the code is re-validated authoritatively and UsageCount is
incremented. Invalid codes never block an order — the customer just pays the
regular price.

## Part 3: Razorpay payments (when you're ready)

1. Create an account at [razorpay.com](https://razorpay.com) (approval takes a day or two).
2. Dashboard → **Account & Settings → API Keys → Generate Key**.
3. Copy the **Key ID** (`rzp_live_...` / `rzp_test_...`) into `RAZORPAY_KEY_ID` in [src/lib/config.ts](src/lib/config.ts).
   - Only the Key ID goes in the website. **Never** put the Key *Secret* in website code.
4. In **Account & Settings → Payment capture**, set payments to be **captured automatically**.
5. Test with `rzp_test_...` first, then swap in the live key.

With the key set, customers pay the **discounted** amount on the site and the
sheet row updates to `PAID — pay_XXXX`.

## Apps Script code

```javascript
const ORDER_HEADERS = [
  "Time", "Order ID", "Name", "Phone", "Email", "Address", "City", "Pincode",
  "Items", "Total (Rs)", "Payment", "Referral Code", "Discount (Rs)", "Final Amount (Rs)"
];

// Handles order logging (POST from the checkout form).
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Orders");
  if (!sheet) sheet = ss.insertSheet("Orders");
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(ORDER_HEADERS);
  } else if (!sheet.getRange(1, 12).getValue()) {
    // Older sheet without referral columns — add the new headers.
    sheet.getRange(1, 12, 1, 3).setValues([["Referral Code", "Discount (Rs)", "Final Amount (Rs)"]]);
  }

  const p = e.parameter;

  // If this order ID already exists, just update its payment status
  // (happens when a Razorpay payment completes after the order was logged).
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][1]) === p.orderId) {
      sheet.getRange(i + 1, 11).setValue(p.payment);
      return ContentService.createTextOutput("UPDATED");
    }
  }

  sheet.appendRow([
    new Date(), p.orderId, p.name, p.phone, p.email, p.address, p.city, p.pincode,
    p.items, p.total, p.payment, p.referralCode || "", p.discount || "", p.finalAmount || ""
  ]);
  return ContentService.createTextOutput("OK");
}

// Handles referral code validation (GET from the checkout form).
// ?action=validate&code=PLAY10&total=1198&commit=0|1
// commit=1 increments UsageCount — the site sends it only when the order is placed.
function doGet(e) {
  const p = e.parameter || {};
  if (p.action === "validate") {
    return jsonResponse(validateCode(p.code, Number(p.total) || 0, p.commit === "1"));
  }
  return jsonResponse({ ok: true });
}

function validateCode(rawCode, total, commit) {
  const code = String(rawCode || "").trim().toUpperCase();
  if (!code) return { valid: false, message: "No code provided." };

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ReferralCodes");
  if (!sheet) return { valid: false, message: "Referral codes are not set up yet." };

  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim().toUpperCase() !== code) continue;

    if (String(data[i][4]).trim().toLowerCase() !== "active") {
      return { valid: false, message: "This code is no longer active." };
    }

    const discountType = String(data[i][2]).trim().toLowerCase();
    const discountValue = Number(data[i][3]) || 0;
    let discount = discountType === "percentage"
      ? Math.round(total * discountValue / 100)
      : Math.round(discountValue);
    if (discount > total) discount = total;

    if (commit) {
      sheet.getRange(i + 1, 6).setValue((Number(data[i][5]) || 0) + 1);
    }

    return {
      valid: true,
      discountType: discountType,
      discountValue: discountValue,
      discount: discount,
      finalAmount: total - discount
    };
  }
  return { valid: false, message: "Invalid referral code." };
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Where the money & data flow

```
Customer fills delivery form (+ optional referral code)
        │
        ├── code validated by Apps Script against the ReferralCodes tab
        │     valid → discounted total, UsageCount +1 on order
        │     invalid → regular price, order continues anyway
        │
        ├── order row → your Google Sheet (customer, items, code, discount, final amount)
        │
        ├── Razorpay key set?  ──yes──► Razorpay popup (final amount) → sheet row marked PAID
        │
        └── no ──► WhatsApp chat opens with the full order incl. referral details
```
