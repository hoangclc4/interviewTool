const Sequelize = require("sequelize");
const db = require("../database");
const QuestionTable = require("./QuestionTable");
const QuestionTable_Question = require("./QuestionTable_Question");
const QuestionChoices = require("./QuestionChoices");

const Question = db.define(
  "question",
  {
    id: {
      type: "INT(11)",
      allowNull: false,
      autoIncrement: true,
      defaultValue: null,
      primaryKey: true,
      foreignKey: [Object]
    },
    question: {
      type: "VARCHAR(100)",
      allowNull: false,
      defaultValue: null,
      primaryKey: false
    },
    time: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: 30,
      primaryKey: false
    },
    is_one_right_ans: {
      type: "TINYINT(1)",
      allowNull: false,
      defaultValue: 1
    }
  },
  { underscored: true }
);
// Question.associate = () => {
//   Question.belongsToMany(QuestionTable, {
//     through: QuestionTable_Question,
//     foreignKey: "question_id",
//     as: "question_table"
//   });
// };
// Question.hasMany(QuestionTable, {
//   through: QuestionTable_Question,
//   foreignKey: "question_id"
// });

//Question.hasMany(QuestionChoices, { foreignKey: "question_id" });
module.exports = Question;
