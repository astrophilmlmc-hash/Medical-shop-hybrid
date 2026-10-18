import db from '../config/database.js';

export const ProductModel = {
  findAll({ search, category, prescription_required, store_id } = {}) {
    let list = [...db.products];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.generic_name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category_name.toLowerCase().includes(q)
      );
    }
    if (category && category !== 'all') {
      list = list.filter(
        p =>
          String(p.category_id) === String(category) ||
          p.category_name.toLowerCase() === String(category).toLowerCase()
      );
    }
    if (prescription_required !== undefined && prescription_required !== 'all') {
      const reqBool = prescription_required === 'true' || prescription_required === true;
      list = list.filter(p => p.prescription_required === reqBool);
    }
    if (store_id) {
      list = list.filter(p =>
        p.inventory.some(inv => Number(inv.store_id) === Number(store_id) && inv.quantity > 0)
      );
    }
    return list;
  },
  findById(id) {
    return db.products.find(p => Number(p.id) === Number(id)) || null;
  }
};

export default ProductModel;
