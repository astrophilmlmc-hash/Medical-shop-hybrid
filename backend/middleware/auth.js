import db from '../config/database.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    const whatsapp = token.replace('medishop-jwt-', '');
    const user = db.users.find(u => u.whatsapp_number === whatsapp) || db.users[0];
    req.user = user;
  } else {
    req.user = db.users[0];
  }
  next();
};

export default authMiddleware;
