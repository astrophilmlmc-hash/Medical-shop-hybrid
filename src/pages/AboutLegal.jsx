import React from 'react';
import { ShieldCheck, FileCheck2, HelpCircle, Award, Lock, RefreshCw } from 'lucide-react';

const FAQS = [
  {
    q: 'Why does MediShop Hybrid only use WhatsApp OTP for login?',
    a: 'To make ordering medicines effortless for all age groups — including senior citizens — we eliminated passwords, emails, and complex signups. Your 10-digit WhatsApp number + 6-digit OTP serves as your secure identity and receives real-time prescription & delivery alerts.'
  },
  {
    q: 'How fast is the 30-Minute Store Pickup?',
    a: 'When you choose Store Pickup at checkout, our nearest MediShop Hybrid store immediately receives your order, verifies batch & expiry numbers, and packs it at the Express Counter within 20–30 minutes. You receive a "🎉 Order Ready for Pickup" message on WhatsApp and pay ₹0 delivery charges.'
  },
  {
    q: 'Can I buy Schedule H or H1 medicines without a prescription?',
    a: 'No. In strict compliance with the Drugs and Cosmetics Act, 1940 and Pharmacy Council of India regulations, all Schedule H and H1 medicines require a valid prescription from a Registered Medical Practitioner. You can upload it on the website or send it on WhatsApp.'
  },
  {
    q: 'How are Insulin pens and cold-chain medicines delivered?',
    a: 'All temperature-sensitive biologics and insulins (such as Lantus Solostar) are stored at 2°C–8°C in calibrated medical refrigerators at all 5 hybrid stores and dispatched in validated insulated cold-chain pouches.'
  }
];

const AboutLegal = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-700 to-emerald-600 rounded-3xl p-8 text-white shadow-lg space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
          About MediShop Hybrid &amp; Regulatory Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          Trusted Hybrid Pharmacy — Online Speed + Physical Store Trust
        </h1>
        <p className="text-sm sm:text-base text-blue-50 max-w-3xl">
          MediShop Hybrid bridges the gap between e-pharmacy convenience and neighborhood pharmacy reliability. Every medicine is sourced directly from authorized manufacturers, batch-verified by licensed pharmacists, and available via 2-hour home delivery or 30-minute store pickup.
        </p>
      </div>

      {/* Legal & Indian Regulations Cards */}
      <div id="compliance" className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-2">
          <ShieldCheck className="w-8 h-8 text-emerald-600" />
          <h3 className="font-extrabold text-base text-gray-900">
            Retail &amp; Wholesale Drug Licenses
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Form 20B &amp; 21B License: <strong>KA-BLR-20B-88412 / 21B-88413</strong>. FSSAI Central License: <strong>11226334000981</strong>. GSTIN: <strong>29AABCM8841F1Z5</strong>.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-2">
          <Award className="w-8 h-8 text-blue-600" />
          <h3 className="font-extrabold text-base text-gray-900">
            Registered Pharmacist Supervision
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Chief Pharmacist: <strong>Dr. Ananya Rao (B.Pharm, KSPC Reg #KA-44821)</strong>. Every Schedule H/H1 order is dispensed strictly after digital audit and verification.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-2">
          <Lock className="w-8 h-8 text-indigo-600" />
          <h3 className="font-extrabold text-base text-gray-900" id="privacy">
            WhatsApp &amp; Prescription Privacy
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Prescriptions are stored with AES-256 encryption and retained strictly for statutory audit under Indian Pharmacy regulations. WhatsApp notifications are sent only to your verified number.
          </p>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-blue-600" />
          <span>Frequently Asked Questions (FAQs)</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {FAQS.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-gray-100 space-y-2">
              <h4 className="font-extrabold text-sm text-gray-900">{item.q}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Return & Refund Policy */}
      <div id="returns" className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-3">
        <h3 className="font-extrabold text-lg text-gray-900 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-emerald-600" />
          <span>Return, Replacement &amp; Cold-Chain Policy</span>
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Unopened medicine strips with intact manufacturer seals can be returned or exchanged at any of our 5 MediShop Hybrid stores or via home pickup within 7 days of purchase with the original GST invoice. For patient safety, refrigerated cold-chain items (such as Insulin pens) and opened bottles/inhalers are non-returnable unless damaged in transit.
        </p>
      </div>
    </div>
  );
};

export default AboutLegal;
