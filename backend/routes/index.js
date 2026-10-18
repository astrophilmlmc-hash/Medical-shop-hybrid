import express from 'express';
import { sendOtp, verifyOtp } from '../controllers/authController.js';
import { getProducts, getProductById, getStores } from '../controllers/productController.js';
import { getOrders, getOrderByNumber, createOrder } from '../controllers/orderController.js';
import adminRouter from './admin.js';
import db from '../config/database.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'MediShop Hybrid API v1',
    auth_mode: 'WhatsApp OTP Only',
    stores_active: db.stores.length,
    products_active: db.products.length
  });
});

// WhatsApp Authentication Routes
router.post('/auth/send-otp', sendOtp);
router.post('/auth/verify-otp', verifyOtp);

// Public Catalog & Store Routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.get('/stores', getStores);
router.get('/categories', (req, res) => res.json({ categories: db.categories }));

// Orders & Prescriptions
router.get('/orders', getOrders);
router.get('/orders/:orderNumber', getOrderByNumber);
router.post('/orders', createOrder);

router.get('/prescriptions', (req, res) => res.json({ prescriptions: db.prescriptions }));
router.post('/prescriptions', (req, res) => {
  const rx = {
    id: db.prescriptions.length + 101,
    user_id: 1,
    order_id: req.body.order_id || null,
    patient_name: req.body.patient_name || 'Jyotiraditya Bose',
    doctor_name: req.body.doctor_name || 'Registered Medical Practitioner',
    hospital_name: req.body.hospital_name || 'Clinic / Hospital',
    image_url: req.body.image_url,
    uploaded_at: new Date().toISOString(),
    verification_status: 'Pending',
    verified_by: null,
    pharmacist_notes: req.body.notes || 'Queued for pharmacist verification (< 15 mins)',
    expiry_date: '2027-04-03',
    upload_source: req.body.upload_source || 'Website'
  };
  db.prescriptions.unshift(rx);
  return res.status(201).json({ prescription: rx });
});

// WhatsApp Messages Log
router.get('/whatsapp/messages', (req, res) => {
  res.json({ messages: db.whatsapp_messages });
});

// Admin Sub-Router
router.use('/admin', adminRouter);

export default router;
