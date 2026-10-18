---
name: Medical Shop Hybrid — Master Feature & Architecture Tracker
about: Complete epic tracking the Online + 30-Min Physical Store Pickup Hybrid Pharmacy platform
title: "[EPIC] Build & Launch MediShop Hybrid Website (Online Delivery + 30-Min Store Pickup + WhatsApp OTP)"
labels: enhancement, epic, full-stack
assignees: ''
---

# 🏥 [EPIC] MediShop Hybrid Website — Online Delivery + 30-Minute Store Pickup

## 📌 Problem Statement & Objective
Build a complete **Hybrid Medical Shop Website** (`MediShop Hybrid`) that bridges online e-pharmacy convenience with physical neighborhood pharmacy trust:
- **Passwordless Authentication:** 10-digit WhatsApp Number + 6-digit OTP **ONLY** (No email, password, or Google login).
- **Hybrid Fulfillment:** Customers can choose **Same-Day Express Home Delivery** OR **Free 30-Minute Store Pickup** at the nearest physical pharmacy hub.
- **Schedule H / H1 Regulatory Compliance:** Mandatory prescription upload (via Website or WhatsApp) and verification by a Registered Pharmacist before dispensing prescription medicines.

---

## ✅ Scope & Feature Checklist

### 1. 🔐 WhatsApp-Only Authentication (`/api/v1/auth/*`)
- [x] 10-digit Indian WhatsApp mobile number input (`+91`)
- [x] 6-digit OTP generation and WhatsApp template dispatch (`OTP`)
- [x] Auto-create new customer profile or log in returning user with JWT session token
- [x] Zero email/password fields across the entire user journey

### 2. 💊 Medicine Catalog, Generic Salt Search & Alternatives (`/products`, `/products/:id`)
- [x] Browse products without login
- [x] Instant search by **Medicine Brand Name** or **Generic Salt Composition** (e.g., *Metformin*, *Vitamin C*, *Paracetamol*, *Telmisartan*, *Amoxycillin*, *Insulin Glargine*)
- [x] Filter by Category (Diabetes, Heart & BP, Pain Relief, Vitamins, Antibiotics, Respiratory, Digestive, Medical Devices), Brand, Price Range, Prescription Type (`Schedule H` vs `OTC`), and Store Pickup availability
- [x] **Generic Alternatives Suggester** on product pages showing identical salt substitutes and percentage savings
- [x] Live per-store stock count, batch number, and expiry date visibility

### 3. 🚚🏪 Hybrid Fulfillment Model (`/cart`, `/checkout`)
- [x] **Home Delivery Mode:**
  - [x] Select saved address or add a new delivery address
  - [x] Choose Same-Day Express (within 2 hours) or Evening slot
  - [x] ₹35 standard delivery fee (FREE on orders ≥ ₹500)
  - [x] Live delivery partner assignment & GPS status tracking
- [x] **Store Pickup Mode:**
  - [x] Select nearest physical store & preferred pickup slot
  - [x] Ready at Express Pickup Counter in **20–30 minutes** with Token ID
  - [x] **₹0 Delivery Charges**
  - [x] Pay online (UPI / Card via Razorpay) or **Pay at Store Counter**

### 4. 📍 Interactive Store Locator (`/stores`)
- [x] Interactive Store Radar Map displaying all 5 hybrid pharmacy hubs
- [x] **Use My GPS Location** (Haversine distance calculation in `km`, sorted nearest-first)
- [x] Filter by store services (`30-Min Express Pickup`, `24x7 Pharmacy`, `Pharmacist Consultation`, `Cold Chain Storage`, `Free BP & Sugar Check`, `Drive-Thru Pickup`)
- [x] Store details: address, phone, timings, on-duty Registered Pharmacist name & license number, and **Get Google Maps Directions** link

### 5. 📋 Prescription Management (`/prescriptions`)
- [x] Upload prescription photo (`JPG`/`PNG`) or `PDF` via website
- [x] Direct WhatsApp prescription submission option
- [x] Pharmacist verification status (`Pending`, `Approved`, `Rejected` with notes)
- [x] Encrypted Rx vault with 6-month validity and 1-click **"Order Medicines from This Rx"**

### 6. 💬 WhatsApp Integration & Notification Templates
- [x] Real-time WhatsApp notifications for:
  - [x] `OTP` — 6-digit login verification code
  - [x] `ORDER_CONFIRMATION` — Order ID, amount, delivery/pickup store details & tracking link
  - [x] `PRESCRIPTION_VERIFIED` — Pharmacist approval confirmation
  - [x] `READY_FOR_PICKUP` — Express counter token & store address notification
  - [x] `OUT_FOR_DELIVERY` — Delivery partner name, phone & ETA
- [x] Floating **WhatsApp Pharmacist Live Chat** widget (check stock, check order status, send Rx on WhatsApp, 1-click reorder)

### 7. 👤 Customer Account Dashboard (`/account`)
- [x] Order History with 1-click Reorder & Live Order Tracking (`/orders/:id`)
- [x] Saved Prescriptions Vault
- [x] Family Member Profiles (manage age, blood group, chronic conditions & regular medicines for parents/spouse/children)
- [x] Saved Delivery Addresses
- [x] WhatsApp Notification Logs & Marketing/Refill Reminder Opt-in Preferences

### 8. 🛡️ Pharmacist & Admin Control Center (`/admin`)
- [x] **Overview Dashboard:** Today's hybrid orders count, pending prescriptions count, total revenue, and low-stock batch alerts
- [x] **Prescription Verification Queue:** Inspect uploaded Rx image, Approve/Reject with pharmacist notes, and auto-trigger WhatsApp customer alert
- [x] **Order Management:** Filter by Delivery vs. Pickup, advance order lifecycle status, and print GST pharmacy invoices
- [x] **Product & Inventory Management:** Update per-store stock quantities, prices, batch numbers, and add new medicines
- [x] **WhatsApp Broadcast Hub:** View message delivery logs and send manual refill reminders or health tips

---

## 🗄️ Core Database Schema (12 Tables)
1. `users` (`id`, `whatsapp_number`, `name`, `dob`, `gender`, `last_login`)
2. `addresses` (`id`, `user_id`, `address_line1`, `address_line2`, `city`, `state`, `pincode`)
3. `stores` (`id`, `store_name`, `address`, `latitude`, `longitude`, `phone`, `opening_time`, `closing_time`)
4. `products` (`id`, `name`, `generic_name`, `brand`, `category_id`, `description`, `prescription_required`, `schedule_type`, `manufacturer`, `image_url`)
5. `product_inventory` (`id`, `product_id`, `store_id`, `quantity`, `mrp`, `selling_price`, `batch_number`, `expiry_date`)
6. `categories` (`id`, `name`, `slug`, `parent_id`, `image_url`)
7. `orders` (`id`, `order_number`, `user_id`, `order_type`, `store_id`, `total_amount`, `payment_status`, `payment_method`, `order_status`, `prescription_required`, `prescription_verified`)
8. `order_items` (`id`, `order_id`, `product_id`, `quantity`, `unit_price`, `total_price`)
9. `prescriptions` (`id`, `user_id`, `order_id`, `image_url`, `uploaded_at`, `verification_status`, `verified_by`, `expiry_date`)
10. `delivery_addresses` (`id`, `order_id`, `full_address`, `city`, `pincode`, `phone`)
11. `whatsapp_otps` (`id`, `whatsapp_number`, `otp_code`, `created_at`, `expires_at`, `is_verified`)
12. `whatsapp_messages` (`id`, `user_id`, `message_type`, `message_content`, `sent_at`, `delivery_status`)

---

## 🚀 Phase 2 Post-Launch Enhancements (Next Milestones)
- [ ] Connect live Twilio / Gupshup / Interakt WhatsApp Business API credentials in `.env`
- [ ] Connect live Razorpay production webhook for automated payment reconciliation
- [ ] Automated cron job for 30-day chronic medicine refill reminders on WhatsApp
- [ ] Drug-to-drug interaction checker at cart & checkout
- [ ] Doctor tele-consultation booking for customers without an active Schedule H prescription
