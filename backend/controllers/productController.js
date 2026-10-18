import db from '../config/database.js';
import ProductModel from '../models/Product.js';

export const getProducts = (req, res) => {
  const products = ProductModel.findAll(req.query);
  return res.json({ products, categories: db.categories, stores: db.stores });
};

export const getProductById = (req, res) => {
  const product = ProductModel.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Medicine not found' });
  }
  return res.json({ product, stores: db.stores });
};

export const getStores = (req, res) => {
  return res.json({ stores: db.stores });
};
