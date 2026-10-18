import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Upload,
  MessageSquare,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  ShoppingCart,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const PrescriptionUpload = () => {
  const {
    user,
    familyMembers,
    prescriptions,
    uploadPrescription,
    verifyPrescriptionAdmin,
    addToCart
  } = useApp();

  const navigate = useNavigate();

  const [patientName, setPatientName] = useState(
    familyMembers[0] ? `${familyMembers[0].name} (${familyMembers[0].relation})` : user?.name || 'Jyotiraditya Bose'
  );
  const [doctorName, setDoctorName] = useState('Dr. Rajeshwari Menon');
  const [hospitalName, setHospitalName] = useState('Manipal Hospital, Indiranagar');
  const [notes, setNotes] = useState('Need 1 month refill of Glycomet-500 SR & Telma 40');
  const [imagePreview, setImagePreview] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleWebsiteUpload = async (e) => {
    e.preventDefault();
    const created = await uploadPrescription({
      patient_name: patientName,
      doctor_name: doctorName,
      hospital_name: hospitalName,
      image_url: imagePreview || undefined,
      notes,
      upload_source: 'Website'
    });
    setUploadSuccess(created);
    setImagePreview('');
  };

  const handleWhatsAppUpload = async () => {
    const created = await uploadPrescription({
      patient_name: patientName,
      doctor_name: doctorName,
      hospital_name: 'Sent via WhatsApp (+91 98765 01001)',
      notes: 'Direct WhatsApp photo prescription submission',
      upload_source: 'WhatsApp'
    });
    setUploadSuccess(created);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
        <span className="text-xs font-extrabold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
          Encrypted Rx Vault &amp; 15-Min Pharmacist Verification
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold mt-2">
          Upload or Send Your Prescription
        </h1>
        <p className="text-sm text-emerald-50 mt-1 max-w-2xl">
          Upload a photo/PDF of your doctor's prescription on the website or send it directly via WhatsApp. Our licensed pharmacists verify prescriptions within 15–30 minutes and send a WhatsApp confirmation.
        </p>
      </div>

      {uploadSuccess && (
        <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div className="text-xs sm:text-sm">
              <strong className="font-extrabold text-emerald-950 block">
                Prescription #{uploadSuccess.id} Uploaded Successfully ({uploadSuccess.upload_source})
              </strong>
              <span className="text-emerald-800">
                Status: {uploadSuccess.verification_status} • Click "Approve Rx (Demo)" on the card below to test the Pharmacist WhatsApp Notification!
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => verifyPrescriptionAdmin(uploadSuccess.id, 'Approved')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-sm"
          >
            ⚡ Simulate Pharmacist Approval Now
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: Upload Form + WhatsApp Direct Option */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-5">
          <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" />
            <span>Submit New Prescription</span>
          </h2>

          <form onSubmit={handleWebsiteUpload} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500 mb-1.5">
                Select Patient / Family Member
              </label>
              <select
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800"
              >
                <option value="Jyotiraditya Bose (Self)">Jyotiraditya Bose (Self)</option>
                {familyMembers.map(fm => (
                  <option key={fm.id} value={`${fm.name} (${fm.relation})`}>
                    {fm.name} ({fm.relation} • {fm.age} yrs)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500 mb-1">
                  Doctor Name *
                </label>
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500 mb-1">
                  Hospital / Clinic
                </label>
                <input
                  type="text"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500 mb-1">
                Upload Prescription Photo (JPG/PNG) or PDF
              </label>
              <label className="border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/40 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition">
                <Upload className="w-7 h-7 text-blue-600 mb-2" />
                <span className="text-xs font-bold text-blue-800">
                  {imagePreview
                    ? '✓ Custom Prescription Image Selected'
                    : 'Click to Select Photo/PDF (or submit directly with sample digital Rx)'}
                </span>
                <span className="text-[11px] text-gray-500 mt-1">
                  Encrypted AES-256 storage • Max 5 MB
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500 mb-1">
                Notes for Pharmacist (Dosage / Quantity / Call Preference)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md transition"
            >
              Upload Prescription to Pharmacist Queue
            </button>
          </form>

          {/* Or Send via WhatsApp Directly */}
          <div className="pt-4 border-t border-gray-100">
            <div className="bg-[#DCF8C6]/70 border border-emerald-300 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 font-extrabold text-xs text-emerald-950">
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>Prefer Sending via WhatsApp?</span>
              </div>
              <p className="text-xs text-emerald-900">
                Send your prescription photo directly to our official WhatsApp Pharmacy desk (+91 98765 01001).
              </p>
              <button
                type="button"
                onClick={handleWhatsAppUpload}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Simulate Direct WhatsApp Rx Submission</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Saved & Uploaded Prescriptions Vault */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-gray-900">
              Your Saved Prescriptions ({prescriptions.length})
            </h2>
            <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Encrypted &amp; Valid for 6 Months
            </span>
          </div>

          {prescriptions.map(rx => (
            <div
              key={rx.id}
              className="bg-white rounded-3xl border border-gray-200 p-5 flex flex-col sm:flex-row gap-5 shadow-sm"
            >
              <img
                src={rx.image_url}
                alt={`Prescription ${rx.id}`}
                className="w-full sm:w-36 h-44 object-contain bg-slate-50 rounded-2xl border border-gray-200 p-1 shrink-0"
              />

              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`text-xs font-extrabold px-3 py-1 rounded-full inline-flex items-center gap-1 ${
                        rx.verification_status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : rx.verification_status === 'Rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {rx.verification_status === 'Approved' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                      <span>{rx.verification_status}</span>
                    </span>
                    <span className="text-xs text-gray-400 font-semibold">
                      Rx #{rx.id} • Via {rx.upload_source}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-gray-900 mt-2">
                    {rx.doctor_name} — <span className="text-gray-600">{rx.hospital_name}</span>
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    <strong>Patient:</strong> {rx.patient_name} • <strong>Valid Until:</strong>{' '}
                    {rx.expiry_date}
                  </p>
                  <p className="text-xs bg-slate-50 border border-gray-100 rounded-xl p-2.5 text-gray-700 mt-2">
                    <strong>Pharmacist Note:</strong> {rx.pharmacist_notes}
                    {rx.verified_by && (
                      <span className="block text-[11px] text-emerald-700 font-semibold mt-0.5">
                        ✓ Verified by {rx.verified_by}
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
                  {rx.verification_status === 'Pending' && (
                    <button
                      type="button"
                      onClick={() => verifyPrescriptionAdmin(rx.id, 'Approved')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Approve Rx (Pharmacist Sim)</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      addToCart(1, 2);
                      addToCart(4, 1);
                      navigate('/cart');
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Order Medicines from This Rx</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionUpload;
