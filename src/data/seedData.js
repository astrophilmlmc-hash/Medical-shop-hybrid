// Helper to generate crisp, high-contrast SVG medicine illustrations as data URLs
const createMedSvg = (title, subtitle, badge, primaryColor, secondaryColor, type = 'tablet') => {
  const iconSvg =
    type === 'device'
      ? `<rect x="135" y="65" width="90" height="110" rx="14" fill="white" stroke="${primaryColor}" stroke-width="5"/>
         <rect x="150" y="82" width="60" height="42" rx="6" fill="${secondaryColor}"/>
         <text x="180" y="109" font-family="sans-serif" font-size="18" font-weight="bold" fill="${primaryColor}" text-anchor="middle">120/80</text>
         <circle cx="180" cy="148" r="12" fill="${primaryColor}"/>`
      : type === 'pen'
      ? `<rect x="160" y="55" width="40" height="130" rx="18" fill="white" stroke="${primaryColor}" stroke-width="5"/>
         <rect x="168" y="80" width="24" height="50" rx="4" fill="${secondaryColor}"/>
         <line x1="180" y1="40" x2="180" y2="55" stroke="${primaryColor}" stroke-width="6" stroke-linecap="round"/>`
      : `<rect x="115" y="68" width="130" height="105" rx="14" fill="white" stroke="${primaryColor}" stroke-width="4"/>
         <line x1="115" y1="100" x2="245" y2="100" stroke="${secondaryColor}" stroke-width="8"/>
         <circle cx="152" cy="128" r="11" fill="${primaryColor}" opacity="0.85"/>
         <circle cx="180" cy="128" r="11" fill="${primaryColor}" opacity="0.85"/>
         <circle cx="208" cy="128" r="11" fill="${primaryColor}" opacity="0.85"/>
         <circle cx="152" cy="152" r="11" fill="${primaryColor}" opacity="0.45"/>
         <circle cx="180" cy="152" r="11" fill="${primaryColor}" opacity="0.45"/>
         <circle cx="208" cy="152" r="11" fill="${primaryColor}" opacity="0.45"/>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 260" width="360" height="260">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${secondaryColor}"/>
        <stop offset="100%" stop-color="#ffffff"/>
      </linearGradient>
    </defs>
    <rect width="360" height="260" rx="20" fill="url(#bg)"/>
    <circle cx="310" cy="45" r="65" fill="${primaryColor}" opacity="0.08"/>
    <circle cx="45" cy="220" r="55" fill="${primaryColor}" opacity="0.06"/>
    <rect x="20" y="18" width="96" height="26" rx="13" fill="${primaryColor}"/>
    <text x="68" y="35" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">${badge}</text>
    ${iconSvg}
    <text x="180" y="208" font-family="sans-serif" font-size="17" font-weight="bold" fill="#1F2937" text-anchor="middle">${title}</text>
    <text x="180" y="229" font-family="sans-serif" font-size="12" fill="#4B5563" text-anchor="middle">${subtitle}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const CATEGORIES = [
  {
    id: 1,
    name: 'Diabetes Care',
    slug: 'diabetes-care',
    parent_id: null,
    icon: 'Activity',
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    description: 'Oral anti-diabetics, insulin pens, glucometers & test strips',
    count: 28
  },
  {
    id: 2,
    name: 'Heart & BP Care',
    slug: 'heart-care',
    parent_id: null,
    icon: 'HeartPulse',
    color: 'bg-rose-50 text-rose-600 border-rose-200',
    description: 'Blood pressure, cholesterol & cardiac maintenance medicines',
    count: 34
  },
  {
    id: 3,
    name: 'Pain Relief & Fever',
    slug: 'pain-relief',
    parent_id: null,
    icon: 'Flame',
    color: 'bg-amber-50 text-amber-600 border-amber-200',
    description: 'Antipyretics, analgesics, muscle relaxants & topical gels',
    count: 42
  },
  {
    id: 4,
    name: 'Vitamins & Immunity',
    slug: 'vitamins-wellness',
    parent_id: null,
    icon: 'Sparkles',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    description: 'Vitamin C, D3, Calcium, B-Complex & daily immunity boosters',
    count: 50
  },
  {
    id: 5,
    name: 'Antibiotics & Infection',
    slug: 'antibiotics',
    parent_id: null,
    icon: 'ShieldAlert',
    color: 'bg-purple-50 text-purple-600 border-purple-200',
    description: 'Schedule H antibacterial & anti-infective formulations',
    count: 19
  },
  {
    id: 6,
    name: 'Respiratory & Allergy',
    slug: 'respiratory',
    parent_id: null,
    icon: 'Wind',
    color: 'bg-cyan-50 text-cyan-600 border-cyan-200',
    description: 'Antihistamines, inhalers, cough syrups & nasal sprays',
    count: 23
  },
  {
    id: 7,
    name: 'Digestive & Gut Care',
    slug: 'digestive',
    parent_id: null,
    icon: 'Pill',
    color: 'bg-teal-50 text-teal-600 border-teal-200',
    description: 'Antacids, PPIs, probiotics & oral rehydration salts',
    count: 31
  },
  {
    id: 8,
    name: 'Medical Devices',
    slug: 'medical-devices',
    parent_id: null,
    icon: 'Stethoscope',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    description: 'BP monitors, glucometers, thermometers & oximeters',
    count: 15
  }
];

export const STORES = [
  {
    id: 1,
    store_name: 'MediShop Hybrid Flagship - Indiranagar',
    address: '100 Feet Road, Near Sony World Signal, Indiranagar, Bengaluru 560038',
    city: 'Bengaluru',
    pincode: '560038',
    latitude: 12.9784,
    longitude: 77.6408,
    phone: '+91 98765 01001',
    whatsapp: '919876501001',
    opening_time: '07:00 AM',
    closing_time: '11:30 PM',
    is_24x7: true,
    pharmacist_name: 'Dr. Ananya Rao (B.Pharm, Reg #KA-44821)',
    drug_license: 'KA-BLR-20B-88412 / 21B-88413',
    pickup_ready_mins: 20,
    rating: 4.9,
    reviews_count: 428,
    services: [
      '30-Min Express Pickup',
      '24x7 Pharmacy',
      'Pharmacist Consultation',
      'Cold Chain Storage',
      'Free BP & Sugar Check',
      'Home Delivery Hub'
    ]
  },
  {
    id: 2,
    store_name: 'MediShop Hybrid - Koramangala 4th Block',
    address: '80 Feet Road, 4th Block, Near Maharaja Signal, Koramangala, Bengaluru 560034',
    city: 'Bengaluru',
    pincode: '560034',
    latitude: 12.9352,
    longitude: 77.6245,
    phone: '+91 98765 01002',
    whatsapp: '919876501002',
    opening_time: '08:00 AM',
    closing_time: '11:00 PM',
    is_24x7: false,
    pharmacist_name: 'Mr. Karthik Nair (M.Pharm, Reg #KA-39104)',
    drug_license: 'KA-BLR-20B-77201 / 21B-77202',
    pickup_ready_mins: 25,
    rating: 4.8,
    reviews_count: 315,
    services: [
      '30-Min Express Pickup',
      'Pharmacist Consultation',
      'Cold Chain Storage',
      'Drive-Thru Pickup',
      'Home Delivery Hub'
    ]
  },
  {
    id: 3,
    store_name: 'MediShop Hybrid - HSR Layout Sector 2',
    address: '27th Main Road, Sector 2, HSR Layout, Bengaluru 560102',
    city: 'Bengaluru',
    pincode: '560102',
    latitude: 12.9116,
    longitude: 77.6389,
    phone: '+91 98765 01003',
    whatsapp: '919876501003',
    opening_time: '07:30 AM',
    closing_time: '11:00 PM',
    is_24x7: false,
    pharmacist_name: 'Ms. Priya Sharma (B.Pharm, Reg #KA-51209)',
    drug_license: 'KA-BLR-20B-91045 / 21B-91046',
    pickup_ready_mins: 30,
    rating: 4.9,
    reviews_count: 289,
    services: [
      '30-Min Express Pickup',
      'Free BP & Sugar Check',
      'Pharmacist Consultation',
      'Cold Chain Storage'
    ]
  },
  {
    id: 4,
    store_name: 'MediShop Hybrid 24x7 - Jayanagar 4th Block',
    address: '11th Main Road, 4th Block, Jayanagar, Bengaluru 560011',
    city: 'Bengaluru',
    pincode: '560011',
    latitude: 12.9299,
    longitude: 77.5824,
    phone: '+91 98765 01004',
    whatsapp: '919876501004',
    opening_time: 'Open 24 Hours',
    closing_time: 'Open 24 Hours',
    is_24x7: true,
    pharmacist_name: 'Mr. Suresh Babu (B.Pharm, Reg #KA-28910)',
    drug_license: 'KA-BLR-20B-65319 / 21B-65320',
    pickup_ready_mins: 20,
    rating: 4.7,
    reviews_count: 512,
    services: [
      '30-Min Express Pickup',
      '24x7 Pharmacy',
      'Free BP & Sugar Check',
      'Cold Chain Storage',
      'Home Delivery Hub'
    ]
  },
  {
    id: 5,
    store_name: 'MediShop Hybrid - Whitefield ITPL Main Rd',
    address: 'ITPL Main Road, Brookefield, Whitefield, Bengaluru 560066',
    city: 'Bengaluru',
    pincode: '560066',
    latitude: 12.9698,
    longitude: 77.7499,
    phone: '+91 98765 01005',
    whatsapp: '919876501005',
    opening_time: '08:00 AM',
    closing_time: '10:30 PM',
    is_24x7: false,
    pharmacist_name: 'Dr. Sneha Kulkarni (Pharm.D, Reg #KA-60422)',
    drug_license: 'KA-BLR-20B-94811 / 21B-94812',
    pickup_ready_mins: 30,
    rating: 4.8,
    reviews_count: 194,
    services: [
      '30-Min Express Pickup',
      'Pharmacist Consultation',
      'Drive-Thru Pickup',
      'Home Delivery Hub'
    ]
  }
];

export const PRODUCTS = [
  {
    id: 1,
    name: 'Glycomet-500 SR Tablet',
    generic_name: 'Metformin Hydrochloride Prolonged-Release (500mg)',
    brand: 'Glycomet',
    category_id: 1,
    category_name: 'Diabetes Care',
    pack_size: 'Strip of 20 SR Tablets',
    description: 'Glycomet-500 SR contains Metformin Hydrochloride 500mg in a sustained-release matrix. It is a first-line oral anti-diabetic medicine used in the management of Type 2 Diabetes Mellitus to control blood glucose levels after meals and fasting.',
    usage_instructions: 'Take 1 tablet daily with evening meal or as directed by your diabetologist. Swallow whole; do not crush or chew SR tablets.',
    side_effects: 'Mild nausea, metallic taste, stomach upset, or diarrhea during initial days. Take with food to minimize GI discomfort.',
    prescription_required: true,
    schedule_type: 'Schedule H',
    manufacturer: 'USV Private Limited',
    mrp: 68.00,
    selling_price: 56.00,
    image_url: createMedSvg('Glycomet-500 SR', 'Metformin HCl 500mg SR', 'SCHEDULE H • Rx', '#2563EB', '#DBEAFE', 'tablet'),
    alternatives: [
      { name: 'Gluconorm SR 500mg', manufacturer: 'Lupin Ltd', selling_price: 51.00, savings_pct: 9 },
      { name: 'Cetapin XR 500mg', manufacturer: 'Sanofi India', selling_price: 53.50, savings_pct: 4 },
      { name: 'Jan Aushadhi Metformin 500mg SR', manufacturer: 'PMBJP Generic', selling_price: 24.00, savings_pct: 57 }
    ],
    inventory: [
      { store_id: 1, quantity: 85, mrp: 68.00, selling_price: 56.00, batch_number: 'GL500-26A', expiry_date: '2028-04-30' },
      { store_id: 2, quantity: 62, mrp: 68.00, selling_price: 56.00, batch_number: 'GL500-26A', expiry_date: '2028-04-30' },
      { store_id: 3, quantity: 40, mrp: 68.00, selling_price: 56.00, batch_number: 'GL500-26B', expiry_date: '2028-06-30' },
      { store_id: 4, quantity: 110, mrp: 68.00, selling_price: 56.00, batch_number: 'GL500-26A', expiry_date: '2028-04-30' },
      { store_id: 5, quantity: 28, mrp: 68.00, selling_price: 56.00, batch_number: 'GL500-26B', expiry_date: '2028-06-30' }
    ]
  },
  {
    id: 2,
    name: 'Limcee Plus Vitamin C 500mg + Zinc Chewable Tablets',
    generic_name: 'Ascorbic Acid (500mg) + Zinc Sulphate (5mg)',
    brand: 'Limcee',
    category_id: 4,
    category_name: 'Vitamins & Immunity',
    pack_size: 'Strip of 15 Orange Chewable Tablets',
    description: 'Daily immunity & antioxidant booster combining Vitamin C 500mg and elemental Zinc. Supports collagen synthesis, faster wound recovery, iron absorption, and seasonal respiratory defense.',
    usage_instructions: 'Chew 1 tablet daily after meals or as advised by a healthcare professional.',
    side_effects: 'Generally well tolerated. Excessive doses (>2000mg/day) may cause mild gastric acidity.',
    prescription_required: false,
    schedule_type: 'OTC',
    manufacturer: 'Abbott Healthcare Pvt Ltd',
    mrp: 45.00,
    selling_price: 38.00,
    image_url: createMedSvg('Limcee Plus C+Zn', 'Vitamin C 500mg + Zinc', 'OTC • NO Rx', '#10B981', '#D1FAE5', 'tablet'),
    alternatives: [
      { name: 'Celin + Zinc Chewable', manufacturer: 'GSK Healthcare', selling_price: 35.00, savings_pct: 8 },
      { name: 'Sukcee-Z Chewable', manufacturer: 'Mankind Pharma', selling_price: 29.00, savings_pct: 24 }
    ],
    inventory: [
      { store_id: 1, quantity: 140, mrp: 45.00, selling_price: 38.00, batch_number: 'LMC-902', expiry_date: '2028-02-28' },
      { store_id: 2, quantity: 95, mrp: 45.00, selling_price: 38.00, batch_number: 'LMC-902', expiry_date: '2028-02-28' },
      { store_id: 3, quantity: 78, mrp: 45.00, selling_price: 38.00, batch_number: 'LMC-904', expiry_date: '2028-05-31' },
      { store_id: 4, quantity: 160, mrp: 45.00, selling_price: 38.00, batch_number: 'LMC-902', expiry_date: '2028-02-28' },
      { store_id: 5, quantity: 64, mrp: 45.00, selling_price: 38.00, batch_number: 'LMC-904', expiry_date: '2028-05-31' }
    ]
  },
  {
    id: 3,
    name: 'Dolo 650 Tablet',
    generic_name: 'Paracetamol / Acetaminophen (650mg)',
    brand: 'Dolo',
    category_id: 3,
    category_name: 'Pain Relief & Fever',
    pack_size: 'Strip of 15 Tablets',
    description: 'Trusted antipyretic and analgesic tablet used for effective relief from fever, headache, toothache, body ache, and post-vaccination pyrexia.',
    usage_instructions: '1 tablet every 6 to 8 hours after food as needed for fever/pain. Do not exceed 4 tablets (2600mg) in 24 hours.',
    side_effects: 'Rare when taken at recommended dosage. Avoid alcohol and concurrent paracetamol-containing cold medicines.',
    prescription_required: false,
    schedule_type: 'OTC',
    manufacturer: 'Micro Labs Ltd',
    mrp: 36.00,
    selling_price: 30.00,
    image_url: createMedSvg('Dolo 650', 'Paracetamol IP 650mg', 'OTC • FAST RELIEF', '#3B82F6', '#EFF6FF', 'tablet'),
    alternatives: [
      { name: 'Calpol 650mg', manufacturer: 'GSK', selling_price: 29.00, savings_pct: 3 },
      { name: 'Pacimol 650mg', manufacturer: 'Ipca Laboratories', selling_price: 27.00, savings_pct: 10 },
      { name: 'P-650 Tablet', manufacturer: 'Apex Laboratories', selling_price: 25.00, savings_pct: 17 }
    ],
    inventory: [
      { store_id: 1, quantity: 220, mrp: 36.00, selling_price: 30.00, batch_number: 'DL650-88', expiry_date: '2028-08-31' },
      { store_id: 2, quantity: 180, mrp: 36.00, selling_price: 30.00, batch_number: 'DL650-88', expiry_date: '2028-08-31' },
      { store_id: 3, quantity: 145, mrp: 36.00, selling_price: 30.00, batch_number: 'DL650-89', expiry_date: '2028-09-30' },
      { store_id: 4, quantity: 250, mrp: 36.00, selling_price: 30.00, batch_number: 'DL650-88', expiry_date: '2028-08-31' },
      { store_id: 5, quantity: 110, mrp: 36.00, selling_price: 30.00, batch_number: 'DL650-89', expiry_date: '2028-09-30' }
    ]
  },
  {
    id: 4,
    name: 'Telma 40 Tablet',
    generic_name: 'Telmisartan IP (40mg)',
    brand: 'Telma',
    category_id: 2,
    category_name: 'Heart & BP Care',
    pack_size: 'Strip of 30 Tablets',
    description: 'Angiotensin II Receptor Blocker (ARB) prescribed for essential hypertension (high blood pressure) and reducing cardiovascular risk in patients with cardiac history.',
    usage_instructions: 'Take 1 tablet daily at the same time each day, with or without food, as prescribed by your cardiologist.',
    side_effects: 'Mild dizziness upon standing, sinus congestion, or back pain. Monitor blood pressure and serum potassium regularly.',
    prescription_required: true,
    schedule_type: 'Schedule H',
    manufacturer: 'Glenmark Pharmaceuticals Ltd',
    mrp: 245.00,
    selling_price: 204.00,
    image_url: createMedSvg('Telma 40', 'Telmisartan IP 40mg', 'SCHEDULE H • Rx', '#E11D48', '#FFE4E6', 'tablet'),
    alternatives: [
      { name: 'Telsartan 40', manufacturer: 'Dr. Reddy’s', selling_price: 175.00, savings_pct: 14 },
      { name: 'Cresar 40', manufacturer: 'Cipla Ltd', selling_price: 168.00, savings_pct: 18 },
      { name: 'Telmikind 40', manufacturer: 'Mankind Pharma', selling_price: 112.00, savings_pct: 45 }
    ],
    inventory: [
      { store_id: 1, quantity: 55, mrp: 245.00, selling_price: 204.00, batch_number: 'TLM40-11', expiry_date: '2028-03-31' },
      { store_id: 2, quantity: 42, mrp: 245.00, selling_price: 204.00, batch_number: 'TLM40-11', expiry_date: '2028-03-31' },
      { store_id: 3, quantity: 31, mrp: 245.00, selling_price: 204.00, batch_number: 'TLM40-14', expiry_date: '2028-07-31' },
      { store_id: 4, quantity: 68, mrp: 245.00, selling_price: 204.00, batch_number: 'TLM40-11', expiry_date: '2028-03-31' },
      { store_id: 5, quantity: 24, mrp: 245.00, selling_price: 204.00, batch_number: 'TLM40-14', expiry_date: '2028-07-31' }
    ]
  },
  {
    id: 5,
    name: 'Augmentin 625 Duo Tablet',
    generic_name: 'Amoxycillin (500mg) + Clavulanic Acid (125mg)',
    brand: 'Augmentin',
    category_id: 5,
    category_name: 'Antibiotics & Infection',
    pack_size: 'Strip of 10 Film-Coated Tablets',
    description: 'Broad-spectrum beta-lactamase inhibitor antibiotic combination indicated for bacterial sinusitis, respiratory tract infections, dental abscess, urinary tract infections, and skin infections.',
    usage_instructions: 'Take 1 tablet every 12 hours at the start of a meal for the full prescribed course (usually 5–7 days). Never stop early.',
    side_effects: 'Loose stools, nausea, mild skin rash. Probiotic supplementation may help maintain gut flora.',
    prescription_required: true,
    schedule_type: 'Schedule H',
    manufacturer: 'GlaxoSmithKline Pharmaceuticals Ltd',
    mrp: 223.00,
    selling_price: 189.00,
    image_url: createMedSvg('Augmentin 625 Duo', 'Amoxycillin + Clavulanate', 'SCHEDULE H • Rx', '#7C3AED', '#F3E8FF', 'tablet'),
    alternatives: [
      { name: 'Moxikind-CV 625', manufacturer: 'Mankind Pharma', selling_price: 148.00, savings_pct: 22 },
      { name: 'Clavam 625 Tablet', manufacturer: 'Alkem Laboratories', selling_price: 172.00, savings_pct: 9 }
    ],
    inventory: [
      { store_id: 1, quantity: 48, mrp: 223.00, selling_price: 189.00, batch_number: 'AUG-625X', expiry_date: '2027-11-30' },
      { store_id: 2, quantity: 35, mrp: 223.00, selling_price: 189.00, batch_number: 'AUG-625X', expiry_date: '2027-11-30' },
      { store_id: 3, quantity: 19, mrp: 223.00, selling_price: 189.00, batch_number: 'AUG-625Y', expiry_date: '2028-01-31' },
      { store_id: 4, quantity: 52, mrp: 223.00, selling_price: 189.00, batch_number: 'AUG-625X', expiry_date: '2027-11-30' },
      { store_id: 5, quantity: 8, mrp: 223.00, selling_price: 189.00, batch_number: 'AUG-625Y', expiry_date: '2028-01-31' }
    ]
  },
  {
    id: 6,
    name: 'Atorva 10 Tablet',
    generic_name: 'Atorvastatin IP (10mg)',
    brand: 'Atorva',
    category_id: 2,
    category_name: 'Heart & BP Care',
    pack_size: 'Strip of 15 Tablets',
    description: 'HMG-CoA reductase inhibitor (statin) that lowers LDL ("bad") cholesterol and triglycerides while raising HDL ("good") cholesterol to prevent heart attacks and stroke.',
    usage_instructions: 'Take 1 tablet once daily at bedtime or as advised by your physician.',
    side_effects: 'Mild muscle ache, headache, digestive discomfort. Report unexplained muscle tenderness to your doctor.',
    prescription_required: true,
    schedule_type: 'Schedule H',
    manufacturer: 'Zydus Cadila Healthcare',
    mrp: 112.00,
    selling_price: 92.00,
    image_url: createMedSvg('Atorva 10', 'Atorvastatin IP 10mg', 'SCHEDULE H • Rx', '#E11D48', '#FFE4E6', 'tablet'),
    alternatives: [
      { name: 'Storvas 10', manufacturer: 'Sun Pharma', selling_price: 84.00, savings_pct: 9 },
      { name: 'Lipvas 10', manufacturer: 'Cipla Ltd', selling_price: 79.00, savings_pct: 14 }
    ],
    inventory: [
      { store_id: 1, quantity: 72, mrp: 112.00, selling_price: 92.00, batch_number: 'ATV10-03', expiry_date: '2028-05-31' },
      { store_id: 2, quantity: 50, mrp: 112.00, selling_price: 92.00, batch_number: 'ATV10-03', expiry_date: '2028-05-31' },
      { store_id: 3, quantity: 44, mrp: 112.00, selling_price: 92.00, batch_number: 'ATV10-03', expiry_date: '2028-05-31' },
      { store_id: 4, quantity: 80, mrp: 112.00, selling_price: 92.00, batch_number: 'ATV10-03', expiry_date: '2028-05-31' },
      { store_id: 5, quantity: 33, mrp: 112.00, selling_price: 92.00, batch_number: 'ATV10-03', expiry_date: '2028-05-31' }
    ]
  },
  {
    id: 7,
    name: 'Pan-40 Tablet',
    generic_name: 'Pantoprazole Gastro-Resistant IP (40mg)',
    brand: 'Pan',
    category_id: 7,
    category_name: 'Digestive & Gut Care',
    pack_size: 'Strip of 15 Gastro-Resistant Tablets',
    description: 'Proton Pump Inhibitor (PPI) that reduces stomach acid production for fast relief from acid reflux, GERD, heartburn, and peptic ulcer disease.',
    usage_instructions: 'Take 1 tablet in the morning on an empty stomach, 30 minutes before breakfast.',
    side_effects: 'Mild headache, flatulence, or dryness of mouth.',
    prescription_required: true,
    schedule_type: 'Schedule H',
    manufacturer: 'Alkem Laboratories Ltd',
    mrp: 165.00,
    selling_price: 138.00,
    image_url: createMedSvg('Pan-40', 'Pantoprazole IP 40mg', 'SCHEDULE H • Rx', '#0D9488', '#CCFBF1', 'tablet'),
    alternatives: [
      { name: 'Pantocid 40', manufacturer: 'Sun Pharma', selling_price: 132.00, savings_pct: 4 },
      { name: 'Pantop 40', manufacturer: 'Aristo Pharmaceuticals', selling_price: 118.00, savings_pct: 14 }
    ],
    inventory: [
      { store_id: 1, quantity: 110, mrp: 165.00, selling_price: 138.00, batch_number: 'PN40-501', expiry_date: '2028-06-30' },
      { store_id: 2, quantity: 90, mrp: 165.00, selling_price: 138.00, batch_number: 'PN40-501', expiry_date: '2028-06-30' },
      { store_id: 3, quantity: 65, mrp: 165.00, selling_price: 138.00, batch_number: 'PN40-502', expiry_date: '2028-07-31' },
      { store_id: 4, quantity: 130, mrp: 165.00, selling_price: 138.00, batch_number: 'PN40-501', expiry_date: '2028-06-30' },
      { store_id: 5, quantity: 48, mrp: 165.00, selling_price: 138.00, batch_number: 'PN40-502', expiry_date: '2028-07-31' }
    ]
  },
  {
    id: 8,
    name: 'Montair LC Tablet',
    generic_name: 'Montelukast (10mg) + Levocetirizine (5mg)',
    brand: 'Montair',
    category_id: 6,
    category_name: 'Respiratory & Allergy',
    pack_size: 'Strip of 15 Tablets',
    description: 'Dual-action anti-allergic and leukotriene receptor antagonist for allergic rhinitis, seasonal sneezing, watery eyes, nasal congestion, and asthma prophylaxis.',
    usage_instructions: 'Take 1 tablet in the evening or at bedtime as directed by your physician.',
    side_effects: 'Mild drowsiness, dry mouth, or fatigue. Avoid driving immediately after taking if drowsy.',
    prescription_required: true,
    schedule_type: 'Schedule H',
    manufacturer: 'Cipla Ltd',
    mrp: 310.00,
    selling_price: 254.00,
    image_url: createMedSvg('Montair LC', 'Montelukast + Levocetirizine', 'SCHEDULE H • Rx', '#0891B2', '#CFFAFE', 'tablet'),
    alternatives: [
      { name: 'Montek LC', manufacturer: 'Sun Pharma', selling_price: 235.00, savings_pct: 7 },
      { name: 'Telekast-L', manufacturer: 'Lupin Ltd', selling_price: 218.00, savings_pct: 14 }
    ],
    inventory: [
      { store_id: 1, quantity: 60, mrp: 310.00, selling_price: 254.00, batch_number: 'MLC-209', expiry_date: '2028-03-31' },
      { store_id: 2, quantity: 44, mrp: 310.00, selling_price: 254.00, batch_number: 'MLC-209', expiry_date: '2028-03-31' },
      { store_id: 3, quantity: 38, mrp: 310.00, selling_price: 254.00, batch_number: 'MLC-210', expiry_date: '2028-05-31' },
      { store_id: 4, quantity: 75, mrp: 310.00, selling_price: 254.00, batch_number: 'MLC-209', expiry_date: '2028-03-31' },
      { store_id: 5, quantity: 29, mrp: 310.00, selling_price: 254.00, batch_number: 'MLC-210', expiry_date: '2028-05-31' }
    ]
  },
  {
    id: 9,
    name: 'Lantus Solostar Insulin Pen (100 IU/ml)',
    generic_name: 'Insulin Glargine Injection (100 IU/ml)',
    brand: 'Lantus',
    category_id: 1,
    category_name: 'Diabetes Care',
    pack_size: '1 Pre-filled Disposable Pen (3ml)',
    description: 'Long-acting basal insulin analogue providing steady 24-hour blood glucose control for patients with Type 1 and Type 2 Diabetes. Shipped & stored in 2°C–8°C Cold Chain packaging.',
    usage_instructions: 'Inject subcutaneously once daily at the same time every day. Store unused pens in refrigerator (2°C–8°C).',
    side_effects: 'Hypoglycemia (low blood sugar) if meal is skipped, mild injection site redness.',
    prescription_required: true,
    schedule_type: 'Schedule H',
    manufacturer: 'Sanofi India Ltd',
    mrp: 865.00,
    selling_price: 745.00,
    image_url: createMedSvg('Lantus Solostar', 'Insulin Glargine 100 IU/ml', 'COLD CHAIN • Rx', '#1D4ED8', '#DBEAFE', 'pen'),
    alternatives: [
      { name: 'Basalog One Pen 3ml', manufacturer: 'Biocon Biologics', selling_price: 590.00, savings_pct: 21 },
      { name: 'Glaritus DispoPen', manufacturer: 'Wockhardt', selling_price: 610.00, savings_pct: 18 }
    ],
    inventory: [
      { store_id: 1, quantity: 18, mrp: 865.00, selling_price: 745.00, batch_number: 'LNT-CC1', expiry_date: '2027-09-30' },
      { store_id: 2, quantity: 12, mrp: 865.00, selling_price: 745.00, batch_number: 'LNT-CC1', expiry_date: '2027-09-30' },
      { store_id: 3, quantity: 9, mrp: 865.00, selling_price: 745.00, batch_number: 'LNT-CC2', expiry_date: '2027-10-31' },
      { store_id: 4, quantity: 22, mrp: 865.00, selling_price: 745.00, batch_number: 'LNT-CC1', expiry_date: '2027-09-30' },
      { store_id: 5, quantity: 6, mrp: 865.00, selling_price: 745.00, batch_number: 'LNT-CC2', expiry_date: '2027-10-31' }
    ]
  },
  {
    id: 10,
    name: 'Uprise-D3 60K Softgel Capsule',
    generic_name: 'Cholecalciferol / Vitamin D3 (60,000 IU)',
    brand: 'Uprise-D3',
    category_id: 4,
    category_name: 'Vitamins & Immunity',
    pack_size: 'Strip of 8 Softgel Capsules',
    description: 'High-strength Vitamin D3 60,000 IU softgel capsule for treating Vitamin D deficiency, strengthening bone density, calcium absorption, and muscle function.',
    usage_instructions: 'Take 1 capsule once a week with milk or after a meal for 8 weeks, or as advised by your doctor.',
    side_effects: 'Safe at weekly dosage. Avoid taking daily without medical supervision.',
    prescription_required: false,
    schedule_type: 'OTC',
    manufacturer: 'Alkem Laboratories Ltd',
    mrp: 290.00,
    selling_price: 235.00,
    image_url: createMedSvg('Uprise-D3 60K', 'Vitamin D3 60,000 IU', 'OTC • BONE CARE', '#059669', '#D1FAE5', 'tablet'),
    alternatives: [
      { name: 'Calcirol 60K Softgel', manufacturer: 'Cadila Pharmaceuticals', selling_price: 215.00, savings_pct: 9 },
      { name: 'Arachitol Nano 60K', manufacturer: 'Abbott', selling_price: 225.00, savings_pct: 4 }
    ],
    inventory: [
      { store_id: 1, quantity: 95, mrp: 290.00, selling_price: 235.00, batch_number: 'UPD3-77', expiry_date: '2028-04-30' },
      { store_id: 2, quantity: 70, mrp: 290.00, selling_price: 235.00, batch_number: 'UPD3-77', expiry_date: '2028-04-30' },
      { store_id: 3, quantity: 55, mrp: 290.00, selling_price: 235.00, batch_number: 'UPD3-77', expiry_date: '2028-04-30' },
      { store_id: 4, quantity: 88, mrp: 290.00, selling_price: 235.00, batch_number: 'UPD3-77', expiry_date: '2028-04-30' },
      { store_id: 5, quantity: 40, mrp: 290.00, selling_price: 235.00, batch_number: 'UPD3-77', expiry_date: '2028-04-30' }
    ]
  },
  {
    id: 11,
    name: 'Omron HEM-7120 Automatic Blood Pressure Monitor',
    generic_name: 'Oscillometric Digital Upper Arm BP Monitor',
    brand: 'Omron',
    category_id: 8,
    category_name: 'Medical Devices',
    pack_size: '1 Unit + IntelliWrap Cuff (22-32cm) + 4 AA Batteries',
    description: 'Clinically validated digital blood pressure monitor featuring Enhanced IntelliSense technology for accurate systolic, diastolic, and pulse readings with hypertension & body movement indicators.',
    usage_instructions: 'Wrap cuff snugly 1–2 cm above elbow on left arm, rest quietly for 5 minutes, and press START/STOP.',
    side_effects: 'No side effects. Includes 3-year manufacturer warranty at all MediShop Hybrid stores.',
    prescription_required: false,
    schedule_type: 'OTC',
    manufacturer: 'Omron Healthcare India Pvt Ltd',
    mrp: 2345.00,
    selling_price: 1899.00,
    image_url: createMedSvg('Omron HEM-7120', 'Digital BP Monitor + Cuff', 'DEVICE • 3YR WARR', '#4F46E5', '#E0E7FF', 'device'),
    alternatives: [
      { name: 'Dr. Morepen BP-02 Monitor', manufacturer: 'Morepen Labs', selling_price: 1349.00, savings_pct: 29 },
      { name: 'AccuSure AS Series BP Monitor', manufacturer: 'Micro Gene', selling_price: 1499.00, savings_pct: 21 }
    ],
    inventory: [
      { store_id: 1, quantity: 14, mrp: 2345.00, selling_price: 1899.00, batch_number: 'OMR-7120A', expiry_date: '2030-12-31' },
      { store_id: 2, quantity: 9, mrp: 2345.00, selling_price: 1899.00, batch_number: 'OMR-7120A', expiry_date: '2030-12-31' },
      { store_id: 3, quantity: 7, mrp: 2345.00, selling_price: 1899.00, batch_number: 'OMR-7120A', expiry_date: '2030-12-31' },
      { store_id: 4, quantity: 11, mrp: 2345.00, selling_price: 1899.00, batch_number: 'OMR-7120A', expiry_date: '2030-12-31' },
      { store_id: 5, quantity: 5, mrp: 2345.00, selling_price: 1899.00, batch_number: 'OMR-7120A', expiry_date: '2030-12-31' }
    ]
  },
  {
    id: 12,
    name: 'Accu-Chek Active Blood Glucose Glucometer Kit (with 25 Strips)',
    generic_name: 'Capillary Blood Glucose Monitoring System',
    brand: 'Accu-Chek',
    category_id: 8,
    category_name: 'Medical Devices',
    pack_size: 'Glucometer + Softclix Lancing Device + 10 Lancets + 25 Test Strips',
    description: 'ISO 15197:2013 compliant instant blood glucose meter delivering accurate readings in 5 seconds with pre/post-meal markers and 90-day average tracking.',
    usage_instructions: 'Insert test strip, prick side of fingertip with Softclix lancet, apply tiny drop of blood to green center field.',
    side_effects: 'Keep test strip vial tightly closed away from moisture.',
    prescription_required: false,
    schedule_type: 'OTC',
    manufacturer: 'Roche Diabetes Care India',
    mrp: 1599.00,
    selling_price: 1299.00,
    image_url: createMedSvg('Accu-Chek Active', 'Glucometer + 25 Free Strips', 'DEVICE • 5s RESULT', '#2563EB', '#DBEAFE', 'device'),
    alternatives: [
      { name: 'OneTouch Select Plus Simple Kit', manufacturer: 'LifeScan', selling_price: 1149.00, savings_pct: 12 },
      { name: 'Dr. Morepen BG-03 GlucoOne Kit', manufacturer: 'Morepen Labs', selling_price: 699.00, savings_pct: 46 }
    ],
    inventory: [
      { store_id: 1, quantity: 20, mrp: 1599.00, selling_price: 1299.00, batch_number: 'ACK-2026', expiry_date: '2028-10-31' },
      { store_id: 2, quantity: 15, mrp: 1599.00, selling_price: 1299.00, batch_number: 'ACK-2026', expiry_date: '2028-10-31' },
      { store_id: 3, quantity: 12, mrp: 1599.00, selling_price: 1299.00, batch_number: 'ACK-2026', expiry_date: '2028-10-31' },
      { store_id: 4, quantity: 18, mrp: 1599.00, selling_price: 1299.00, batch_number: 'ACK-2026', expiry_date: '2028-10-31' },
      { store_id: 5, quantity: 10, mrp: 1599.00, selling_price: 1299.00, batch_number: 'ACK-2026', expiry_date: '2028-10-31' }
    ]
  },
  {
    id: 13,
    name: 'Azithral 500 Tablet',
    generic_name: 'Azithromycin Dihydrate IP (500mg)',
    brand: 'Azithral',
    category_id: 5,
    category_name: 'Antibiotics & Infection',
    pack_size: 'Strip of 5 Tablets',
    description: 'Macrolide antibiotic indicated for upper and lower respiratory tract infections, pharyngitis, tonsillitis, and skin/soft-tissue bacterial infections.',
    usage_instructions: 'Take 1 tablet once daily 1 hour before or 2 hours after meals for 3 to 5 days as prescribed.',
    side_effects: 'Abdominal cramping, mild nausea, or loose stools.',
    prescription_required: true,
    schedule_type: 'Schedule H',
    manufacturer: 'Alembic Pharmaceuticals Ltd',
    mrp: 132.00,
    selling_price: 114.00,
    image_url: createMedSvg('Azithral 500', 'Azithromycin IP 500mg', 'SCHEDULE H • Rx', '#7C3AED', '#F3E8FF', 'tablet'),
    alternatives: [
      { name: 'Azee 500 Tablet', manufacturer: 'Cipla Ltd', selling_price: 108.00, savings_pct: 5 },
      { name: 'Zady 500 Tablet', manufacturer: 'Mankind Pharma', selling_price: 92.00, savings_pct: 19 }
    ],
    inventory: [
      { store_id: 1, quantity: 64, mrp: 132.00, selling_price: 114.00, batch_number: 'AZT-500M', expiry_date: '2028-04-30' },
      { store_id: 2, quantity: 41, mrp: 132.00, selling_price: 114.00, batch_number: 'AZT-500M', expiry_date: '2028-04-30' },
      { store_id: 3, quantity: 29, mrp: 132.00, selling_price: 114.00, batch_number: 'AZT-500M', expiry_date: '2028-04-30' },
      { store_id: 4, quantity: 53, mrp: 132.00, selling_price: 114.00, batch_number: 'AZT-500M', expiry_date: '2028-04-30' },
      { store_id: 5, quantity: 7, mrp: 132.00, selling_price: 114.00, batch_number: 'AZT-500M', expiry_date: '2028-04-30' }
    ]
  },
  {
    id: 14,
    name: 'Shelcal 500 Calcium + Vitamin D3 Tablet',
    generic_name: 'Elemental Calcium (500mg) + Vitamin D3 (250 IU)',
    brand: 'Shelcal',
    category_id: 4,
    category_name: 'Vitamins & Immunity',
    pack_size: 'Strip of 15 Film-Coated Tablets',
    description: 'High-absorption calcium carbonate with Vitamin D3 supplement for joint & bone strength, osteoporosis prevention, pregnancy/lactation support, and fracture recovery.',
    usage_instructions: 'Take 1 tablet once or twice daily after meals.',
    side_effects: 'Mild constipation or bloating in sensitive individuals; drink plenty of water.',
    prescription_required: false,
    schedule_type: 'OTC',
    manufacturer: 'Torrent Pharmaceuticals Ltd',
    mrp: 144.00,
    selling_price: 122.00,
    image_url: createMedSvg('Shelcal 500', 'Calcium 500mg + Vit D3', 'OTC • BONE STRENGTH', '#10B981', '#D1FAE5', 'tablet'),
    alternatives: [
      { name: 'Cipcal 500 Tablet', manufacturer: 'Cipla Ltd', selling_price: 98.00, savings_pct: 20 },
      { name: 'Gemcal Capsule', manufacturer: 'Alkem Labs', selling_price: 115.00, savings_pct: 6 }
    ],
    inventory: [
      { store_id: 1, quantity: 105, mrp: 144.00, selling_price: 122.00, batch_number: 'SHC-500', expiry_date: '2028-06-30' },
      { store_id: 2, quantity: 82, mrp: 144.00, selling_price: 122.00, batch_number: 'SHC-500', expiry_date: '2028-06-30' },
      { store_id: 3, quantity: 64, mrp: 144.00, selling_price: 122.00, batch_number: 'SHC-500', expiry_date: '2028-06-30' },
      { store_id: 4, quantity: 91, mrp: 144.00, selling_price: 122.00, batch_number: 'SHC-500', expiry_date: '2028-06-30' },
      { store_id: 5, quantity: 50, mrp: 144.00, selling_price: 122.00, batch_number: 'SHC-500', expiry_date: '2028-06-30' }
    ]
  },
  {
    id: 15,
    name: 'Electral WHO ORS Powder Sachet (Pack of 5)',
    generic_name: 'Oral Rehydration Salts IP (Sodium, Potassium, Citrate, Dextrose)',
    brand: 'Electral',
    category_id: 7,
    category_name: 'Digestive & Gut Care',
    pack_size: 'Pack of 5 Sachets (21.8g each)',
    description: 'WHO-recommended osmolarity Oral Rehydration Salt formula to rapidly restore body fluids and electrolytes lost due to dehydration, diarrhea, vomiting, or heat exhaustion.',
    usage_instructions: 'Dissolve entire 21.8g sachet in 1 litre of clean drinking water. Consume within 24 hours.',
    side_effects: 'None when reconstituted in the correct 1-litre water volume.',
    prescription_required: false,
    schedule_type: 'OTC',
    manufacturer: 'FDC Limited',
    mrp: 110.00,
    selling_price: 95.00,
    image_url: createMedSvg('Electral WHO ORS', 'Oral Rehydration Salts (5x)', 'OTC • HYDRATION', '#0D9488', '#CCFBF1', 'tablet'),
    alternatives: [
      { name: 'ORSL Electrolyte Pack', manufacturer: 'JNTL Consumer Health', selling_price: 88.00, savings_pct: 7 },
      { name: 'Prolyte ORS Powder', manufacturer: 'Cipla Health', selling_price: 82.00, savings_pct: 14 }
    ],
    inventory: [
      { store_id: 1, quantity: 150, mrp: 110.00, selling_price: 95.00, batch_number: 'ELC-99', expiry_date: '2028-09-30' },
      { store_id: 2, quantity: 120, mrp: 110.00, selling_price: 95.00, batch_number: 'ELC-99', expiry_date: '2028-09-30' },
      { store_id: 3, quantity: 95, mrp: 110.00, selling_price: 95.00, batch_number: 'ELC-99', expiry_date: '2028-09-30' },
      { store_id: 4, quantity: 140, mrp: 110.00, selling_price: 95.00, batch_number: 'ELC-99', expiry_date: '2028-09-30' },
      { store_id: 5, quantity: 80, mrp: 110.00, selling_price: 95.00, batch_number: 'ELC-99', expiry_date: '2028-09-30' }
    ]
  },
  {
    id: 16,
    name: 'Volini Pain Relief Gel (75g Tube)',
    generic_name: 'Diclofenac Diethylamine + Linseed Oil + Methyl Salicylate + Menthol',
    brand: 'Volini',
    category_id: 3,
    category_name: 'Pain Relief & Fever',
    pack_size: '75g Lami Tube',
    description: 'Quick-absorb nanogel formula for targeted relief from lower back pain, knee joint pain, neck sprains, sports injuries, and muscular stiffness.',
    usage_instructions: 'Apply gently to affected area 3 to 4 times daily. Do not rub vigorously or apply on open wounds.',
    side_effects: 'Mild temporary cooling/warming sensation at application site.',
    prescription_required: false,
    schedule_type: 'OTC',
    manufacturer: 'Sun Pharmaceutical Industries Ltd',
    mrp: 245.00,
    selling_price: 205.00,
    image_url: createMedSvg('Volini Gel 75g', 'Diclofenac Quick-Absorb Gel', 'OTC • PAIN RELIEF', '#D97706', '#FEF3C7', 'tablet'),
    alternatives: [
      { name: 'Omnigel Pain Relief 75g', manufacturer: 'Cipla Health', selling_price: 165.00, savings_pct: 20 },
      { name: 'Moov Fast Pain Relief 80g', manufacturer: 'Reckitt Benckiser', selling_price: 192.00, savings_pct: 6 }
    ],
    inventory: [
      { store_id: 1, quantity: 75, mrp: 245.00, selling_price: 205.00, batch_number: 'VLN-75G', expiry_date: '2028-05-31' },
      { store_id: 2, quantity: 60, mrp: 245.00, selling_price: 205.00, batch_number: 'VLN-75G', expiry_date: '2028-05-31' },
      { store_id: 3, quantity: 48, mrp: 245.00, selling_price: 205.00, batch_number: 'VLN-75G', expiry_date: '2028-05-31' },
      { store_id: 4, quantity: 65, mrp: 245.00, selling_price: 205.00, batch_number: 'VLN-75G', expiry_date: '2028-05-31' },
      { store_id: 5, quantity: 35, mrp: 245.00, selling_price: 205.00, batch_number: 'VLN-75G', expiry_date: '2028-05-31' }
    ]
  }
];

// Create a crisp SVG sample prescription image
export const createPrescriptionSvg = (doctorName, patientName, medsText, dateStr) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 520" width="420" height="520">
    <rect width="420" height="520" rx="12" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="3"/>
    <rect x="0" y="0" width="420" height="82" rx="12" fill="#1E40AF"/>
    <text x="24" y="36" font-family="sans-serif" font-size="18" font-weight="bold" fill="#FFFFFF">${doctorName}</text>
    <text x="24" y="58" font-family="sans-serif" font-size="12" fill="#BFDBFE">MD (Internal Medicine &amp; Diabetology) • Reg #KMC-55291</text>
    <line x1="24" y1="125" x2="396" y2="125" stroke="#E2E8F0" stroke-width="2"/>
    <text x="24" y="110" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1F2937">Patient: ${patientName}</text>
    <text x="396" y="110" font-family="sans-serif" font-size="12" fill="#4B5563" text-anchor="end">Date: ${dateStr}</text>
    <text x="28" y="175" font-family="serif" font-size="36" font-weight="bold" fill="#2563EB">Rx</text>
    <text x="32" y="220" font-family="monospace" font-size="14" font-weight="bold" fill="#1F2937">1. ${medsText[0] || 'Tab. Glycomet-500 SR (Metformin)'}</text>
    <text x="48" y="242" font-family="sans-serif" font-size="12" fill="#4B5563">Sig: 1-0-1 after meals x 30 days</text>
    <text x="32" y="285" font-family="monospace" font-size="14" font-weight="bold" fill="#1F2937">2. ${medsText[1] || 'Tab. Telma 40 (Telmisartan 40mg)'}</text>
    <text x="48" y="307" font-family="sans-serif" font-size="12" fill="#4B5563">Sig: 1-0-0 morning x 30 days</text>
    <rect x="240" y="395" width="150" height="58" rx="8" fill="#F0FDF4" stroke="#10B981" stroke-width="2" stroke-dasharray="4 2"/>
    <text x="315" y="420" font-family="sans-serif" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">DIGITALLY SIGNED</text>
    <text x="315" y="438" font-family="sans-serif" font-size="10" fill="#065F46" text-anchor="middle">${doctorName}</text>
    <text x="24" y="490" font-family="sans-serif" font-size="10" fill="#64748B">Valid for 6 months from issue date as per Drugs &amp; Cosmetics Rules</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const INITIAL_USER = {
  id: 1,
  whatsapp_number: '9876543210',
  name: 'Jyotiraditya Bose',
  dob: '1996-08-14',
  gender: 'Male',
  last_login: '2026-10-03T06:30:00Z',
  marketing_opt_in: true,
  refill_reminders: true
};

export const INITIAL_ADDRESSES = [
  {
    id: 1,
    user_id: 1,
    label: 'Home',
    address_line1: 'Flat 402, Emerald Palms Apartments, 12th Main',
    address_line2: 'HAL 2nd Stage, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    phone: '9876543210',
    is_default: true
  },
  {
    id: 2,
    user_id: 1,
    label: 'Parents Home',
    address_line1: 'House #28, 5th Cross, 4th Block',
    address_line2: 'Near Cool Joint, Jayanagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560011',
    phone: '9876543210',
    is_default: false
  }
];

export const INITIAL_FAMILY_MEMBERS = [
  {
    id: 1,
    user_id: 1,
    name: 'Subir Bose',
    relation: 'Father',
    age: 64,
    blood_group: 'B+',
    chronic_conditions: 'Type 2 Diabetes, Hypertension',
    regular_medicines: 'Glycomet-500 SR, Telma 40'
  },
  {
    id: 2,
    user_id: 1,
    name: 'Nandita Bose',
    relation: 'Mother',
    age: 59,
    blood_group: 'O+',
    chronic_conditions: 'Osteopenia, Vitamin D Deficiency',
    regular_medicines: 'Shelcal 500, Uprise-D3 60K'
  }
];

export const INITIAL_PRESCRIPTIONS = [
  {
    id: 101,
    user_id: 1,
    order_id: 'MS12345',
    patient_name: 'Subir Bose (Father)',
    doctor_name: 'Dr. Rajeshwari Menon',
    hospital_name: 'Manipal Hospital, Indiranagar',
    image_url: createPrescriptionSvg(
      'Dr. Rajeshwari Menon',
      'Subir Bose (64Y/M)',
      ['Tab. Glycomet-500 SR (Metformin 500mg)', 'Tab. Telma 40 (Telmisartan 40mg)'],
      '01 Oct 2026'
    ),
    uploaded_at: '2026-10-01T10:15:00Z',
    verification_status: 'Approved',
    verified_by: 'Dr. Ananya Rao (Reg #KA-44821)',
    pharmacist_notes: 'Valid Schedule H prescription verified. Approved for 3 monthly refills.',
    expiry_date: '2027-04-01',
    upload_source: 'Website'
  },
  {
    id: 102,
    user_id: 1,
    order_id: 'MS12348',
    patient_name: 'Jyotiraditya Bose (Self)',
    doctor_name: 'Dr. Vikramaditya Sen',
    hospital_name: 'Apollo Clinic, Koramangala',
    image_url: createPrescriptionSvg(
      'Dr. Vikramaditya Sen',
      'Jyotiraditya Bose (30Y/M)',
      ['Tab. Augmentin 625 Duo (10 Tabs)', 'Tab. Pan-40 (15 Tabs)'],
      '03 Oct 2026'
    ),
    uploaded_at: '2026-10-03T05:50:00Z',
    verification_status: 'Pending',
    verified_by: null,
    pharmacist_notes: 'In pharmacist verification queue (est. < 15 mins).',
    expiry_date: '2027-01-03',
    upload_source: 'WhatsApp'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 1,
    order_number: 'MS12345',
    user_id: 1,
    customer_name: 'Jyotiraditya Bose',
    whatsapp_number: '9876543210',
    order_type: 'delivery', // 'delivery' | 'pickup'
    store_id: 1,
    store_name: 'MediShop Hybrid Flagship - Indiranagar',
    store_address: '100 Feet Road, Near Sony World Signal, Indiranagar, Bengaluru 560038',
    delivery_address: 'Flat 402, Emerald Palms Apartments, 12th Main, Indiranagar, Bengaluru - 560038',
    delivery_slot: 'Same-Day Express (By 6:00 PM Today)',
    delivery_partner: {
      name: 'Ramesh Kumar',
      phone: '+91 98450 77812',
      vehicle: 'KA-03-JM-4421 (EV Scooter)'
    },
    subtotal: 416.00,
    delivery_fee: 34.00,
    total_amount: 450.00,
    payment_status: 'Paid',
    payment_method: 'UPI (PhonePe / Razorpay)',
    order_status: 'Out for Delivery',
    prescription_required: true,
    prescription_verified: true,
    prescription_id: 101,
    created_at: '2026-10-03T04:15:00Z',
    expected_by: 'Today, 6:00 PM',
    items: [
      { product_id: 1, name: 'Glycomet-500 SR Tablet', quantity: 2, unit_price: 56.00, total_price: 112.00, prescription_required: true },
      { product_id: 4, name: 'Telma 40 Tablet', quantity: 1, unit_price: 204.00, total_price: 204.00, prescription_required: true },
      { product_id: 3, name: 'Dolo 650 Tablet', quantity: 2, unit_price: 30.00, total_price: 60.00, prescription_required: false },
      { product_id: 2, name: 'Limcee Plus Vitamin C 500mg + Zinc', quantity: 1, unit_price: 38.00, total_price: 38.00, prescription_required: false }
    ],
    timeline: [
      { status: 'Order Placed', time: '09:45 AM', completed: true, note: 'Order #MS12345 received via MediShop Hybrid' },
      { status: 'Prescription Verified', time: '10:02 AM', completed: true, note: 'Approved by Dr. Ananya Rao (Reg #KA-44821)' },
      { status: 'Packed at Store', time: '10:15 AM', completed: true, note: 'Batch & expiry verified at Indiranagar Flagship' },
      { status: 'Out for Delivery', time: '10:40 AM', completed: true, note: 'Assigned to Ramesh Kumar (+91 98450 77812)' },
      { status: 'Delivered', time: 'Expected by 6:00 PM', completed: false, note: 'OTP verification on doorstep' }
    ]
  },
  {
    id: 2,
    order_number: 'MS12346',
    user_id: 1,
    customer_name: 'Jyotiraditya Bose',
    whatsapp_number: '9876543210',
    order_type: 'pickup',
    store_id: 2,
    store_name: 'MediShop Hybrid - Koramangala 4th Block',
    store_address: '80 Feet Road, 4th Block, Near Maharaja Signal, Koramangala, Bengaluru 560034',
    pickup_slot: 'Ready in 25 Minutes (Express Counter #2)',
    pickup_token: 'PK-884',
    subtotal: 273.00,
    delivery_fee: 0.00,
    total_amount: 273.00,
    payment_status: 'Paid',
    payment_method: 'Online UPI (Razorpay)',
    order_status: 'Ready for Pickup',
    prescription_required: false,
    prescription_verified: true,
    prescription_id: null,
    created_at: '2026-10-02T14:20:00Z',
    expected_by: 'Ready Now at Counter #2',
    items: [
      { product_id: 2, name: 'Limcee Plus Vitamin C 500mg + Zinc', quantity: 1, unit_price: 38.00, total_price: 38.00, prescription_required: false },
      { product_id: 10, name: 'Uprise-D3 60K Softgel Capsule', quantity: 1, unit_price: 235.00, total_price: 235.00, prescription_required: false }
    ],
    timeline: [
      { status: 'Order Placed', time: '02:20 PM', completed: true, note: 'Store Pickup selected at Koramangala 4th Block' },
      { status: 'Packed at Store', time: '02:32 PM', completed: true, note: 'Pharmacist Mr. Karthik Nair verified batch & expiry' },
      { status: 'Ready for Pickup', time: '02:44 PM', completed: true, note: 'Ready at Express Pickup Counter #2 (Token: PK-884)' },
      { status: 'Picked Up', time: 'Show #MS12346 at store', completed: false, note: 'Zero waiting queue at store counter' }
    ]
  }
];

export const INITIAL_WHATSAPP_MESSAGES = [
  {
    id: 1,
    user_id: 1,
    whatsapp_number: '+91 98765 43210',
    message_type: 'OTP',
    title: 'WhatsApp Login OTP',
    message_content: `Your Medical Shop OTP is: 482910\n\nValid for 10 minutes.\n\nDo not share with anyone.`,
    sent_at: '2026-10-03T04:10:00Z',
    delivery_status: 'Delivered ✓✓'
  },
  {
    id: 2,
    user_id: 1,
    whatsapp_number: '+91 98765 43210',
    message_type: 'ORDER_CONFIRMATION',
    title: 'Order Confirmation',
    message_content: `✅ Order Confirmed!\n\nOrder #MS12345\nAmount: ₹450\n\nDelivery to: Flat 402, Emerald Palms, Indiranagar\nExpected by: Today, 6 PM\n\nTrack: /orders/MS12345`,
    sent_at: '2026-10-03T04:15:10Z',
    delivery_status: 'Read ✓✓'
  },
  {
    id: 3,
    user_id: 1,
    whatsapp_number: '+91 98765 43210',
    message_type: 'PRESCRIPTION_VERIFIED',
    title: 'Prescription Verification',
    message_content: `📋 Prescription Verified\n\nOrder #MS12345\nYour prescription has been approved by Dr. Ananya Rao.\n\nYour order is now being prepared.\n\nTrack: /orders/MS12345`,
    sent_at: '2026-10-03T04:32:00Z',
    delivery_status: 'Read ✓✓'
  },
  {
    id: 4,
    user_id: 1,
    whatsapp_number: '+91 98765 43210',
    message_type: 'OUT_FOR_DELIVERY',
    title: 'Delivery Update',
    message_content: `🚚 Out for Delivery\n\nOrder #MS12345\nYour order is on the way!\n\nArriving in 30 minutes\nDelivery person: Ramesh Kumar (+91 98450 77812)\n\nTrack: /orders/MS12345`,
    sent_at: '2026-10-03T05:10:00Z',
    delivery_status: 'Read ✓✓'
  },
  {
    id: 5,
    user_id: 1,
    whatsapp_number: '+91 98765 43210',
    message_type: 'READY_FOR_PICKUP',
    title: 'Ready for Pickup',
    message_content: `🎉 Order Ready!\n\nOrder #MS12346\nReady for pickup at:\nMediShop Hybrid - Koramangala 4th Block\n80 Feet Road, Bengaluru 560034\n\nShow this message at counter.`,
    sent_at: '2026-10-02T14:44:00Z',
    delivery_status: 'Read ✓✓'
  }
];
