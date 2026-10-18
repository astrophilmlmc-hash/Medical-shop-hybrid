# MediShop Hybrid — REST API Reference (`/api/v1`)

## Authentication (WhatsApp Number + OTP Only)

### `POST /api/v1/auth/send-otp`
Sends a 6-digit OTP to a 10-digit Indian WhatsApp number and logs the WhatsApp OTP template message.
- **Request Body:** `{ "whatsapp_number": "9876543210" }`
- **Response:** `{ "success": true, "whatsapp_number": "9876543210", "demo_otp": "482910", "whatsapp_message": { ... } }`

### `POST /api/v1/auth/verify-otp`
Verifies the 6-digit OTP, auto-creates or logs in the user, and returns a JWT token.
- **Request Body:** `{ "whatsapp_number": "9876543210", "otp_code": "482910", "name": "Jyotiraditya Bose" }`
- **Response:** `{ "success": true, "token": "medishop-jwt-9876543210", "user": { ... } }`

---

## Products & Hybrid Store Inventory

### `GET /api/v1/products`
Query parameters: `search`, `category`, `prescription_required`, `store_id`.

### `GET /api/v1/products/:id`
Returns full clinical details, generic alternatives, and per-store batch/expiry inventory.

### `GET /api/v1/stores`
Returns all 5 MediShop Hybrid physical store locations with GPS coordinates, opening hours, pharmacist registration numbers, and pickup readiness times.

---

## Hybrid Orders & Prescriptions

### `POST /api/v1/orders`
Places a Home Delivery or 30-Minute Store Pickup order and dispatches the `ORDER_CONFIRMATION` WhatsApp template.

### `GET /api/v1/orders/:orderNumber`
Returns real-time status timeline, rider or store pickup counter token, and itemized GST invoice.

### `POST /api/v1/prescriptions`
Uploads a prescription via Website or WhatsApp into the Pharmacist Verification Queue.

---

## Pharmacist & Admin Endpoints

### `GET /api/v1/admin/summary`
Returns today's orders count, pending prescriptions count, total revenue, and low stock alerts.

### `POST /api/v1/admin/prescriptions/:id/verify`
Approves or rejects a prescription with pharmacist notes and sends the `PRESCRIPTION_VERIFIED` WhatsApp notification.

### `PATCH /api/v1/admin/orders/:orderNumber/status`
Updates order status (`Prescription Verified`, `Packed at Store`, `Ready for Pickup`, `Out for Delivery`, `Delivered`) and sends the corresponding WhatsApp notification.
