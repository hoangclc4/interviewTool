const Sequelize = require("sequelize");
const db = require("../database");

const AnswerRecord = db.define("answer_record", {
  id: {
    type: "INT(11)",
    allowNull: false,
    defaultValue: null,
    primaryKey: true
  },
  user_id: {
    type: "INT(11)",
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
    foreignKey: [Object]
  },
  question_table_id: {
    type: "INT(11)",
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
    foreignKey: [Object]
  },
  question_id: {
    type: "INT(11)",
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
    foreignKey: [Object]
  },
  choice_id: {
    type: "INT(11)",
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    foreignKey: [Object]
  },
  multi_choice_id: {
    type: "INT(11)",
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    foreignKey: [Object]
  },
  answer_text: {
    type: "VARCHAR(200)",
    defaultValue: null,
    primaryKey: false
  }
});
module.exports = AnswerRecord;
