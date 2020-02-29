const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const QuestionChoices = require("../models/QuestionChoices");
const QuestionTable_Question = require("../models/QuestionTable_Question");
("use strict");
//get Question list
router.get("/api/question", (req, res) =>
  Question.findAll({
    include: QuestionChoices
  })
    .then(data => res.send(data))
    .catch(err => console.log(err))
);

router.post("/api/question_answer_update", (req, res) => {
  Question.upsert(req.body)
    .then(() => {
      QuestionChoices.destroy({
        where: {
          question_id: req.body.id
        }
      });
      for (let i = 0; i < req.body.question_choices.length; i++)
        req.body.question_choices[i].question_id = req.body.id;
      QuestionChoices.bulkCreate(req.body.question_choices).then(data =>
        res.send(data)
      );
    })

    .catch(err => console.log(err));
});
router.post("/api/question_update", (req, res) => {
  Question.upsert(req.body)
    .then(res.sendStatus(200))

    .catch(err => console.log(err));
});
router.get("/api/question/:id", (req, res) =>
  Question.findAll({
    where: {
      id: req.params.id
    }
  })
    .then(data => res.send(data))
    .catch(err => console.log(err))
);
router.post("/api/question", (req, res) => {
  Question.create(req.body, {
    include: [
      {
        model: QuestionChoices
      }
    ]
  })
    .then(data => {
      res.send(data);
      QuestionTable_Question.create({
        question_id: data.id,
        question_table_id: req.body.question_table_id
      });
    })

    .catch(err => console.log(err));
});
router.put("/api/question", (req, res) =>
  Question.update(req.body, {
    where: {
      id: req.body.id
    }
  })
    .then(res.send("success " + JSON.stringify(req.body)))
    .catch(err => console.log(err))
);
router.delete("/api/question/:id", (req, res) =>
  QuestionChoices.destroy({
    where: {
      question_id: req.params.id
    }
  })
    .then(() =>
      QuestionTable_Question.destroy({
        where: {
          question_id: req.params.id
        }
      })
    )
    .then(() =>
      Question.destroy({
        where: {
          id: req.params.id
        }
      })
    )
    .then(() => res.send("Delete Successfull"))
    .catch(err => console.log(err))
);
module.exports = router;
