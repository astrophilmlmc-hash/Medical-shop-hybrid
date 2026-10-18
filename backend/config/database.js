/**
 * Database Configuration & Schema Reference (PostgreSQL / Sequelize + Active In-Memory Store)
 * Implements all 12 Core Tables specified in the Medical Shop Hybrid Project Memory:
 * 1. users
 * 2. addresses
 * 3. stores
 * 4. products
 * 5. product_inventory
 * 6. categories
 * 7. orders
 * 8. order_items
 * 9. prescriptions
 * 10. delivery_addresses
 * 11. whatsapp_otps
 * 12. whatsapp_messages
 */

import {
  CATEGORIES,
  STORES,
  PRODUCTS,
  INITIAL_USER,
  INITIAL_ADDRESSES,
  INITIAL_FAMILY_MEMBERS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_ORDERS,
  INITIAL_WHATSAPP_MESSAGES
} from '../../src/data/seedData.js';

export const POSTGRES_DDL_SCHEMA = `
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  whatsapp_number VARCHAR(15) UNIQUE NOT NULL,
  name VARCHAR(120),
  dob DATE,
  gender VARCHAR(20),
  last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city VARCHAR(80) NOT NULL,
  state VARCHAR(80) NOT NULL,
  pincode VARCHAR(10) NOT NULL
);

CREATE TABLE stores (
  id SERIAL PRIMARY KEY,
  store_name VARCHAR(150) NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  phone VARCHAR(20),
  opening_time VARCHAR(30),
  closing_time VARCHAR(30)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  parent_id INTEGER REFERENCES categories(id),
  image_url TEXT
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  generic_name VARCHAR(250) NOT NULL,
  brand VARCHAR(120),
  category_id INTEGER REFERENCES categories(id),
  description TEXT,
  prescription_required BOOLEAN DEFAULT FALSE,
  schedule_type VARCHAR(30) DEFAULT 'OTC',
  manufacturer VARCHAR(150),
  image_url TEXT
);

CREATE TABLE product_inventory (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 0,
  mrp DECIMAL(10, 2) NOT NULL,
  selling_price DECIMAL(10, 2) NOT NULL,
  batch_number VARCHAR(60),
  expiry_date DATE
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(40) UNIQUE NOT NULL,
  user_id INTEGER REFERENCES users(id),
  order_type VARCHAR(20) CHECK (order_type IN ('delivery', 'pickup')),
  store_id INTEGER REFERENCES stores(id),
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(30) DEFAULT 'Pending',
  payment_method VARCHAR(50),
  order_status VARCHAR(40) DEFAULT 'Order Placed',
  prescription_required BOOLEAN DEFAULT FALSE,
  prescription_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE prescriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  order_id VARCHAR(40),
  image_url TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verification_status VARCHAR(30) DEFAULT 'Pending',
  verified_by VARCHAR(120),
  expiry_date DATE
);

CREATE TABLE delivery_addresses (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  full_address TEXT NOT NULL,
  city VARCHAR(80),
  pincode VARCHAR(10),
  phone VARCHAR(20)
);

CREATE TABLE whatsapp_otps (
  id SERIAL PRIMARY KEY,
  whatsapp_number VARCHAR(15) NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE whatsapp_messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  message_type VARCHAR(50) NOT NULL,
  message_content TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  delivery_status VARCHAR(30) DEFAULT 'Sent'
);
`;

// Active runtime database store seeded with realistic data
export const db = {
  users: [{ ...INITIAL_USER }],
  addresses: INITIAL_ADDRESSES.map(a => ({ ...a })),
  family_members: INITIAL_FAMILY_MEMBERS.map(f => ({ ...f })),
  stores: STORES.map(s => ({ ...s })),
  categories: CATEGORIES.map(c => ({ ...c })),
  products: PRODUCTS.map(p => ({ ...p, inventory: p.inventory.map(i => ({ ...i })) })),
  orders: INITIAL_ORDERS.map(o => ({ ...o, items: o.items.map(i => ({ ...i })), timeline: o.timeline.map(t => ({ ...t })) })),
  prescriptions: INITIAL_PRESCRIPTIONS.map(p => ({ ...p })),
  whatsapp_otps: [],
  whatsapp_messages: INITIAL_WHATSAPP_MESSAGES.map(m => ({ ...m }))
};

export default db;
