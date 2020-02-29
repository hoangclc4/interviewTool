const Sequelize = require("sequelize");
const db = require("../database");
const Question = require("./Question");
const QuestionTable = require("./QuestionTable");

const QuestionTable_Question = db.define(
  "questiontable_question",
  {
    question_table_id: {
      type: "INT(11)",
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      references: {
        model: "question_table",
        key: "id"
      }
    },
    question_id: {
      type: "INT(11)",
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      references: {
        model: "question",
        key: "id"
      }
    }
  },
  { underscored: true }
);

module.exports = QuestionTable_Question;
