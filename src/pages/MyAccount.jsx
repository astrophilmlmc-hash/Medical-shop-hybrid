import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  FileText,
  MapPin,
  Users,
  MessageSquare,
  Plus,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Truck,
  Store,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const MyAccount = () => {
  const {
    user,
    setLoginModalOpen,
    logout,
    updateUserProfile,
    orders,
    prescriptions,
    addresses,
    addAddress,
    deleteAddress,
    familyMembers,
    addFamilyMember,
    deleteFamilyMember,
    whatsappMessages,
    addToCart
  } = useApp();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  // New Family Member form
  const [newFamily, setNewFamily] = useState({
    name: '',
    relation: 'Spouse',
    age: '',
    blood_group: 'O+',
    chronic_conditions: '',
    regular_medicines: ''
  });

  // New Address form
  const [newAddr, setNewAddr] = useState({
    label: 'Office',
    address_line1: '',
    address_line2: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038'
  });

  // Profile form
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Jyotiraditya Bose',
    dob: user?.dob || '1996-08-14',
    gender: user?.gender || 'Male',
    marketing_opt_in: user?.marketing_opt_in ?? true,
    refill_reminders: user?.refill_reminders ?? true
  });
  const [profileSaved, setProfileSaved] = useState(false);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <MessageSquare className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Login with WhatsApp OTP to Access Your Account
        </h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          View your order history, saved prescriptions, family member profiles, and multiple delivery addresses using your 10-digit WhatsApp number.
        </p>
        <button
          type="button"
          onClick={() => setLoginModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm px-7 py-3.5 rounded-xl shadow-md transition"
        >
          Login via WhatsApp OTP
        </button>
      </div>
    );
  }

  const handleAddFamily = (e) => {
    e.preventDefault();
    if (!newFamily.name.trim()) return;
    addFamilyMember({
      ...newFamily,
      age: Number(newFamily.age || 35)
    });
    setNewFamily({
      name: '',
      relation: 'Spouse',
      age: '',
      blood_group: 'O+',
      chronic_conditions: '',
      regular_medicines: ''
    });
  };

  const handleAddAddr = (e) => {
    e.preventDefault();
    if (!newAddr.address_line1.trim()) return;
    addAddress({ ...newAddr, phone: user.whatsapp_number });
    setNewAddr({
      label: 'Office',
      address_line1: '',
      address_line2: '',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile(profileForm);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top User Profile Header */}
      <div className="bg-gradient-to-r from-blue-700 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white mb-8 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-extrabold text-2xl">
            {user.name.charAt(0)}
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
              WhatsApp Verified Account
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">{user.name}</h1>
            <p className="text-xs sm:text-sm text-blue-100">
              📱 Registered WhatsApp: +91 {user.whatsapp_number} • No Email/Password Required
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 border border-white/25 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 bg-white rounded-3xl border border-gray-200 p-4 space-y-1.5 shadow-sm">
          {[
            { id: 'orders', label: 'Order History', icon: Package, badge: orders.length },
            { id: 'prescriptions', label: 'Saved Prescriptions', icon: FileText, badge: prescriptions.length },
            { id: 'family', label: 'Family Profiles', icon: Users, badge: familyMembers.length },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin, badge: addresses.length },
            { id: 'whatsapp', label: 'WhatsApp Logs & Alerts', icon: MessageSquare, badge: whatsappMessages.length },
            { id: 'profile', label: 'Profile Settings', icon: User }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </span>
                {tab.badge !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-extrabold ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-gray-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Main Content Panel */}
        <div className="lg:col-span-9">
          {/* TAB 1: Order History */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-gray-900">Your Hybrid Order History</h2>
              {orders.map(order => (
                <div
                  key={order.order_number}
                  className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 space-y-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-extrabold text-base text-gray-900">
                        Order #{order.order_number}
                      </span>
                      <span
                        className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                          order.order_type === 'pickup'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.order_type === 'pickup' ? (
                          <>
                            <Store className="w-3 h-3" /> 30-Min Store Pickup
                          </>
                        ) : (
                          <>
                            <Truck className="w-3 h-3" /> Home Delivery
                          </>
                        )}
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {order.order_status}
                    </span>
                  </div>

                  <div className="text-xs text-gray-600 space-y-1">
                    <div>
                      <strong>Pharmacy Hub:</strong> {order.store_name}
                    </div>
                    <div>
                      <strong>Items:</strong>{' '}
                      {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
                    <div className="text-sm font-extrabold text-gray-900">
                      Total: ₹{order.total_amount.toFixed(2)}{' '}
                      <span className="text-xs font-normal text-gray-500">
                        ({order.payment_method})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          order.items.forEach(i => addToCart(i.product_id, i.quantity));
                          navigate('/cart');
                        }}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-800 text-xs font-bold flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reorder Medicines</span>
                      </button>
                      <Link
                        to={`/orders/${order.order_number}`}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                      >
                        Track Live Status →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Saved Prescriptions */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-gray-900">Saved Prescriptions Vault</h2>
                <Link
                  to="/prescriptions"
                  className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  + Upload New Prescription
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {prescriptions.map(rx => (
                  <div
                    key={rx.id}
                    className="bg-white rounded-3xl border border-gray-200 p-4 flex gap-4 shadow-sm"
                  >
                    <img
                      src={rx.image_url}
                      alt="Rx"
                      className="w-24 h-32 object-contain bg-slate-50 rounded-xl border border-gray-200 shrink-0"
                    />
                    <div className="text-xs space-y-1.5">
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full inline-block ${
                          rx.verification_status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {rx.verification_status}
                      </span>
                      <h3 className="font-extrabold text-sm text-gray-900">{rx.doctor_name}</h3>
                      <p className="text-gray-600">Patient: {rx.patient_name}</p>
                      <p className="text-gray-500">Valid till: {rx.expiry_date}</p>
                      <p className="text-[11px] text-emerald-700 font-medium">
                        {rx.pharmacist_notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Family Member Profiles */}
          {activeTab === 'family' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900">Family Member Profiles</h2>
                <p className="text-xs text-gray-500">
                  Manage prescriptions and monthly medicine refills for your parents, spouse, and children.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {familyMembers.map(member => (
                  <div
                    key={member.id}
                    className="bg-white rounded-3xl border border-gray-200 p-5 flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                          {member.relation}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteFamilyMember(member.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <h3 className="font-extrabold text-base text-gray-900">
                        {member.name} ({member.age} yrs • Blood: {member.blood_group})
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        <strong>Conditions:</strong> {member.chronic_conditions || 'None'}
                      </p>
                      <p className="text-xs text-emerald-700 font-semibold mt-1">
                        <strong>Regular Meds:</strong> {member.regular_medicines || 'None'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Family Member Form */}
              <form
                onSubmit={handleAddFamily}
                className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4 shadow-sm"
              >
                <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue-600" />
                  <span>Add Family Member Profile</span>
                </h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={newFamily.name}
                    onChange={(e) => setNewFamily({ ...newFamily, name: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-xl text-xs"
                    required
                  />
                  <select
                    value={newFamily.relation}
                    onChange={(e) => setNewFamily({ ...newFamily, relation: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Grandparent">Grandparent</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Age (Years)"
                    value={newFamily.age}
                    onChange={(e) => setNewFamily({ ...newFamily, age: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Chronic Conditions (e.g. Diabetes, BP)"
                    value={newFamily.chronic_conditions}
                    onChange={(e) =>
                      setNewFamily({ ...newFamily, chronic_conditions: e.target.value })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-xl text-xs sm:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="Regular Medicines"
                    value={newFamily.regular_medicines}
                    onChange={(e) =>
                      setNewFamily({ ...newFamily, regular_medicines: e.target.value })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl"
                >
                  Save Family Profile
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-gray-900">Saved Delivery Addresses</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {addresses.map(addr => (
                  <div
                    key={addr.id}
                    className="bg-white rounded-3xl border border-gray-200 p-5 flex justify-between items-start shadow-sm"
                  >
                    <div className="text-xs space-y-1">
                      <span className="bg-blue-100 text-blue-800 font-extrabold px-2.5 py-0.5 rounded-full inline-block mb-1">
                        {addr.label || 'Home'}
                      </span>
                      <p className="font-bold text-sm text-gray-900">{addr.address_line1}</p>
                      <p className="text-gray-600">
                        {addr.address_line2}, {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-gray-400">WhatsApp Contact: +91 {addr.phone}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteAddress(addr.id)}
                      className="text-gray-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleAddAddr}
                className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4 shadow-sm"
              >
                <h3 className="font-extrabold text-base text-gray-900">+ Add New Delivery Address</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Label (Home / Office / Parents)"
                    value={newAddr.label}
                    onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Flat / House No. / Building *"
                    value={newAddr.address_line1}
                    onChange={(e) => setNewAddr({ ...newAddr, address_line1: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-xl text-xs"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Street / Locality"
                    value={newAddr.address_line2}
                    onChange={(e) => setNewAddr({ ...newAddr, address_line2: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl"
                >
                  Save Address
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: WhatsApp Notifications Log */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-gray-900">
                WhatsApp Messages &amp; Notifications Sent to +91 {user.whatsapp_number}
              </h2>
              <div className="space-y-3">
                {whatsappMessages.map(msg => (
                  <div
                    key={msg.id}
                    className="bg-[#DCF8C6]/60 border border-emerald-300 rounded-2xl p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-emerald-950">
                        {msg.title} ({msg.message_type})
                      </span>
                      <span className="text-emerald-800 font-semibold">{msg.delivery_status}</span>
                    </div>
                    <pre className="font-mono text-xs whitespace-pre-wrap bg-white p-3 rounded-xl border border-emerald-200 text-gray-800">
                      {msg.message_content}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Profile Settings */}
          {activeTab === 'profile' && (
            <form
              onSubmit={handleSaveProfile}
              className="bg-white rounded-3xl border border-gray-200 p-6 space-y-5 shadow-sm"
            >
              <h2 className="text-xl font-extrabold text-gray-900">Profile &amp; WhatsApp Preferences</h2>
              {profileSaved && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Profile settings saved!</span>
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    Registered WhatsApp Number (Primary ID)
                  </label>
                  <input
                    type="text"
                    value={`+91 ${user.whatsapp_number}`}
                    disabled
                    className="w-full px-3.5 py-2.5 border border-gray-200 bg-slate-100 rounded-xl text-sm font-bold text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={profileForm.dob}
                    onChange={(e) => setProfileForm({ ...profileForm, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    Gender
                  </label>
                  <select
                    value={profileForm.gender}
                    onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileForm.refill_reminders}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, refill_reminders: e.target.checked })
                    }
                    className="accent-emerald-600"
                  />
                  <span className="font-semibold text-gray-800">
                    Send monthly WhatsApp medicine refill reminders for chronic care
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileForm.marketing_opt_in}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, marketing_opt_in: e.target.checked })
                    }
                    className="accent-emerald-600"
                  />
                  <span className="font-semibold text-gray-800">
                    Receive seasonal health tips and special offers on WhatsApp
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
