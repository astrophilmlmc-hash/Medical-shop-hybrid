import db from '../config/database.js';

export const OrderModel = {
  findAll() {
    return db.orders;
  },
  findByOrderNumber(orderNumber) {
    return (
      db.orders.find(
        o =>
          String(o.order_number).toUpperCase() === String(orderNumber).toUpperCase() ||
          String(o.id) === String(orderNumber)
      ) || null
    );
  }
};

export default OrderModel;
