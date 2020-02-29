const db = require("../database");

const UserRole = db.define("user_role", {
  id: {
    type: "INT(11)",
    allowNull: false,
    defaultValue: null,
    autoIncrement: true,
    primaryKey: true
  },
  role: {
    type: "VARCHAR(50)",
    allowNull: false,
    primaryKey: false
  }
});
module.exports = UserRole;
