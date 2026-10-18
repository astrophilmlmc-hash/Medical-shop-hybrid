import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  X,
  Send,
  FileText,
  Package,
  RefreshCw,
  CheckCheck,
  Sparkles,
  Pill
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const WhatsAppWidget = () => {
  const {
    waToast,
    setWaToast,
    products,
    orders,
    selectedStore,
    addToCart,
    uploadPrescription
  } = useApp();

  const [chatOpen, setChatOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Namaste! 👋 Welcome to MediShop Hybrid WhatsApp Pharmacy Support.\n\nOn-duty Pharmacist: ${selectedStore.pharmacist_name}\n\nHow can I help you today?`,
      time: 'Just now'
    }
  ]);

  const navigate = useNavigate();

  // Auto-dismiss WhatsApp toast after 9 seconds
  useEffect(() => {
    if (!waToast) return;
    const timer = setTimeout(() => {
      setWaToast(null);
    }, 9000);
    return () => clearTimeout(timer);
  }, [waToast, setWaToast]);

  const appendExchange = (userText, botReply) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'user', text: userText, time: now },
      { id: Date.now() + 1, sender: 'bot', text: botReply, time: now }
    ]);
  };

  const handleQuickAction = async (actionType) => {
    if (actionType === 'stock') {
      appendExchange(
        'Check medicine availability at nearest store',
        `✅ All 16 essential medicines (including Glycomet-500 SR, Telma 40, Dolo 650, Limcee Plus & Lantus Insulin Pen) are IN STOCK at ${selectedStore.store_name}.\n\n🏪 Express Pickup Time: ${selectedStore.pickup_ready_mins} minutes\n🚚 Home Delivery: Same-Day Express available.\n\nType any medicine or salt name below to check exact strip count & price!`
      );
    } else if (actionType === 'order_status') {
      const latest = orders[0];
      if (latest) {
        appendExchange(
          `Check status of Order #${latest.order_number}`,
          `📦 Order #${latest.order_number}\nStatus: ${latest.order_status}\nMode: ${
            latest.order_type === 'pickup' ? '🏪 Store Pickup' : '🚚 Home Delivery'
          }\nAmount: ₹${latest.total_amount} (${latest.payment_status})\nExpected: ${latest.expected_by}`
        );
      }
    } else if (actionType === 'upload_rx') {
      const rx = await uploadPrescription({
        patient_name: 'Jyotiraditya Bose',
        doctor_name: 'Dr. Rajeshwari Menon (Via WhatsApp)',
        hospital_name: 'WhatsApp Direct Rx Upload',
        notes: 'Received via WhatsApp Bot — Queued for Pharmacist verification',
        upload_source: 'WhatsApp'
      });
      appendExchange(
        '📋 Send Prescription via WhatsApp (Photo Attached)',
        `✅ Prescription #${rx.id} received on WhatsApp!\n\nOur pharmacist ${selectedStore.pharmacist_name} is verifying it now. You will receive a "📋 Prescription Verified" WhatsApp confirmation shortly.`
      );
    } else if (actionType === 'reorder') {
      addToCart(1, 2);
      addToCart(4, 1);
      appendExchange(
        '🔄 Reorder my previous monthly diabetes & BP medicines',
        `✅ Added your regular monthly refill to Cart:\n• 2x Glycomet-500 SR (Metformin 500mg)\n• 1x Telma 40 (Telmisartan 40mg)\n\nClick "View Cart" in the top bar to checkout with Home Delivery or 30-Min Store Pickup!`
      );
    }
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const q = inputMsg.trim();
    setInputMsg('');

    const matchedProd = products.find(
      p =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.generic_name.toLowerCase().includes(q.toLowerCase()) ||
        p.brand.toLowerCase().includes(q.toLowerCase())
    );

    if (matchedProd) {
      const inv =
        matchedProd.inventory.find(i => Number(i.store_id) === Number(selectedStore.id)) ||
        matchedProd.inventory[0];
      appendExchange(
        q,
        `💊 ${matchedProd.name}\nSalt: ${matchedProd.generic_name}\nPrice: ₹${matchedProd.selling_price} (MRP ₹${matchedProd.mrp})\n${
          matchedProd.prescription_required ? '📋 Schedule H (Rx Required)' : '✅ OTC (No Rx Needed)'
        }\n\n🏪 Stock at ${selectedStore.store_name}: ${inv.quantity} packs available (Batch ${inv.batch_number}, Exp ${inv.expiry_date}). Ready for pickup in ${selectedStore.pickup_ready_mins} mins!`
      );
    } else {
      appendExchange(
        q,
        `Thank you! Pharmacist ${selectedStore.pharmacist_name} has received your query: "${q}".\n\nFor immediate medicine lookup, type a medicine or generic salt name (e.g., "Metformin", "Dolo", "Vitamin C", "Insulin") or tap one of the quick buttons above.`
      );
    }
  };

  return (
    <>
      {/* Real-time WhatsApp Template Notification Toast (Top-Right) */}
      {waToast && (
        <div className="fixed top-20 right-4 z-50 max-w-sm w-full bg-[#DCF8C6] border-2 border-emerald-500 rounded-2xl shadow-2xl p-4 animate-in slide-in-from-right duration-300">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                WA
              </span>
              <div>
                <h4 className="text-xs font-extrabold text-emerald-950 flex items-center gap-1">
                  <span>WhatsApp • {waToast.title}</span>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                </h4>
                <p className="text-[11px] text-emerald-800">
                  To: {waToast.whatsapp_number} • {waToast.delivery_status}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setWaToast(null)}
              className="text-emerald-800 hover:text-emerald-950 p-1"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <pre className="font-mono text-xs whitespace-pre-wrap bg-white/90 p-3 rounded-xl border border-emerald-300 text-gray-900 leading-relaxed">
            {waToast.message_content}
          </pre>
        </div>
      )}

      {/* Floating WhatsApp Pharmacist Chat Widget (Bottom-Right) */}
      <div className="fixed bottom-5 right-5 z-40">
        {chatOpen ? (
          <div className="w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[540px]">
            {/* WhatsApp Header */}
            <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-extrabold text-sm">
                  Rx
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">MediShop Pharmacist Chat</h3>
                  <p className="text-[11px] text-emerald-200 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                    Online • Replies instantly on WhatsApp
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Pills */}
            <div className="bg-[#ECE5DD] px-3 pt-2.5 pb-1.5 flex flex-wrap gap-1.5 border-b border-gray-200">
              <button
                type="button"
                onClick={() => handleQuickAction('stock')}
                className="text-[11px] bg-white hover:bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1 shadow-sm"
              >
                <Pill className="w-3 h-3" /> Check Stock
              </button>
              <button
                type="button"
                onClick={() => handleQuickAction('order_status')}
                className="text-[11px] bg-white hover:bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1 shadow-sm"
              >
                <Package className="w-3 h-3" /> Order Status
              </button>
              <button
                type="button"
                onClick={() => handleQuickAction('upload_rx')}
                className="text-[11px] bg-white hover:bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1 shadow-sm"
              >
                <FileText className="w-3 h-3" /> Send Rx on WA
              </button>
              <button
                type="button"
                onClick={() => handleQuickAction('reorder')}
                className="text-[11px] bg-white hover:bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1 shadow-sm"
              >
                <RefreshCw className="w-3 h-3" /> 1-Click Reorder
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 bg-[#ECE5DD] p-3 overflow-y-auto space-y-2.5 max-h-72">
              {messages.map(m => (
                <div
                  key={m.id}
                  className={`flex flex-col max-w-[85%] rounded-2xl px-3.5 py-2 text-xs shadow-sm ${
                    m.sender === 'user'
                      ? 'ml-auto bg-[#DCF8C6] text-gray-900 rounded-br-none'
                      : 'mr-auto bg-white text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                  <span className="text-[10px] text-gray-400 self-end mt-1 flex items-center gap-1">
                    {m.time}
                    {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendChat} className="p-2.5 bg-white border-t border-gray-200 flex gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Type medicine name or question..."
                className="flex-1 text-xs px-3 py-2 bg-slate-100 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white flex items-center justify-center shrink-0 transition"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setChatOpen(true)}
            className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1da851] text-white font-bold px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5"
          >
            <MessageSquare className="w-5 h-5 fill-white" />
            <span className="text-sm">WhatsApp Pharmacist</span>
          </button>
        )}
      </div>
    </>
  );
};

export default WhatsAppWidget;
