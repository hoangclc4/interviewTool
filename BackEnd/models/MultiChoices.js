const db = require("../database");
const MultiChoices = db.define(
  "multi_choices",
  {
    id: {
      type: "INT(11)",
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  },
  { underscored: true }
);

module.exports = MultiChoices;
