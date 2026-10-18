import db from '../config/database.js';

export const UserModel = {
  findByWhatsApp(whatsapp_number) {
    const clean = String(whatsapp_number).replace(/\D/g, '').slice(-10);
    return db.users.find(u => u.whatsapp_number === clean) || null;
  },
  findOrCreateByWhatsApp(whatsapp_number, name = '') {
    const clean = String(whatsapp_number).replace(/\D/g, '').slice(-10);
    let user = db.users.find(u => u.whatsapp_number === clean);
    if (!user) {
      user = {
        id: db.users.length + 1,
        whatsapp_number: clean,
        name: name || `Customer (${clean.slice(-4)})`,
        dob: '',
        gender: '',
        last_login: new Date().toISOString(),
        marketing_opt_in: true,
        refill_reminders: true
      };
      db.users.push(user);
    } else {
      user.last_login = new Date().toISOString();
    }
    return user;
  }
};

export default UserModel;
