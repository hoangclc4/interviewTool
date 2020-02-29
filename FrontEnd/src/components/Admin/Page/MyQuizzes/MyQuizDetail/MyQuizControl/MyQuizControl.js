import React from "react";
import "./MyQuizControl.scss";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../../../../../redux/actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPrint,
  faBook,
  faPlay,
  faAtlas,
  faUsers,
  faQuestion,
  faUser,
  faComments,
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";

import QuizControlQuestionDetail from "./QuestionDetail/QuestionDetail";
class MyQuizControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grade_begin: 0,
      grade_end: 0,
      id: 0,
      image: "",
      is_finish: 0,
      is_public: 1,
      level: 0,
      played: 0,
      title: "DOTA",
      questions: [],
      subject: {
        title: ""
      }
    };
  }
  componentDidMount() {
    this.props.showListQuestionTable();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let question_table_id = parseInt(this.props.match.params.question_table_id);
    let { question_tables } = nextProps.user[0];
    for (let i = 0; i < question_tables.length; i++)
      if (question_tables[i].id === question_table_id) {
        this.setState({
          ...question_tables[i]
        });
        break;
      }
  }
  render() {
    let question_table_id = parseInt(this.props.match.params.question_table_id);
    console.log("state", this.state);
    let gradeTitle = localStorage.getItem("gradeTitle");
    let { title, image, played, questions, subject } = this.state;
    let { history } = this.props;
    let element = questions.map((data, index) => {
      return (
        <QuizControlQuestionDetail key={index} data={data} index={index} />
      );
    });
    return (
      <div className="my-quiz-control-container">
        <div className="quiz-control-header">
          <div className="header-image">
            <img
              alt="header"
              className="header-img"
              src={
                image !== null
                  ? image
                  : require("../../../../../../utils/QuizThumbnail/images/thumbnail.jpg")
              }
            />
          </div>
          <div className="header-info">
            <div className="title-and-func">
              <div className="title">{title}</div>
              <div className="func-group">
                <div className="func">
                  <span>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </span>
                </div>
                <div className="func">
                  <span>
                    <FontAwesomeIcon icon={faPrint} />
                  </span>
                </div>
              </div>
            </div>
            <div className="grade-and-plays">
              <div className="grade">
                <span>
                  <FontAwesomeIcon icon={faBook} color="#6B7C93" />
                </span>
                {gradeTitle}
              </div>
              <div className="plays">
                <span>
                  <FontAwesomeIcon icon={faPlay} color="#6B7C93" />
                </span>
                Played {played} times
              </div>
            </div>
            <div className="subject">
              <span>
                <FontAwesomeIcon icon={faAtlas} color="#6B7C93" />
              </span>
              {subject.title}
            </div>
          </div>
        </div>
        <div className="quiz-control-action-hosting">
          <div className="action-group">
            <div className="action-group-info">
              <div className="action-name">
                <span>
                  <FontAwesomeIcon icon={faUsers} color="#868790" />
                </span>
                Host a game
              </div>
              <div className="explain-action">
                <span>
                  <FontAwesomeIcon icon={faQuestion} size="xs" color="white" />
                </span>
              </div>
            </div>
            <div className="action-btn-group">
              <button className="action-btn b-host">Live game</button>
              <button
                className="action-btn b-host"
                onClick={() => {
                  history.push(`/admin/quiz/homework/${question_table_id}`);
                }}
              >
                Homework
              </button>
            </div>
          </div>

          <div className="action-group">
            <div className="action-group-info">
              <div className="action-name">
                <span>
                  <FontAwesomeIcon icon={faUser} color="#868790" />
                </span>
                Solo Practice
              </div>
              <div className="explain-action">
                <span>
                  <FontAwesomeIcon icon={faQuestion} size="xs" color="white" />
                </span>
              </div>
            </div>
            <div className="action-btn-group">
              <button className="action-btn b-pratice">Practice</button>
            </div>
          </div>
        </div>
        <div className="quiz-control-action-drafting"></div>
        <hr />
        <div className="quiz-control-questions">
          <div className="questions-group-info">
            <div className="question-number">
              <span>
                <FontAwesomeIcon icon={faComments} />
              </span>
              {questions.length} Questions
            </div>
            <button className="show-answers">
              <span>
                <FontAwesomeIcon icon={faEye} color="#8A81EC" />
              </span>
              <span style={{ display: "none" }}>
                <FontAwesomeIcon icon={faEyeSlash} color="#8A81EC" />
              </span>
              SHOW ANSWERS
            </button>
          </div>
          <div className="question-lists">{element}</div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    showListQuestionTable: () => {
      dispatch(actions.showListQuestionTable());
    }
  };
};
const mapStateToProps = state => {
  return {
    questionTable: state.questionTable,
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyQuizControl));
