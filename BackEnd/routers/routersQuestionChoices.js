const express = require("express");
const router = express.Router();
const QuestionChoices = require("../models/QuestionChoices");

const Sequelize = require("sequelize");
//get QuestionChoices list
router.get("/api/questionchoices", (req, res) =>
  QuestionChoices.findAll()
    .then(data => res.send(data))
    .catch(err => console.log(err))
);
router.get("/api/questionchoices/:id", (req, res) =>
  QuestionChoices.findAll({
    where: {
      id: req.params.id
    }
  })
    .then(data => res.send(data))
    .catch(err => console.log(err))
);
router.post("/api/questionchoices", (req, res) => {
  //console.log(req.body.data);
  QuestionChoices.bulkCreate(req.body.data)
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

router.put("/api/questionchoices", (req, res) =>
  QuestionChoices.update(req.body, {
    where: {
      id: req.body.id
    }
  })
    .then(res.send("success " + JSON.stringify(req.body)))
    .catch(err => console.log(err))
);
router.delete("/api/questionchoices/:id", (req, res) =>
  QuestionChoices.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(res.send("success"))
    .catch(err => console.log(err))
);
module.exports = router;
