const express = require("express");
const router = express.Router();
const QuestionTable = require("../models/QuestionTable");
const Question = require("../models/Question");
const QuestionTable_Question = require("../models/QuestionTable_Question");
const User = require("../models/User");
const QuestionChoices = require("../models/QuestionChoices");
const Subject = require("../models/Subject");
const AnswerRecord = require("../models/AnswerRecord");

const jwt = require("jsonwebtoken");

const data = {
  question: "what is dota",
  time: 20,
  question_choices: {
    question_id: 1,
    answer: "aaa",
    is_right: 1
  },
  question_table_id: 1
};

//get QuestionTable list
router.get("/api/questiontable", (req, res) =>
  QuestionTable.findAll()
    .then(data => res.send(data))
    .catch(err => console.log(err))
);
router.get("/api/questiontable/:id", (req, res) => {
  QuestionTable.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Question,
        include: QuestionChoices
      },
      Subject
    ]
  }).then(data => {
    res.send(data);
  });
});
getRandomNumber = () => {
  let code = "";
  for (let i = 0; i < 6; i++) {
    var r = Math.floor(Math.random() * 10);
    code = `${code}${r}`;
  }
  return code;
};
router.post("/api/genarate_code", async (req, res) => {
  while (true) {
    let code = getRandomNumber();
    let count = async () => {
      let a = 0;
      await QuestionTable.count({ where: { code: code } })
        .then(count => {
          if (count === 0) {
            a = 1;
          }
        })
        .catch(err => console.log(err));
      return a;
    };
    let check = 0;
    await count().then(a => (check = a));
    if (check) {
      QuestionTable.update({ code: code }, { where: { id: req.body.id } })
        .then(() => {
          res.redirect(`/api/questiontable/${req.body.id}`);
        })
        .catch(err => console.log(err));
      break;
    }
  }
});
router.put("/api/table_update", (req, res) => {
  QuestionTable.update(req.body, { where: { id: req.body.id } })
    .then(data => res.send(data))
    .catch(err => console.log(err));
});
router.put("/api/table_update_played", (req, res) => {
  QuestionTable.findOne({
    where: {
      id: req.body.id
    },
    attributes: ["played"]
  }).then(table => {
    let newPlayed = table.played + 1;
    QuestionTable.update({ played: newPlayed }, { where: { id: req.body.id } })
      .then(data => res.send(data))
      .catch(err => console.log(err));
  });
});
router.post("/api/questiontable", verifyToken, (req, res) => {
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      req.body.admin = authData.user_id.id;
      QuestionTable.create(req.body)
        .then(data => res.send(data))
        .catch(err => console.log(err));
    }
  });
});
router.post("/api/get_question_table_by_subject", (req, res) => {
  Subject.findAll({
    include: [
      {
        model: QuestionTable,
        include: [
          Question,
          {
            model: User,
            attributes: ["first_name", "last_name"]
          }
        ],
        where: { is_public: 1 || true }
      }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => console.log(err));
});
router.post("/api/get_question_table_code", (req, res) => {
  QuestionTable.findOne({
    where: {
      code: req.body.code
    },
    include: [Question, User]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => console.log(err));
});
function verifyToken(req, res, next) {
  const header = req.headers["user-token"];
  if (typeof header !== "undefined") {
    req.token = header;
    next();
  } else {
    res.sendStatus(403);
  }
}
router.put("/api/questiontable", (req, res) =>
  QuestionTable.update(req.body, {
    where: {
      id: req.body.id
    }
  })
    .then(res.send("success " + JSON.stringify(req.body)))
    .catch(err => console.log(err))
);
router.delete("/api/questiontable/:id", (req, res) =>
  QuestionTable.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(res.send("success"))
    .catch(err => console.log(err))
);
//////////////get list subject
router.get("/api/subject", (req, res) =>
  Subject.findAll()
    .then(data => res.send(data))
    .catch(err => console.log(err))
);
module.exports = router;
