import React, { useState, useEffect } from 'react';
import { MessageSquare, ShieldCheck, X, CheckCircle2, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

const WhatsAppLogin = () => {
  const {
    loginModalOpen,
    setLoginModalOpen,
    requestWhatsAppOtp,
    verifyWhatsAppOtp,
    generatedOtpInfo
  } = useApp();

  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone] = useState('9876543210');
  const [name, setName] = useState('Jyotiraditya Bose');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loginModalOpen) {
      setStep('phone');
      setError('');
      setOtp('');
    }
  }, [loginModalOpen]);

  if (!loginModalOpen) return null;

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setError('');
    const clean = phone.replace(/\D/g, '');
    if (clean.length !== 10) {
      setError('Please enter a valid 10-digit Indian WhatsApp mobile number.');
      return;
    }
    setLoading(true);
    try {
      const res = await requestWhatsAppOtp(clean);
      setOtp(res.otp_code);
      setStep('otp');
    } catch (err) {
      setError(err.message || 'Could not send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    setError('');
    if (otp.trim().length !== 6) {
      setError('Please enter the 6-digit OTP sent to your WhatsApp.');
      return;
    }
    setLoading(true);
    try {
      await verifyWhatsAppOtp(phone, otp.trim(), name);
    } catch (err) {
      setError(err.message || 'Invalid OTP code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white relative">
          <button
            type="button"
            onClick={() => setLoginModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold bg-white/20 px-2.5 py-0.5 rounded-full">
                Passwordless Auth
              </span>
              <h2 className="text-xl font-extrabold mt-0.5">WhatsApp Instant Login</h2>
            </div>
          </div>
          <p className="text-xs text-emerald-50 leading-relaxed">
            No email, no password, no Google login required. Enter your 10-digit WhatsApp number to receive a 6-digit OTP.
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  10-Digit WhatsApp Number *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-gray-300 bg-slate-100 text-gray-700 font-bold text-sm">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-r-xl text-base font-bold tracking-wider text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Your Name (For Prescription &amp; Invoice)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jyotiraditya Bose"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Demo Account Quick Fill */}
              <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-3 flex items-center justify-between gap-2">
                <div className="text-xs text-blue-900">
                  <span className="font-bold block">Demo Account: Jyotiraditya Bose</span>
                  <span className="text-blue-600">WhatsApp: +91 98765 43210 (Pre-loaded Orders &amp; Rx)</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPhone('9876543210');
                    setName('Jyotiraditya Bose');
                  }}
                  className="text-xs bg-blue-600 text-white px-2.5 py-1.5 rounded-lg font-semibold shrink-0 hover:bg-blue-700"
                >
                  Use Demo
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition"
              >
                <span>{loading ? 'Sending WhatsApp OTP...' : 'Send 6-Digit OTP on WhatsApp'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {/* Live Simulated WhatsApp OTP Message Preview */}
              <div className="bg-[#DCF8C6] border border-emerald-300 rounded-2xl p-3.5 text-xs text-gray-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-emerald-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    WhatsApp Message Received (+91 {phone})
                  </span>
                  <span className="text-[10px] text-emerald-800 font-semibold">Just now ✓✓</span>
                </div>
                <pre className="font-mono text-xs whitespace-pre-wrap bg-white/80 p-2.5 rounded-xl border border-emerald-200 text-gray-900">
                  {`Your Medical Shop OTP is: ${generatedOtpInfo?.otp_code || otp}\n\nValid for 10 minutes.\n\nDo not share with anyone.`}
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Enter 6-Digit OTP
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Change Number (+91 {phone})
                  </button>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="w-full px-4 py-3 text-center tracking-[0.5em] text-xl font-extrabold border-2 border-emerald-500 rounded-xl bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{loading ? 'Verifying...' : 'Verify OTP & Continue'}</span>
              </button>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                <span>Didn't receive the WhatsApp message?</span>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-emerald-700 font-bold flex items-center gap-1 hover:underline"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Resend OTP
                </button>
              </div>
            </form>
          )}

          {/* Footer Compliance Note */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Encrypted session • Order updates, prescription verification &amp; 30-min pickup alerts are sent directly to your WhatsApp.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppLogin;
