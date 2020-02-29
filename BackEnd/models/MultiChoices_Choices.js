const db = require("../database");
const MultiChoices_Choices = db.define(
  "multichoices_choices",
  {
    multi_choice_id: {
      type: "INT(11)",
      allowNull: false,
      defaultValue: null,
      primaryKey: true
    },
    choice_id: {
      type: "INT(11)",
      allowNull: false,
      defaultValue: null,
      primaryKey: true
    }
  },
  { underscored: true }
);

module.exports = MultiChoices_Choices;
