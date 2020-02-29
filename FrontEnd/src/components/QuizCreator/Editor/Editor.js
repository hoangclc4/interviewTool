import React from "react";
import "./Editor.scss";
//import ToggleBox from '../ToggleBox/ToggleBox';
import QuizCreatorQuestionDetail from "../QuestionDetail/QuestionDetail";

import "font-awesome/css/font-awesome.min.css";
//import ToggleBox from '../ToggleBox/ToggleBox';
import { connect } from "react-redux";
import * as actions from "./../../../redux/actions/index";
import history from "../../../history";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faPencilAlt,
  faEye,
  faEyeSlash,
  faGraduationCap,
  faBook,
  faUpload
} from "@fortawesome/free-solid-svg-icons";
import CreatePopUp from "./CreatePopUp";

import ShowPreviewPopUp from "./ShowPreviewPopUp";
import ShowSubjectPopUp from "./ShowSubjectPopUp";
class QuizCreatorEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopupCreate: false,
      showPopupEdit: false,
      showPopupPreview: false,
      showPopupSubject: false,
      disabledIfFinished: false,
      dataEdit: {},
      question_table_id: 1,
      //questions: [],
      table: {
        title: "",
        questions: [],
        is_finish: false,
        image: null,
        is_public: true,
        subject: {
          id: 0,
          title: ""
        },
        grade_begin: null,
        grade_end: null
      }
    };
  }
  togglePopup = () => {
    let { showPopupCreate, showPopupEdit } = this.state;

    if (showPopupEdit === true) {
      this.setState({
        showPopupEdit: !showPopupEdit,
        dataEdit: {}
      });
    }
    if (showPopupCreate === true) {
      this.setState({
        showPopupCreate: !showPopupCreate
      });
    }
  };

  togglePopupPreview = () => {
    let { showPopupPreview } = this.state;

    if (showPopupPreview === true) {
      this.setState({
        showPopupPreview: !showPopupPreview
      });
    }
  };

  togglePopupSubject = () => {
    let { showPopupSubject } = this.state;

    if (showPopupSubject === true) {
      this.setState({
        showPopupSubject: !showPopupSubject
      });
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.question === null) {
      if (nextProps.questionTable.is_finish)
        this.setState({ disabledIfFinished: true });
      this.setState({
        table: nextProps.questionTable
      });
    } else {
      let newTable = { ...this.state.table };
      newTable.questions.push({ ...nextProps.question });
    }
  }
  componentDidMount() {
    let { question_table_id } = this.props.match.params;
    this.setState({
      question_table_id: question_table_id
    });
    this.props.showListQuestionAnswer(question_table_id);
  }
  onClickDeleteHandler = index => {
    let question_id = this.state.table.questions[index].id;
    this.props.deleteQuestionAndAnswersAPI(question_id, index);
  };
  onClickEditHandler = (index, data) => {
    this.setState({
      showPopupEdit: true,
      dataEdit: {
        index: index,
        ...data
      }
    });
  };
  onClickFinishQuizHandler = () => {
    let { question_table_id } = this.props.match.params;
    this.props.finishQuestionTable(question_table_id);
  };
  suffix = value => {
    switch (value) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  gradeTitlePart = grade => {
    let title = "";
    let suffix = this.suffix(grade);
    if (grade === null) title = null;
    if (grade < 13) title = `${grade}${suffix}`;
    else if (grade === 13) return "University";
    if (grade === 14) return "Professional Development";
    return title;
  };
  gradeTitle = () => {
    let { grade_begin, grade_end } = this.state.table;
    let gradeBeginTitle = this.gradeTitlePart(grade_begin);
    let gradeEndTitle = this.gradeTitlePart(grade_end);
    let gradeTitle = "";
    if (grade_begin === null) gradeTitle = "Add grade";
    else if (grade_begin === grade_end) {
      if (grade_begin < 13) gradeTitle = `${gradeBeginTitle} grade`;
      else gradeTitle = gradeBeginTitle;
    } else {
      if (grade_begin < 13) {
        gradeTitle = `${gradeBeginTitle} - ${gradeEndTitle} grade`;
        if (grade_end > 12)
          gradeTitle = `${gradeBeginTitle} - ${gradeEndTitle}`;
      } else gradeTitle = `${gradeBeginTitle} - ${gradeEndTitle}`;
    }
    return gradeTitle;
  };
  onClickChangePublic = () => {
    let { id, is_public } = this.state.table;
    let check = !is_public;
    this.setState({
      table: {
        ...this.state.table,
        is_public: check
      }
    });
    this.props.updateTable({ id, is_public: check });
  };
  render() {
    let { image, subject, title, is_public } = this.state.table;
    let { disabledIfFinished } = this.state;
    let gradeTitle = this.gradeTitle();
    let element = this.state.table.questions.map((data, index) => {
      return (
        <QuizCreatorQuestionDetail
          key={index}
          data={data}
          index={index}
          onClickDeleteHandler={this.onClickDeleteHandler}
          onClickEditHandler={this.onClickEditHandler}
          disabledIfFinished={this.state.disabledIfFinished}
        />
      );
    });
    return (
      <div className="page-container">
        <div className="quiz-creator-nav">
          <div className="logo">
            <img src={require("./images/logo.png")} alt="quiz-icon" />
          </div>

          <div className="button-group">
            <button
              className="b-exit button"
              onClick={() => history.push("/join")}
            >
              EXIT
            </button>
            <button
              className="b-finish button"
              onClick={this.onClickFinishQuizHandler}
              disabled={disabledIfFinished}
              style={disabledIfFinished ? { opacity: "0.6" } : null}
            >
              FINISH
            </button>
          </div>
        </div>
        <div className="editor">
          <div className="question-editor">
            <div className="button-group">
              <button
                onClick={() => {
                  this.setState({
                    showPopupCreate: !this.state.showPopupCreate
                  });
                  this.togglePopup();
                }}
                disabled={disabledIfFinished}
                style={disabledIfFinished ? { opacity: "0.6" } : null}
                className="button b-create"
              >
                <FontAwesomeIcon icon={faPlusCircle} />
                Create a new question
              </button>
              <p>Or</p>
              <button
                className="button b-teleport"
                disabled={disabledIfFinished}
                style={disabledIfFinished ? { opacity: "0.6" } : null}
              >
                Teleport
              </button>
            </div>
            {element}
            {this.state.table.questions.length === 0 ? <img className="no-question-created" alt="no-questions-created" src={require("./images/no-question-created.png")} /> : null}
          </div>
          <div className="quiz-info-container">
            <div className="quiz-info-edit-container">
              <div
                className="quiz-image-choice-overlay"
                onClick={() => {
                  this.setState({
                    showPopupPreview: !this.state.showPopupPreview
                  });
                  this.togglePopupPreview();
                }}
              >
                <div className="crop-quiz-img-choice">
                  <img
                    className="quiz-image-choice"
                    src={image !== null ? image : require("./images/none.png")}
                    alt="quizImageChoice"
                  />
                </div>

                <div className="overlay-edit">
                  <div className="overlay-text">Edit image</div>
                </div>
              </div>
              <div className="quiz-info-edit-quiz-name">
                <div className="quiz-name">{title}</div>
                <button>
                  <span>
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      color="#FD7E14"
                      size="lg"
                      onClick={() => {
                        this.setState({
                          showPopupSubject: !this.state.showPopupSubject
                        });
                        this.togglePopupSubject();
                      }}
                    />
                  </span>
                </button>
              </div>
              <div className="quiz-scope-data">
                <div className="scope-public">
                  <button onClick={this.onClickChangePublic}>
                    <span>
                      <FontAwesomeIcon icon={is_public ? faEye : faEyeSlash} />
                      {/*change to faEyeSlash if private */}
                    </span>
                    {is_public ? "Public" : "private"}{" "}
                    {/** change to "private" if private */}
                  </button>
                </div>
              </div>
              <hr />
              <div className="quiz-grade">
                <div className="quiz-sm-icon">
                  <FontAwesomeIcon icon={faGraduationCap} color="#6B6C77" />
                </div>
                <button
                  onClick={() => {
                    this.setState({
                      showPopupPreview: !this.state.showPopupPreview
                    });
                    this.togglePopupPreview();
                  }}
                >
                  {gradeTitle}
                </button>
              </div>
              <div className="quiz-subject">
                <div className="quiz-sm-icon">
                  <FontAwesomeIcon icon={faBook} color="#6B6C77" />
                </div>
                <button
                  onClick={() => {
                    this.setState({
                      showPopupSubject: !this.state.showPopupSubject
                    });
                    this.togglePopupSubject();
                  }}
                >
                  {subject.title}
                </button>
              </div>

              <div className="quiz-import">
                <div className="quiz-sm-icon">
                  <FontAwesomeIcon icon={faUpload} color="#6B6C77" />
                </div>
                <button>Import from file</button>
              </div>
            </div>
          </div>
          {this.state.showPopupCreate ? (
            <CreatePopUp
              index={this.state.table.questions.length + 1}
              closePopup={this.togglePopup}
              match={this.props.match}
            />
          ) : null}
          {this.state.showPopupEdit ? (
            <CreatePopUp
              index={this.state.dataEdit.index}
              closePopup={this.togglePopup}
              match={this.props.match}
              data={this.state.dataEdit}
            />
          ) : null}

          {this.state.showPopupPreview ? (
            <ShowPreviewPopUp
              closePopup={this.togglePopupPreview}
              data={this.state.table}
            />
          ) : null}

          {this.state.showPopupSubject ? (
            <ShowSubjectPopUp
              closePopup={this.togglePopupSubject}
              data={this.state.table}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    showListQuestionAnswer: question_table_id => {
      dispatch(actions.showListQuestionAnswer(question_table_id));
    },
    deleteQuestionAndAnswersAPI: (id, index) => {
      dispatch(actions.deleteQuestionAndAnswersAPI(id, index));
    },
    finishQuestionTable: id => {
      dispatch(actions.finishQuestionTable(id));
    },
    updateTable: data => {
      dispatch(actions.updateTable(data));
    }
  };
};
const mapStateToProps = state => {
  return {
    questionTable: state.questionTable,
    question: state.question
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(QuizCreatorEditor);
