const Sequelize = require("sequelize");
const db = require("../database");
const QuestionTable_Question = require("./QuestionTable_Question");
const Question = require("./Question");

const QuestionTable = db.define("question_table", {
  id: {
    type: "INT(11)",
    allowNull: false,
    defaultValue: null,
    autoIncrement: true,
    primaryKey: true,
    foreignKey: [Object]
  },
  code: {
    type: "VARCHAR(6)",
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  title: {
    type: "VARCHAR(50)",
    allowNull: false,
    defaultValue: null,
    primaryKey: false
  },
  grade_begin: {
    type: "INT(11)",
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  grade_end: {
    type: "INT(11)",
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  level: {
    type: "INT(11)",
    allowNull: true,
    defaultValue: 1,
    primaryKey: false
  },
  played: {
    type: "INT(11)",
    allowNull: true,
    defaultValue: 0,
    primaryKey: false
  },
  subject_id: {
    type: "INT(11)",
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    foreignKey: [Object]
  },
  image: {
    type: "longtext",
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  is_public: {
    type: "TINYINT(1)",
    allowNull: true,
    defaultValue: 1,
    primaryKey: false
  },
  admin: {
    type: "INT(11)",
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    foreignKey: [Object]
  },
  is_finish: {
    type: "TINYINT(1)",
    allowNull: false,
    defaultValue: 0
  }
});
// QuestionTable.associate = () => {
//   QuestionTable.belongsToMany(Question, {
//     through: QuestionTable_Question,
//     foreignKey: "question_table",
//     as: "question_table"
//   });
// };

module.exports = QuestionTable;
