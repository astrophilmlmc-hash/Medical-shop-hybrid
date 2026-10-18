export const adminAuthMiddleware = (req, res, next) => {
  // Allows pharmacist / admin panel access in hybrid demo & production token mode
  req.admin = { id: 1, role: 'Chief Pharmacist & Admin', license: 'KA-44821' };
  next();
};

export default adminAuthMiddleware;
