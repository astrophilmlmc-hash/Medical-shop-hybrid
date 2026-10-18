import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CATEGORIES,
  STORES,
  PRODUCTS,
  INITIAL_USER,
  INITIAL_ADDRESSES,
  INITIAL_FAMILY_MEMBERS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_ORDERS,
  INITIAL_WHATSAPP_MESSAGES,
  createPrescriptionSvg
} from '../data/seedData';
import api from '../services/api';

const AppContext = createContext(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const AppProvider = ({ children }) => {
  // Auth state (WhatsApp Number + OTP ONLY)
  const [user, setUser] = useState(() => loadFromStorage('medishop_user', null));
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [afterLoginCallback, setAfterLoginCallback] = useState(null);

  // Hybrid fulfillment mode: 'delivery' | 'pickup'
  const [fulfillmentMode, setFulfillmentMode] = useState(() =>
    loadFromStorage('medishop_fulfillment_mode', 'delivery')
  );
  const [selectedStoreId, setSelectedStoreId] = useState(() =>
    loadFromStorage('medishop_selected_store', 1)
  );

  // Core catalog & database tables
  const [categories] = useState(CATEGORIES);
  const [stores, setStores] = useState(() => loadFromStorage('medishop_stores', STORES));
  const [products, setProducts] = useState(() => loadFromStorage('medishop_products', PRODUCTS));
  const [orders, setOrders] = useState(() => loadFromStorage('medishop_orders', INITIAL_ORDERS));
  const [prescriptions, setPrescriptions] = useState(() =>
    loadFromStorage('medishop_prescriptions', INITIAL_PRESCRIPTIONS)
  );
  const [addresses, setAddresses] = useState(() =>
    loadFromStorage('medishop_addresses', INITIAL_ADDRESSES)
  );
  const [familyMembers, setFamilyMembers] = useState(() =>
    loadFromStorage('medishop_family', INITIAL_FAMILY_MEMBERS)
  );
  const [whatsappMessages, setWhatsappMessages] = useState(() =>
    loadFromStorage('medishop_wa_messages', INITIAL_WHATSAPP_MESSAGES)
  );

  // Cart state
  const [cart, setCart] = useState(() =>
    loadFromStorage('medishop_cart', [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 1 }
    ])
  );

  // Active WhatsApp notification banner toast
  const [waToast, setWaToast] = useState(null);
  const [generatedOtpInfo, setGeneratedOtpInfo] = useState(null);

  // Persist changes to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('medishop_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('medishop_user');
      }
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('medishop_fulfillment_mode', JSON.stringify(fulfillmentMode));
      localStorage.setItem('medishop_selected_store', JSON.stringify(selectedStoreId));
      localStorage.setItem('medishop_cart', JSON.stringify(cart));
      localStorage.setItem('medishop_orders', JSON.stringify(orders));
      localStorage.setItem('medishop_prescriptions', JSON.stringify(prescriptions));
      localStorage.setItem('medishop_addresses', JSON.stringify(addresses));
      localStorage.setItem('medishop_family', JSON.stringify(familyMembers));
      localStorage.setItem('medishop_wa_messages', JSON.stringify(whatsappMessages));
      localStorage.setItem('medishop_products', JSON.stringify(products));
      localStorage.setItem('medishop_stores', JSON.stringify(stores));
    } catch {}
  }, [
    fulfillmentMode,
    selectedStoreId,
    cart,
    orders,
    prescriptions,
    addresses,
    familyMembers,
    whatsappMessages,
    products,
    stores
  ]);

  const selectedStore = stores.find(s => Number(s.id) === Number(selectedStoreId)) || stores[0];

  // Helper to push a simulated WhatsApp message & show live toast
  const pushWhatsAppNotification = ({ whatsapp_number, message_type, title, message_content }) => {
    const newMsg = {
      id: Date.now(),
      user_id: user?.id || 1,
      whatsapp_number: whatsapp_number || (user?.whatsapp_number ? `+91 ${user.whatsapp_number}` : '+91 98765 43210'),
      message_type,
      title,
      message_content,
      sent_at: new Date().toISOString(),
      delivery_status: 'Delivered ✓✓'
    };
    setWhatsappMessages(prev => [newMsg, ...prev]);
    setWaToast(newMsg);
    return newMsg;
  };

  // WhatsApp OTP Authentication
  const requestWhatsAppOtp = async (whatsappNumber) => {
    const clean = String(whatsappNumber || '').replace(/\D/g, '').slice(-10);
    if (clean.length !== 10) {
      throw new Error('Please enter a valid 10-digit WhatsApp mobile number.');
    }
    let otpCode = String(Math.floor(100000 + Math.random() * 900000));
    try {
      const res = await api.post('/auth/send-otp', { whatsapp_number: clean });
      if (res.data?.demo_otp) otpCode = String(res.data.demo_otp);
    } catch {
      // Fallback to local OTP generation if offline
    }

    const content = `Your Medical Shop OTP is: ${otpCode}\n\nValid for 10 minutes.\n\nDo not share with anyone.`;
    const msg = pushWhatsAppNotification({
      whatsapp_number: `+91 ${clean}`,
      message_type: 'OTP',
      title: 'WhatsApp OTP Verification',
      message_content: content
    });
    setGeneratedOtpInfo({ whatsapp_number: clean, otp_code: otpCode });
    return { whatsapp_number: clean, otp_code: otpCode, message: msg };
  };

  const verifyWhatsAppOtp = async (whatsappNumber, enteredOtp, customName = '') => {
    const clean = String(whatsappNumber || '').replace(/\D/g, '').slice(-10);
    if (
      generatedOtpInfo &&
      generatedOtpInfo.whatsapp_number === clean &&
      String(enteredOtp) !== String(generatedOtpInfo.otp_code) &&
      String(enteredOtp) !== '123456'
    ) {
      throw new Error('Invalid OTP. Use the 6-digit code shown in the WhatsApp notification banner.');
    }

    try {
      await api.post('/auth/verify-otp', {
        whatsapp_number: clean,
        otp_code: enteredOtp,
        name: customName
      });
    } catch {
      // Continue with local session
    }

    const isDefaultUser = clean === '9876543210';
    const loggedInUser = {
      id: isDefaultUser ? 1 : Date.now(),
      whatsapp_number: clean,
      name: customName?.trim() || (isDefaultUser ? INITIAL_USER.name : `Jyotiraditya (${clean.slice(-4)})`),
      dob: isDefaultUser ? INITIAL_USER.dob : '1996-08-14',
      gender: isDefaultUser ? INITIAL_USER.gender : 'Male',
      last_login: new Date().toISOString(),
      marketing_opt_in: true,
      refill_reminders: true
    };

    localStorage.setItem('medishop_token', `medishop-jwt-${clean}`);
    setUser(loggedInUser);
    setLoginModalOpen(false);
    setGeneratedOtpInfo(null);

    if (typeof afterLoginCallback === 'function') {
      afterLoginCallback(loggedInUser);
      setAfterLoginCallback(null);
    }
    return loggedInUser;
  };

  const requireLogin = (callback) => {
    if (user) {
      if (callback) callback(user);
      return true;
    }
    if (callback) {
      setAfterLoginCallback(() => callback);
    }
    setLoginModalOpen(true);
    return false;
  };

  const logout = () => {
    localStorage.removeItem('medishop_token');
    localStorage.removeItem('medishop_user');
    setUser(null);
  };

  const updateUserProfile = (updates) => {
    setUser(prev => (prev ? { ...prev, ...updates } : prev));
  };

  // Cart Calculations & Operations
  const detailedCart = cart
    .map(item => {
      const product = products.find(p => Number(p.id) === Number(item.productId));
      if (!product) return null;
      const storeInv =
        product.inventory.find(i => Number(i.store_id) === Number(selectedStoreId)) ||
        product.inventory[0];
      return {
        ...item,
        product,
        storeStock: storeInv ? storeInv.quantity : 0,
        unitPrice: product.selling_price,
        unitMrp: product.mrp,
        lineTotal: Number((product.selling_price * item.quantity).toFixed(2)),
        lineMrp: Number((product.mrp * item.quantity).toFixed(2))
      };
    })
    .filter(Boolean);

  const cartCount = detailedCart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = Number(
    detailedCart.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2)
  );
  const cartMrpTotal = Number(
    detailedCart.reduce((sum, item) => sum + item.lineMrp, 0).toFixed(2)
  );
  const cartSavings = Number((cartMrpTotal - cartSubtotal).toFixed(2));
  const cartRequiresPrescription = detailedCart.some(item => item.product.prescription_required);

  // Delivery charges: ₹0 for Store Pickup, ₹0 for Home Delivery >= ₹500, else ₹35
  const deliveryFee =
    fulfillmentMode === 'pickup' || cartSubtotal === 0
      ? 0
      : cartSubtotal >= 500
      ? 0
      : 35;

  const cartTotal = Number((cartSubtotal + deliveryFee).toFixed(2));

  const addToCart = (productId, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => Number(i.productId) === Number(productId));
      if (existing) {
        return prev.map(i =>
          Number(i.productId) === Number(productId)
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { productId: Number(productId), quantity: qty }];
    });
  };

  const updateCartQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(i =>
        Number(i.productId) === Number(productId) ? { ...i, quantity: newQty } : i
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(i => Number(i.productId) !== Number(productId)));
  };

  const clearCart = () => setCart([]);

  // Addresses & Family Members
  const addAddress = (addr) => {
    const newAddr = {
      ...addr,
      id: Date.now(),
      user_id: user?.id || 1
    };
    setAddresses(prev => [newAddr, ...prev]);
    return newAddr;
  };

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const addFamilyMember = (member) => {
    const newMember = {
      ...member,
      id: Date.now(),
      user_id: user?.id || 1
    };
    setFamilyMembers(prev => [...prev, newMember]);
    return newMember;
  };

  const deleteFamilyMember = (id) => {
    setFamilyMembers(prev => prev.filter(m => m.id !== id));
  };

  // Prescriptions
  const uploadPrescription = async ({
    patient_name,
    doctor_name,
    hospital_name,
    image_url,
    notes,
    upload_source = 'Website',
    order_id = null
  }) => {
    const finalImage =
      image_url ||
      createPrescriptionSvg(
        doctor_name || 'Dr. S. Radhakrishnan',
        patient_name || user?.name || 'Jyotiraditya Bose',
        ['Tab. Glycomet-500 SR (Metformin 500mg)', 'Tab. Pan-40 (Pantoprazole 40mg)'],
        '03 Oct 2026'
      );

    const newRx = {
      id: Date.now(),
      user_id: user?.id || 1,
      order_id,
      patient_name: patient_name || user?.name || 'Jyotiraditya Bose',
      doctor_name: doctor_name || 'Dr. S. Radhakrishnan',
      hospital_name: hospital_name || 'Manipal Hospital, Bengaluru',
      image_url: finalImage,
      uploaded_at: new Date().toISOString(),
      verification_status: 'Pending',
      verified_by: null,
      pharmacist_notes: notes || 'Queued for pharmacist review (est. 15-30 mins)',
      expiry_date: '2027-04-03',
      upload_source
    };

    try {
      await api.post('/prescriptions', newRx);
    } catch {}

    setPrescriptions(prev => [newRx, ...prev]);
    return newRx;
  };

  // Place Order (Home Delivery or Store Pickup)
  const placeHybridOrder = async ({
    order_type,
    store_id,
    delivery_address,
    delivery_slot,
    pickup_slot,
    payment_method,
    prescription_id,
    uploaded_rx_data
  }) => {
    const isPickup = order_type === 'pickup';
    const storeObj = stores.find(s => Number(s.id) === Number(store_id)) || selectedStore;
    const orderNumber = `MS${Math.floor(10000 + Math.random() * 89999)}`;

    let activeRxId = prescription_id || null;
    let isRxVerified = false;

    if (cartRequiresPrescription) {
      if (uploaded_rx_data) {
        const createdRx = await uploadPrescription({
          ...uploaded_rx_data,
          order_id: orderNumber
        });
        activeRxId = createdRx.id;
        isRxVerified = false;
      } else if (prescription_id) {
        const existingRx = prescriptions.find(p => Number(p.id) === Number(prescription_id));
        isRxVerified = existingRx?.verification_status === 'Approved';
      }
    } else {
      isRxVerified = true;
    }

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const timeline = isPickup
      ? [
          {
            status: 'Order Placed',
            time: nowTime,
            completed: true,
            note: `Order #${orderNumber} placed for Store Pickup at ${storeObj.store_name}`
          },
          ...(cartRequiresPrescription
            ? [
                {
                  status: 'Prescription Verified',
                  time: isRxVerified ? nowTime : 'In Queue (< 15 mins)',
                  completed: isRxVerified,
                  note: isRxVerified
                    ? `Verified against approved Rx #${activeRxId}`
                    : `Pharmacist ${storeObj.pharmacist_name} is reviewing your prescription`
                }
              ]
            : []),
          {
            status: 'Packed at Store',
            time: 'Within 15 mins',
            completed: false,
            note: 'Batch & expiry verification at pharmacy counter'
          },
          {
            status: 'Ready for Pickup',
            time: `In ${storeObj.pickup_ready_mins} mins`,
            completed: false,
            note: `Skip the queue at Express Counter (${storeObj.store_name})`
          },
          {
            status: 'Picked Up',
            time: 'Show Order # at store',
            completed: false,
            note: 'Collect medicines at store counter'
          }
        ]
      : [
          {
            status: 'Order Placed',
            time: nowTime,
            completed: true,
            note: `Order #${orderNumber} received for Home Delivery`
          },
          ...(cartRequiresPrescription
            ? [
                {
                  status: 'Prescription Verified',
                  time: isRxVerified ? nowTime : 'Within 30 mins',
                  completed: isRxVerified,
                  note: isRxVerified
                    ? `Verified against approved Rx #${activeRxId}`
                    : `Assigned to ${storeObj.pharmacist_name} for Schedule H verification`
                }
              ]
            : []),
          {
            status: 'Packed at Store',
            time: 'Estimated +30 mins',
            completed: false,
            note: `Dispatched from ${storeObj.store_name}`
          },
          {
            status: 'Out for Delivery',
            time: 'Estimated +60 mins',
            completed: false,
            note: 'Live GPS rider tracking enabled'
          },
          {
            status: 'Delivered',
            time: delivery_slot || 'Today, 6:00 PM',
            completed: false,
            note: 'Safe doorstep handover'
          }
        ];

    const newOrder = {
      id: Date.now(),
      order_number: orderNumber,
      user_id: user?.id || 1,
      customer_name: user?.name || 'Jyotiraditya Bose',
      whatsapp_number: user?.whatsapp_number || '9876543210',
      order_type: isPickup ? 'pickup' : 'delivery',
      store_id: storeObj.id,
      store_name: storeObj.store_name,
      store_address: storeObj.address,
      delivery_address: isPickup ? null : delivery_address,
      delivery_slot: isPickup ? null : delivery_slot || 'Same-Day Express (Today, 6:00 PM)',
      pickup_slot: isPickup ? pickup_slot || `Ready in ${storeObj.pickup_ready_mins} Minutes` : null,
      pickup_token: isPickup ? `PK-${Math.floor(100 + Math.random() * 899)}` : null,
      delivery_partner: isPickup
        ? null
        : {
            name: 'Ramesh Kumar',
            phone: '+91 98450 77812',
            vehicle: 'KA-03-JM-4421 (EV Scooter)'
          },
      subtotal: cartSubtotal,
      delivery_fee: isPickup ? 0 : deliveryFee,
      total_amount: isPickup ? cartSubtotal : cartTotal,
      payment_status:
        payment_method === 'Pay at Store Counter' || payment_method === 'Cash on Delivery'
          ? 'Pay on Collection'
          : 'Paid',
      payment_method,
      order_status:
        cartRequiresPrescription && !isRxVerified
          ? 'Awaiting Rx Verification'
          : 'Order Confirmed',
      prescription_required: cartRequiresPrescription,
      prescription_verified: isRxVerified,
      prescription_id: activeRxId,
      created_at: new Date().toISOString(),
      expected_by: isPickup
        ? `Today in ${storeObj.pickup_ready_mins} mins`
        : delivery_slot || 'Today, 6:00 PM',
      items: detailedCart.map(i => ({
        product_id: i.product.id,
        name: i.product.name,
        quantity: i.quantity,
        unit_price: i.unitPrice,
        total_price: i.lineTotal,
        prescription_required: i.product.prescription_required
      })),
      timeline
    };

    try {
      await api.post('/orders', newOrder);
    } catch {}

    setOrders(prev => [newOrder, ...prev]);

    // Decrement store inventory
    setProducts(prev =>
      prev.map(prod => {
        const cartItem = detailedCart.find(c => Number(c.product.id) === Number(prod.id));
        if (!cartItem) return prod;
        return {
          ...prod,
          inventory: prod.inventory.map(inv =>
            Number(inv.store_id) === Number(storeObj.id)
              ? { ...inv, quantity: Math.max(0, inv.quantity - cartItem.quantity) }
              : inv
          )
        };
      })
    );

    // Send Official WhatsApp Order Confirmation Template
    const waText = `✅ Order Confirmed!\n\nOrder #${orderNumber}\nAmount: ₹${newOrder.total_amount}\n\n${
      isPickup
        ? `Store Pickup at: ${storeObj.store_name}\nReady in: ${storeObj.pickup_ready_mins} minutes (Token ${newOrder.pickup_token})`
        : `Delivery to: ${delivery_address}\nExpected by: ${newOrder.expected_by}`
    }\n\nTrack: /orders/${orderNumber}`;

    pushWhatsAppNotification({
      whatsapp_number: `+91 ${newOrder.whatsapp_number}`,
      message_type: 'ORDER_CONFIRMATION',
      title: `Order #${orderNumber} Confirmed`,
      message_content: waText
    });

    clearCart();
    return newOrder;
  };

  // Pharmacist Prescription Verification (Admin & Demo Simulation)
  const verifyPrescriptionAdmin = async (rxId, status = 'Approved', notes = '') => {
    const targetRx = prescriptions.find(p => Number(p.id) === Number(rxId));
    if (!targetRx) return;

    const pharmacist = 'Dr. Ananya Rao (Reg #KA-44821)';
    const updatedNotes =
      notes ||
      (status === 'Approved'
        ? 'Valid Schedule H prescription verified and approved by Chief Pharmacist.'
        : 'Image unclear or missing doctor registration number. Please re-upload.');

    try {
      await api.post(`/admin/prescriptions/${rxId}/verify`, {
        status,
        pharmacist_notes: updatedNotes,
        verified_by: pharmacist
      });
    } catch {}

    setPrescriptions(prev =>
      prev.map(p =>
        Number(p.id) === Number(rxId)
          ? {
              ...p,
              verification_status: status,
              verified_by: pharmacist,
              pharmacist_notes: updatedNotes
            }
          : p
      )
    );

    if (status === 'Approved') {
      if (targetRx.order_id) {
        setOrders(prev =>
          prev.map(o => {
            if (o.order_number !== targetRx.order_id) return o;
            const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return {
              ...o,
              prescription_verified: true,
              order_status: 'Prescription Verified',
              timeline: o.timeline.map(step =>
                step.status === 'Prescription Verified'
                  ? { ...step, completed: true, time: nowStr, note: `Approved by ${pharmacist}` }
                  : step
              )
            };
          })
        );
      }

      pushWhatsAppNotification({
        whatsapp_number: '+91 98765 43210',
        message_type: 'PRESCRIPTION_VERIFIED',
        title: '📋 Prescription Verified',
        message_content: `📋 Prescription Verified\n\nOrder #${
          targetRx.order_id || `RX-${targetRx.id}`
        }\nYour prescription has been approved by ${pharmacist}.\n\nYour order is now being prepared.\n\nTrack: /orders/${
          targetRx.order_id || 'MS12345'
        }`
      });
    } else {
      pushWhatsAppNotification({
        whatsapp_number: '+91 98765 43210',
        message_type: 'PRESCRIPTION_REJECTED',
        title: '⚠️ Action Needed on Prescription',
        message_content: `⚠️ Prescription Update\n\nRx #${targetRx.id} requires clarification:\n"${updatedNotes}"\n\nPlease reply on WhatsApp or re-upload.`
      });
    }
  };

  // Advance Order Status & Send Corresponding WhatsApp Notification
  const advanceOrderStatus = async (orderNumber, customStatus = null) => {
    const target = orders.find(o => o.order_number === orderNumber);
    if (!target) return;

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let nextStatus = customStatus;

    if (!nextStatus) {
      const firstIncomplete = target.timeline.find(t => !t.completed);
      nextStatus = firstIncomplete ? firstIncomplete.status : target.order_status;
    }

    try {
      await api.patch(`/admin/orders/${orderNumber}/status`, { order_status: nextStatus });
    } catch {}

    setOrders(prev =>
      prev.map(o => {
        if (o.order_number !== orderNumber) return o;
        let markCompleted = true;
        const updatedTimeline = o.timeline.map(step => {
          if (step.status === nextStatus) {
            const updated = { ...step, completed: true, time: nowStr };
            markCompleted = false;
            return updated;
          }
          if (markCompleted) {
            return { ...step, completed: true };
          }
          return step;
        });

        return {
          ...o,
          order_status: nextStatus,
          prescription_verified:
            nextStatus === 'Prescription Verified' ? true : o.prescription_verified,
          timeline: updatedTimeline
        };
      })
    );

    if (nextStatus === 'Prescription Verified') {
      pushWhatsAppNotification({
        whatsapp_number: `+91 ${target.whatsapp_number}`,
        message_type: 'PRESCRIPTION_VERIFIED',
        title: '📋 Prescription Verified',
        message_content: `📋 Prescription Verified\n\nOrder #${target.order_number}\nYour prescription has been approved.\n\nYour order is now being prepared.\n\nTrack: /orders/${target.order_number}`
      });
    } else if (nextStatus === 'Ready for Pickup') {
      pushWhatsAppNotification({
        whatsapp_number: `+91 ${target.whatsapp_number}`,
        message_type: 'READY_FOR_PICKUP',
        title: '🎉 Order Ready for Pickup!',
        message_content: `🎉 Order Ready!\n\nOrder #${target.order_number}\nReady for pickup at:\n${target.store_name}\n${target.store_address}\n\nShow this message at counter (Token: ${target.pickup_token || 'PK-884'}).`
      });
    } else if (nextStatus === 'Out for Delivery') {
      pushWhatsAppNotification({
        whatsapp_number: `+91 ${target.whatsapp_number}`,
        message_type: 'OUT_FOR_DELIVERY',
        title: '🚚 Out for Delivery',
        message_content: `🚚 Out for Delivery\n\nOrder #${target.order_number}\nYour order is on the way!\n\nArriving in 30 minutes\nDelivery person: ${
          target.delivery_partner?.name || 'Ramesh Kumar'
        } (${target.delivery_partner?.phone || '+91 98450 77812'})\n\nTrack: /orders/${target.order_number}`
      });
    } else if (nextStatus === 'Delivered' || nextStatus === 'Picked Up') {
      pushWhatsAppNotification({
        whatsapp_number: `+91 ${target.whatsapp_number}`,
        message_type: 'DELIVERED',
        title: `✅ Order ${nextStatus}!`,
        message_content: `✅ Order ${nextStatus}!\n\nOrder #${target.order_number} has been completed.\nThank you for choosing MediShop Hybrid. Stay healthy!`
      });
    }
  };

  // Admin Inventory & Product Management
  const updateProductStockAdmin = (productId, storeId, newQty, newSellingPrice) => {
    setProducts(prev =>
      prev.map(p => {
        if (Number(p.id) !== Number(productId)) return p;
        return {
          ...p,
          selling_price: newSellingPrice !== undefined ? Number(newSellingPrice) : p.selling_price,
          inventory: p.inventory.map(inv =>
            Number(inv.store_id) === Number(storeId)
              ? {
                  ...inv,
                  quantity: Number(newQty),
                  selling_price:
                    newSellingPrice !== undefined ? Number(newSellingPrice) : inv.selling_price
                }
              : inv
          )
        };
      })
    );
  };

  const addNewProductAdmin = (prodData) => {
    const newId = products.length + 1;
    const cat =
      categories.find(c => Number(c.id) === Number(prodData.category_id)) || categories[0];
    const newProd = {
      id: newId,
      name: prodData.name,
      generic_name: prodData.generic_name,
      brand: prodData.brand || prodData.name.split(' ')[0],
      category_id: cat.id,
      category_name: cat.name,
      pack_size: prodData.pack_size || 'Strip of 10 Tablets',
      description: prodData.description || 'Quality assured pharmaceutical formulation.',
      usage_instructions: prodData.usage_instructions || 'Use as directed by the physician.',
      side_effects: prodData.side_effects || 'Consult your pharmacist if any discomfort occurs.',
      prescription_required: Boolean(prodData.prescription_required),
      schedule_type: prodData.prescription_required ? 'Schedule H' : 'OTC',
      manufacturer: prodData.manufacturer || 'Standard Pharmaceuticals India',
      mrp: Number(prodData.mrp || 100),
      selling_price: Number(prodData.selling_price || 85),
      image_url: PRODUCTS[0].image_url,
      alternatives: [],
      inventory: stores.map(s => ({
        store_id: s.id,
        quantity: Number(prodData.initial_stock || 50),
        mrp: Number(prodData.mrp || 100),
        selling_price: Number(prodData.selling_price || 85),
        batch_number: `MS-${newId}01`,
        expiry_date: '2028-06-30'
      }))
    };
    setProducts(prev => [newProd, ...prev]);
    return newProd;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loginModalOpen,
        setLoginModalOpen,
        requestWhatsAppOtp,
        verifyWhatsAppOtp,
        requireLogin,
        logout,
        updateUserProfile,
        generatedOtpInfo,
        fulfillmentMode,
        setFulfillmentMode,
        selectedStoreId,
        setSelectedStoreId,
        selectedStore,
        categories,
        stores,
        setStores,
        products,
        orders,
        prescriptions,
        addresses,
        addAddress,
        deleteAddress,
        familyMembers,
        addFamilyMember,
        deleteFamilyMember,
        whatsappMessages,
        pushWhatsAppNotification,
        waToast,
        setWaToast,
        cart,
        detailedCart,
        cartCount,
        cartSubtotal,
        cartMrpTotal,
        cartSavings,
        cartRequiresPrescription,
        deliveryFee,
        cartTotal,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        uploadPrescription,
        placeHybridOrder,
        verifyPrescriptionAdmin,
        advanceOrderStatus,
        updateProductStockAdmin,
        addNewProductAdmin
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
