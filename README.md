# MediShop Hybrid — Online Delivery + 30-Minute Store Pickup Pharmacy

Complete full-stack implementation of the **Medical Shop Hybrid Website** specification by **Jyotiraditya Bose**.

## Key Features Implemented

1. **WhatsApp-Only Authentication (`WhatsApp Number + 6-Digit OTP`)**
   - No email, password, or Google login required anywhere.
   - Instant simulated WhatsApp OTP banner for 1-click testing.
   - Auto-creates account or logs in returning user.

2. **Hybrid Fulfillment Model (`Home Delivery` + `30-Minute Store Pickup`)**
   - **Home Delivery:** Same-day express delivery within 2 hours, live delivery partner details, free delivery on orders above ₹500.
   - **Store Pickup:** Select nearest physical store, ready at Express Pickup Counter in 20–30 minutes, ₹0 delivery fee, pay online or at store counter.

3. **Medicine Catalog & Generic Salt Search**
   - Search by brand name or generic salt composition (`Metformin`, `Vitamin C`, `Telmisartan`, `Paracetamol`, `Amoxycillin`, `Insulin Glargine`).
   - Generic alternatives comparison with percentage savings.
   - Real-time batch, expiry, and pack count across all 5 hybrid stores.

4. **Prescription Management (`Schedule H / H1 Compliance`)**
   - Upload prescription via website (Photo/PDF) or send via WhatsApp.
   - Pharmacist verification queue with instant WhatsApp status notifications.
   - Saved encrypted prescription vault & family member profiles.

5. **Interactive Store Locator with GPS Distance**
   - Visual store radar map + Haversine GPS distance calculation.
   - Filter by services (`30-Min Express Pickup`, `24x7 Pharmacy`, `Cold Chain Storage`, `Free BP & Sugar Check`, `Drive-Thru Pickup`).

6. **Pharmacist & Admin Control Center (`/admin`)**
   - Live KPIs (Today's Orders, Pending Prescriptions, Revenue, Low Stock Alerts).
   - 1-click Prescription Approval/Rejection with automatic WhatsApp notifications.
   - Order lifecycle status updater & store-level inventory control.

## Running Locally

```bash
npm install
npm run dev
```
