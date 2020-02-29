import React from "react";
import "./QuizDetailTable.scss";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import history from "../../../history";
class QuizDetailTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplay: "block",
      isPlayedBefore: false,
      disabled: false
    };
  }
  componentDidMount() {
    let { data } = this.props;
    console.log("data", data);
    if (!data.is_finish)
      this.setState({
        disabled: true
      });
    this.props.isUserDoQuizBefore(data.id);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      isPlayedBefore: nextProps.user.isPlayedBefore
    });
  }
  showSampleQuestion = () => {
    let { data } = this.props;
    let arr = [];
    for (let i = 0; i < 3; i++)
      if (typeof data.questions[i] !== "undefined")
        arr.push(
          <div key={i} className="sample-question">
            <div className="sample-content">
              {i + 1}. {data.questions[i].question}
            </div>
            <div className="sample-image"></div>
          </div>
        );
    return arr;
  };
  showLevel = () => {
    let { data } = this.props;
    switch (data.level) {
      case 0:
        return "Easy";
      case 1:
        return "Medium";
      case 2:
        return "Hard";
      default:
        return "N/A";
    }
  };
  showGrades = () => {
    let { data } = this.props;
    let grades = "";
    if (data.grade_begin === data.grade_end) grades = `${data.grade_begin}th`;
    else grades = `${data.grade_begin}th to ${data.grade_end}th `;
    if (data.grade_begin === null) grades = "N/A";
    return grades;
  };
  playQuizOnClickHandler = () => {
    let { data } = this.props;
    if (this.state.isPlayedBefore) history.push(`/join/pre-game/${data.id}`);
    else history.push(`/join/${data.id}/start`);
  };
  render() {
    let { data } = this.props;
    let { disabled } = this.state;
    // render a list of question
    let arr = this.showSampleQuestion();
    let grades = this.showGrades();
    let level = this.showLevel();
    return (
      <div className="popup-quiz-detail-table">
        <div className="popup_inner-quiz-detail-table">
          <div className="popup-header-quiz-detail-table">
            <div className="crop-table-img">
              <img
                src={
                  data.image !== null
                    ? data.image
                    : require("../images/thumbnail.jpg")
                }
                alt="thumbnail"
              />
            </div>
            <button
              className="quiz-table-edit-btn"
              style={!disabled ? { display: "none" } : {}}
              onClick={() => {
                history.push(`/quiz/${data.id}`);
              }}
            >
              Finish Edit
            </button>
            <button
              className="quiz-table-close-btn"
              onClick={this.props.togglePopup}
            >
              <FontAwesomeIcon
                icon={faTimesCircle}
                size="2x"
                color={"#60615F"}
              />
            </button>
            <div className="quiz-flat-info-quiz-detail-table">
              <div className="question-number-quiz-detail-table">
                {data.questions.length} Qs
              </div>
              <div className="play-number-quiz-detail-table">
                {data.played !== 0 ? data.played : "0"} plays
              </div>
            </div>
            <div className="quiz-name">
              <span>{data.title}</span>
            </div>
            <div className="author-container">
              <img src={require("../images/ava.png")} alt="ava" />
              <div className="author-name">{this.props.userName}</div>
              <div className="grade">
                Grades: <span> {grades}</span>
                {/*bind at 1st and 2nd */}
              </div>
            </div>
            <hr />
          </div>
          <div className="popup-body-quiz-detail-table">
            <div className="difficult-level">
              Difficult level: <span>{level}</span>
            </div>
            <h5>Sample questions</h5>
            <div className="sample-questions-container">{arr}</div>
          </div>
          <div className="popup-footer-quiz-detail-table">
            <button
              style={disabled ? { opacity: "0.3", cursor: "no-drop" } : {}}
              disabled={disabled}
              onClick={this.playQuizOnClickHandler}
            >
              Play
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    isUserDoQuizBefore: question_table_id => {
      dispatch(actions.isUserDoQuizBefore(question_table_id));
    }
  };
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(QuizDetailTable);
