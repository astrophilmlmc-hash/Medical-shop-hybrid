import db from '../config/database.js';
import OrderModel from '../models/Order.js';
import { WHATSAPP_TEMPLATES, sendWhatsAppMessage } from '../utils/whatsapp.js';

export const getOrders = (req, res) => {
  return res.json({ orders: db.orders });
};

export const getOrderByNumber = (req, res) => {
  const order = OrderModel.findByOrderNumber(req.params.orderNumber);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  return res.json({ order });
};

export const createOrder = (req, res) => {
  const payload = req.body;
  const orderNumber = payload.order_number || `MS${Math.floor(10000 + Math.random() * 90000)}`;
  const isPickup = payload.order_type === 'pickup';
  const store = db.stores.find(s => Number(s.id) === Number(payload.store_id)) || db.stores[0];

  const newOrder = {
    id: db.orders.length + 1,
    order_number: orderNumber,
    user_id: payload.user_id || 1,
    customer_name: payload.customer_name || 'Jyotiraditya Bose',
    whatsapp_number: payload.whatsapp_number || '9876543210',
    order_type: isPickup ? 'pickup' : 'delivery',
    store_id: store.id,
    store_name: store.store_name,
    store_address: store.address,
    delivery_address: payload.delivery_address || null,
    delivery_slot: payload.delivery_slot || (isPickup ? null : 'Same-Day Express (Today, 6:00 PM)'),
    pickup_slot: isPickup ? payload.pickup_slot || `Ready in ${store.pickup_ready_mins} Minutes` : null,
    pickup_token: isPickup ? `PK-${Math.floor(100 + Math.random() * 899)}` : null,
    delivery_partner: isPickup
      ? null
      : {
          name: 'Ramesh Kumar',
          phone: '+91 98450 77812',
          vehicle: 'KA-03-JM-4421 (EV Scooter)'
        },
    subtotal: Number(payload.subtotal || payload.total_amount || 0),
    delivery_fee: isPickup ? 0 : Number(payload.delivery_fee || 0),
    total_amount: Number(payload.total_amount || 0),
    payment_status: payload.payment_method === 'Pay at Store Counter' || payload.payment_method === 'Cash on Delivery' ? 'Pay on Collection' : 'Paid',
    payment_method: payload.payment_method || 'UPI (Razorpay)',
    order_status: payload.prescription_required && !payload.prescription_verified ? 'Awaiting Rx Verification' : 'Order Confirmed',
    prescription_required: Boolean(payload.prescription_required),
    prescription_verified: Boolean(payload.prescription_verified),
    prescription_id: payload.prescription_id || null,
    created_at: new Date().toISOString(),
    expected_by: isPickup ? `Ready in ${store.pickup_ready_mins} mins` : 'Today, 6:00 PM',
    items: payload.items || [],
    timeline: payload.timeline || []
  };

  db.orders.unshift(newOrder);

  const waMsg = sendWhatsAppMessage({
    user_id: newOrder.user_id,
    whatsapp_number: newOrder.whatsapp_number,
    message_type: 'ORDER_CONFIRMATION',
    title: 'Order Confirmation',
    message_content: WHATSAPP_TEMPLATES.ORDER_CONFIRMATION({
      orderNumber: newOrder.order_number,
      amount: newOrder.total_amount,
      addressOrStore: isPickup ? store.store_name : newOrder.delivery_address,
      expectedBy: newOrder.expected_by,
      isPickup
    })
  });

  return res.status(201).json({ order: newOrder, whatsapp_message: waMsg });
};
