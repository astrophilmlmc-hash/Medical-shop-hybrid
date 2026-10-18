/**
 * WhatsApp Business API Utility (Twilio / Gupshup / Interakt Compatible)
 * Formats and logs all 5 official WhatsApp templates from the Project Memory specification.
 */

import db from '../config/database.js';

export const WHATSAPP_TEMPLATES = {
  OTP: (otpCode) =>
    `Your Medical Shop OTP is: ${otpCode}\n\nValid for 10 minutes.\n\nDo not share with anyone.`,

  ORDER_CONFIRMATION: ({ orderNumber, amount, addressOrStore, expectedBy, isPickup }) =>
    `✅ Order Confirmed!\n\nOrder #${orderNumber}\nAmount: ₹${amount}\n\n${
      isPickup ? `Pickup at: ${addressOrStore}` : `Delivery to: ${addressOrStore}`
    }\nExpected by: ${expectedBy}\n\nTrack: /orders/${orderNumber}`,

  PRESCRIPTION_VERIFIED: ({ orderNumber, pharmacistName }) =>
    `📋 Prescription Verified\n\nOrder #${orderNumber || 'Rx-Vault'}\nYour prescription has been approved${
      pharmacistName ? ` by ${pharmacistName}` : ''
    }.\n\nYour order is now being prepared.\n\nTrack: /orders/${orderNumber || ''}`,

  READY_FOR_PICKUP: ({ orderNumber, storeName, storeAddress }) =>
    `🎉 Order Ready!\n\nOrder #${orderNumber}\nReady for pickup at:\n${storeName}\n${storeAddress}\n\nShow this message at counter.`,

  OUT_FOR_DELIVERY: ({ orderNumber, deliveryPerson, deliveryPhone }) =>
    `🚚 Out for Delivery\n\nOrder #${orderNumber}\nYour order is on the way!\n\nArriving in 30 minutes\nDelivery person: ${deliveryPerson} (${deliveryPhone})\n\nTrack: /orders/${orderNumber}`
};

export const sendWhatsAppMessage = ({ user_id = 1, whatsapp_number, message_type, title, message_content }) => {
  const newMsg = {
    id: db.whatsapp_messages.length + 1,
    user_id,
    whatsapp_number: whatsapp_number.startsWith('+91') ? whatsapp_number : `+91 ${whatsapp_number}`,
    message_type,
    title: title || message_type,
    message_content,
    sent_at: new Date().toISOString(),
    delivery_status: 'Delivered ✓✓'
  };
  db.whatsapp_messages.unshift(newMsg);
  return newMsg;
};
