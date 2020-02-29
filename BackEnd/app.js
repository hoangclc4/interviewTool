const express = require("express");
// const exphbs = require('express-handlebars');
const bodyparser = require("body-parser");
const path = require("path");
const app = express();
//import routers
const association = require("./routers/association");
const routersQuestionTable = require("./routers/routersQuestionTable");
const routersQuestion = require("./routers/routersQuestion");
const routersQuestionChoices = require("./routers/routersQuestionChoices");
const routersUser = require("./routers/routersUser");
const db = require("./database");

app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));

//test DB
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("Error: " + err));
//routers
app.use(association);
app.use(routersQuestionTable);
app.use(routersQuestion);
app.use(routersQuestionChoices);
app.use(routersUser);

const PORT = process.env.PORT || 3005;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
