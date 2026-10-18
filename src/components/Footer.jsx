import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, MapPin, Clock, MessageSquare, FileCheck2, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 border-t border-slate-800">
      {/* Legal & Regulatory Compliance Banner */}
      <div className="bg-slate-800/80 border-b border-slate-700/80 py-5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white">Licensed Retail &amp; Hybrid Pharmacy</h4>
              <p className="text-slate-400 mt-0.5">
                Drug License: KA-BLR-20B-88412 / 21B-88413 • FSSAI: 11226334000981 • GSTIN: 29AABCM8841F1Z5
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FileCheck2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white">Schedule H &amp; H1 Compliance</h4>
              <p className="text-slate-400 mt-0.5">
                All prescription medicines are dispensed strictly after verification by our registered pharmacists as per the Drugs &amp; Cosmetics Act, 1940.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white">Chief Registered Pharmacist</h4>
              <p className="text-slate-400 mt-0.5">
                Dr. Ananya Rao (B.Pharm, KSPC Reg #KA-44821) • 100% Batch &amp; Expiry Verified Stock
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white font-extrabold text-lg">
              M+
            </div>
            <span className="text-xl font-extrabold text-white">MediShop Hybrid</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed mb-4">
            India's trusted hybrid pharmacy combining same-day doorstep delivery with 30-minute express physical store pickup. Authenticated 100% via WhatsApp OTP.
          </p>
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>24x7 Helpline: +91 98765 01001</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Pharmacy: +91 98765 01001</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Store Pickup Ready in 20–30 Minutes</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
            Shop by Category
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link to="/products?category=1" className="hover:text-white">Diabetes Care &amp; Insulin</Link></li>
            <li><Link to="/products?category=2" className="hover:text-white">Heart &amp; Blood Pressure Care</Link></li>
            <li><Link to="/products?category=3" className="hover:text-white">Pain Relief &amp; Fever</Link></li>
            <li><Link to="/products?category=4" className="hover:text-white">Vitamins &amp; Daily Immunity</Link></li>
            <li><Link to="/products?category=5" className="hover:text-white">Antibiotics &amp; Anti-Infectives</Link></li>
            <li><Link to="/products?category=8" className="hover:text-white">BP Monitors &amp; Glucometers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
            Hybrid Services &amp; Account
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link to="/prescriptions" className="hover:text-white">Upload Prescription (Web / WhatsApp)</Link></li>
            <li><Link to="/stores" className="hover:text-white">Store Locator &amp; 30-Min Pickup</Link></li>
            <li><Link to="/track" className="hover:text-white">Real-Time Order Tracking</Link></li>
            <li><Link to="/account" className="hover:text-white">My Account, Family Profiles &amp; Rx Vault</Link></li>
            <li><Link to="/admin" className="hover:text-amber-300 text-amber-400 font-semibold">Pharmacist &amp; Admin Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
            Policies &amp; Compliance
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link to="/about" className="hover:text-white">About MediShop Hybrid &amp; FAQs</Link></li>
            <li><Link to="/about#compliance" className="hover:text-white">Drug License &amp; Pharmacist Registry</Link></li>
            <li><Link to="/about#privacy" className="hover:text-white">WhatsApp Data &amp; Rx Privacy Policy</Link></li>
            <li><Link to="/about#returns" className="hover:text-white">Cold-Chain &amp; Return/Refund Policy</Link></li>
          </ul>
          <div className="mt-4 p-3 rounded-xl bg-slate-800 border border-slate-700 text-[11px] text-slate-300">
            <span className="font-bold text-emerald-400 block mb-0.5">⚠️ Regulatory Notice</span>
            We do not dispense Schedule X or habit-forming narcotics online. Schedule H/H1 medicines require a valid doctor prescription.
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 px-4 sm:px-6 text-center text-xs text-slate-500">
        © 2026 MediShop Hybrid Pharmacy Pvt. Ltd. Built per Jyotiraditya Bose's Project Specification.
      </div>
    </footer>
  );
};

export default Footer;
