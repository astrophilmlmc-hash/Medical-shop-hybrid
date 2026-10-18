import express from 'express';
import db from '../config/database.js';
import { WHATSAPP_TEMPLATES, sendWhatsAppMessage } from '../utils/whatsapp.js';
import adminAuthMiddleware from '../middleware/adminAuth.js';

const router = express.Router();
router.use(adminAuthMiddleware);

// Admin Dashboard Summary
router.get('/summary', (req, res) => {
  const totalRevenue = db.orders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
  const pendingPrescriptions = db.prescriptions.filter(p => p.verification_status === 'Pending').length;
  const lowStockCount = db.products.reduce(
    (acc, p) => acc + p.inventory.filter(inv => inv.quantity < 15).length,
    0
  );
  return res.json({
    todayOrdersCount: db.orders.length,
    pendingPrescriptions,
    totalRevenue,
    lowStockCount,
    orders: db.orders,
    prescriptions: db.prescriptions,
    whatsappMessages: db.whatsapp_messages
  });
});

// Verify or Reject Prescription
router.post('/prescriptions/:id/verify', (req, res) => {
  const { status, pharmacist_notes, verified_by } = req.body;
  const rx = db.prescriptions.find(p => Number(p.id) === Number(req.params.id));
  if (!rx) {
    return res.status(404).json({ error: 'Prescription not found' });
  }
  rx.verification_status = status || 'Approved';
  rx.verified_by = verified_by || 'Dr. Ananya Rao (Reg #KA-44821)';
  rx.pharmacist_notes = pharmacist_notes || 'Verified by registered pharmacist.';

  let waMsg = null;
  if (rx.verification_status === 'Approved') {
    if (rx.order_id) {
      const order = db.orders.find(o => o.order_number === rx.order_id);
      if (order) {
        order.prescription_verified = true;
        if (order.order_status === 'Awaiting Rx Verification') {
          order.order_status = 'Prescription Verified';
        }
      }
    }
    waMsg = sendWhatsAppMessage({
      whatsapp_number: '9876543210',
      message_type: 'PRESCRIPTION_VERIFIED',
      title: 'Prescription Verified',
      message_content: WHATSAPP_TEMPLATES.PRESCRIPTION_VERIFIED({
        orderNumber: rx.order_id || `RX-${rx.id}`,
        pharmacistName: rx.verified_by
      })
    });
  }

  return res.json({ prescription: rx, whatsapp_message: waMsg });
});

// Update Order Status
router.patch('/orders/:orderNumber/status', (req, res) => {
  const { order_status } = req.body;
  const order = db.orders.find(o => o.order_number === req.params.orderNumber);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  order.order_status = order_status;

  let waMsg = null;
  if (order_status === 'Ready for Pickup') {
    waMsg = sendWhatsAppMessage({
      whatsapp_number: order.whatsapp_number,
      message_type: 'READY_FOR_PICKUP',
      title: 'Ready for Pickup',
      message_content: WHATSAPP_TEMPLATES.READY_FOR_PICKUP({
        orderNumber: order.order_number,
        storeName: order.store_name,
        storeAddress: order.store_address
      })
    });
  } else if (order_status === 'Out for Delivery') {
    waMsg = sendWhatsAppMessage({
      whatsapp_number: order.whatsapp_number,
      message_type: 'OUT_FOR_DELIVERY',
      title: 'Out for Delivery',
      message_content: WHATSAPP_TEMPLATES.OUT_FOR_DELIVERY({
        orderNumber: order.order_number,
        deliveryPerson: order.delivery_partner?.name || 'Ramesh Kumar',
        deliveryPhone: order.delivery_partner?.phone || '+91 98450 77812'
      })
    });
  }

  return res.json({ order, whatsapp_message: waMsg });
});

export default router;
