const Sequelize = require("sequelize");
const db = require("../database");

const User = db.define("user", {
  id: {
    type: "INT(11)",
    allowNull: false,
    defaultValue: null,
    autoIncrement: true,
    primaryKey: true,
    foreignKey: [Object]
  },
  first_name: {
    type: "VARCHAR(50)",
    allowNull: false,
    primaryKey: false
  },
  last_name: {
    type: "VARCHAR(50)",
    allowNull: false,
    primaryKey: false
  },
  grades: {
    type: "CHAR(10)",
    allowNull: true,
    primaryKey: false
  },
  birth: {
    type: "DATE",
    allowNull: true,
    primaryKey: false
  },
  subject_id: {
    type: "INT(11)",
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    foreignKey: [Object]
  },
  email: {
    type: "VARCHAR(50)",
    allowNull: true,
    primaryKey: false
  },
  password: {
    type: "VARCHAR(50)",
    allowNull: true,
    primaryKey: false
  },
  avatar: {
    type: "LONGTEXT",
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  role_id: {
    type: "int(11)",
    allowNull: true,
    defaultValue: 1,
    primaryKey: false
  }
});
module.exports = User;
