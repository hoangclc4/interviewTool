const Sequelize = require("sequelize");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const QuestionChoices = require("../models/QuestionChoices");
const QuestionTable = require("../models/QuestionTable");
const Subject = require("../models/Subject");
const MultiChoices = require("../models/MultiChoices");
const MultiChoices_Choices = require("../models/MultiChoices_Choices");

const Question = require("../models/Question");
const AnswerRecord = require("../models/AnswerRecord");
const jwt = require("jsonwebtoken");
// find all the number of attempt that user do quiz in page PreGame
router.post("/api/quiz_attempt", verifyToken, (req, res) => {
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    AnswerRecord.max("id", {
      where: {
        user_id: authData.user_id.id,
        question_table_id: req.body.question_table_id
      }
    })
      .then(async length => {
        let attemptArr = async i => {
          let attempt = await AnswerRecord.findAll({
            where: {
              id: i,
              user_id: authData.user_id.id,
              question_table_id: req.body.question_table_id
            },
            include: [
              {
                model: Question,
                include: QuestionChoices
              },
              QuestionChoices,
              {
                model: MultiChoices,
                include: QuestionChoices
              }
            ]
          });
          return attempt;
        };
        let getArr = async () => {
          let dataArr = [];
          for (let i = 1; i <= length; i++) {
            await attemptArr(i).then(attempt => {
              dataArr.push(attempt);
            });
          }
          return dataArr;
        };
        getArr().then(data => res.send(data));
      })
      .catch(err => console.log(err));
  });
});
//login check email password
router.post("/api/get_user", (req, res) =>
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    },
    attributes: ["id"]
  }).then(user_id => {
    if (user_id === null) res.sendStatus(403);
    else {
      jwt.sign({ user_id }, "hoangtri", function(err, token) {
        if (err) res.sendStatus(403);
        res.send({ token: token });
      });
    }
  })
);
// record all answer that user do quiz, and then send the correct answer to client(DoQuiz page)
router.post("/api/user_answer", verifyToken, (req, res) => {
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      AnswerRecord.max("id", {
        where: {
          user_id: authData.user_id.id,
          question_table_id: req.body[0].question_table_id
        }
      })
        .then(async id => {
          let recordAnswer = async () => {
            for (let i = 0; i < req.body.length; i++) {
              req.body[i].user_id = authData.user_id.id;
              req.body[i].id = id + 1;
              let { question_choices } = req.body[i].multi_choice;
              if (req.body[i].type !== 2)
                await AnswerRecord.create(req.body[i]);
              else {
                //unattempt Multi
                if (!question_choices.length) {
                  await AnswerRecord.create(req.body[i]);
                } else
                  await MultiChoices.create(req.body[i].multi_choice).then(
                    multiData => {
                      req.body[i].multi_choice_id = multiData.id;
                      let data = [];
                      let { question_choices } = req.body[i].multi_choice;
                      for (let j = 0; j < question_choices.length; j++)
                        data.push({
                          multi_choice_id: multiData.id,
                          choice_id: question_choices[j].id
                        });
                      MultiChoices_Choices.bulkCreate(data).then(() =>
                        AnswerRecord.create(req.body[i])
                      );
                    }
                  );
              }
            }
          };
          await recordAnswer().then(() => {
            res.send({
              id: id + 1,
              question_table_id: req.body[0].question_table_id
            });
          });
        })

        .catch(err => console.log(err));
    }
  });
});
//get
router.post("/api/attempt_record", verifyToken, (req, res) => {
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      AnswerRecord.findAll({
        include: [
          {
            model: QuestionChoices,
            attributes: ["is_right", "id"]
          },
          {
            model: Question,
            include: [QuestionChoices]
          },
          {
            model: MultiChoices,
            include: QuestionChoices
          }
        ],
        where: {
          id: req.body.attempt_id,
          user_id: authData.user_id.id,
          question_table_id: req.body.question_table_id
        }
      })
        .then(data => res.send(data))

        .catch(err => console.log(err));
    }
  });
});
//check if user do the table before
router.post("/api/is_user_did_table", verifyToken, (req, res) =>
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      AnswerRecord.findOne({
        where: {
          user_id: authData.user_id.id,
          question_table_id: req.body.question_table_id
        }
      })
        .then(data => {
          if (data === null) res.send(false);
          else res.send(true);
        })
        .catch(err => console.log(err));
    }
  })
);
//get quizz that user do before
router.post("/api/get_completed_table", verifyToken, async (req, res) =>
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      AnswerRecord.findAll({
        where: {
          user_id: authData.user_id.id
        },
        attributes: [
          Sequelize.fn("DISTINCT", Sequelize.col("question_table_id")),
          "question_table_id"
        ]
      })
        .then(idTableArr => {
          let data = [];
          if (idTableArr.length === 0) res.send(data);
          else {
            let getData = async idTableArr => {
              let data = await QuestionTable.findOne({
                where: { id: idTableArr.question_table_id },
                include: [
                  {
                    model: Question,
                    attributes: ["id"]
                  },
                  {
                    model: AnswerRecord,
                    include: [
                      {
                        model: QuestionChoices,
                        attributes: ["is_right", "id"]
                      },
                      {
                        model: Question,
                        include: [QuestionChoices]
                      },
                      {
                        model: MultiChoices,
                        include: QuestionChoices
                      }
                    ],
                    where: {
                      user_id: authData.user_id.id
                    }
                  },
                  {
                    model: User,

                    attributes: ["first_name", "last_name"]
                  }
                ],
                attributes: ["id", "title", "image", "played", "admin"]
              });
              return data;
            };
            let getDataArr = async () => {
              let dataArr = [];
              for (let i = 0; i < idTableArr.length; i++) {
                await getData(idTableArr[i]).then(dataTable => {
                  dataArr.push(dataTable);
                  //if (i === idTableArr.length - 1) res.send(data);
                });
              }
              return dataArr;
            };
            getDataArr().then(data => res.send(data));
          }
        })
        .catch(err => console.log(err));
    }
  })
);
//show question table created by user
router.post("/api/get_user_question_table", verifyToken, (req, res) =>
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      User.findAll({
        where: {
          id: authData.user_id.id
        },
        include: [
          {
            model: QuestionTable,
            include: [
              {
                model: Question,
                include: QuestionChoices
              },
              Subject
            ]
          }
        ]
      })
        .then(data => res.send(data))
        .catch(err => console.log(err));
    }
  })
);

router.post("/api/user", (req, res) => {
  User.create(req.body)
    .then(data => {
      res.send({
        mess: "Create User Successfully",
        data
      });
    })
    .catch(err => console.log(err));
});
router.post("/api/getuser", verifyToken, (req, res) => {
  //console.log(req.headers["user-token"]);
  jwt.verify(req.token, "hoangtri", (err, data) => {
    if (err) res.sendStatus(403);
    else {
      res.send(data);
    }
  });
});
router.put("/api/update_user", (req, res) =>
  User.update(req.body, {
    where: {
      id: req.body.id
    }
  })
    .then(data => res.send(req.body))
    .catch(err => sendStatus(404))
);
function verifyToken(req, res, next) {
  const header = req.headers["user-token"];
  if (typeof header !== "undefined") {
    req.token = header;
    next();
  } else {
    res.sendStatus(403);
  }
}

router.delete("/api/user/:id", (req, res) => {});

module.exports = router;
