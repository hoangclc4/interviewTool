const express = require("express");
const router = express.Router();
const QuestionTable = require("../models/QuestionTable");
const Question = require("../models/Question");
const QuestionTable_Question = require("../models/QuestionTable_Question");
const QuestionChoices = require("../models/QuestionChoices");
const Subject = require("../models/Subject");
const User = require("../models/User");
const AnswerRecord = require("../models/AnswerRecord");
const UserRole = require("../models/UserRole");
const MultiChoices = require("../models/MultiChoices");
const MultiChoices_Choices = require("../models/MultiChoices_Choices");

//////////////
UserRole.hasMany(User, { foreignKey: "role_id" });
//////////////
Subject.hasMany(QuestionTable, { foreignKey: "subject_id" });
Subject.hasMany(User, { foreignKey: "subject_id" });
//////////////////////////////////////////
User.hasMany(QuestionTable, { foreignKey: "admin" });
User.belongsTo(Subject, {
  foreignKey: "subject_id"
});
User.belongsTo(UserRole, {
  foreignKey: "role_id"
});
User.hasMany(AnswerRecord, { foreignKey: "user_id" });
//////////////////////////////////////////////
AnswerRecord.belongsTo(User, { foreignKey: "user_id" });
AnswerRecord.belongsTo(QuestionTable, { foreignKey: "question_table_id" });
AnswerRecord.belongsTo(Question, { foreignKey: "question_id" });
AnswerRecord.belongsTo(QuestionChoices, { foreignKey: "choice_id" });
//
AnswerRecord.belongsTo(MultiChoices, { foreignKey: "multi_choice_id" });

/////////////////////////////////////////////
QuestionTable.belongsTo(Subject, {
  foreignKey: "subject_id"
});
QuestionTable.belongsTo(User, {
  foreignKey: "admin"
});
QuestionTable.belongsToMany(Question, {
  through: QuestionTable_Question,
  foreignKey: "question_table_id"
});
QuestionTable.hasMany(AnswerRecord, {
  foreignKey: "question_table_id"
});
/////////////////////////////////////////////////
Question.belongsToMany(QuestionTable, {
  through: QuestionTable_Question,
  foreignKey: "question_id"
});
Question.hasMany(QuestionChoices, {
  foreignKey: "question_id"
});
Question.hasMany(AnswerRecord, {
  foreignKey: "question_id"
});
////////////////////////////////////////////////////
QuestionChoices.belongsTo(Question, {
  foreignKey: "question_id"
});
QuestionChoices.hasMany(AnswerRecord, {
  foreignKey: "choice_id"
});
//
QuestionChoices.belongsToMany(MultiChoices, {
  through: MultiChoices_Choices,
  foreignKey: "choice_id"
});
////////////////////////////////////////////////
MultiChoices.belongsToMany(QuestionChoices, {
  through: MultiChoices_Choices,
  foreignKey: "multi_choice_id"
});
////////////////////////////////////////////////////
MultiChoices_Choices.belongsTo(MultiChoices, {
  foreignKey: "multi_choice_id"
});
MultiChoices_Choices.belongsTo(QuestionChoices, {
  foreignKey: "choice_id"
});
//////////////////////////////////////////////////
QuestionTable_Question.belongsTo(QuestionTable, {
  foreignKey: "question_table_id"
});
QuestionTable_Question.belongsTo(Question, { foreignKey: "question_id" });

module.exports = router;
