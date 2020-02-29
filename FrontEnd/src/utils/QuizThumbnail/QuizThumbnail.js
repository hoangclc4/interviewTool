import React from "react";
import "./QuizThumbnail.scss";

import { connect } from "react-redux";
import * as actions from "./../../redux/actions/index";
import QuizDetailTable from "./QuizDetailTable/QuizDetailTable";
import history from "../../history";
class QuizThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: 0,
        code: 0,
        title: "",
        image: null,
        played: 0,

        questions: []
      },
      attemptList: [],
      isCompleted: false,
      isRunning: false,
      isShowPopup: false,
      accuracy: 0
    };
  }
  componentDidMount() {
    let { data, isCompleted } = this.props;
    if (typeof isCompleted !== "undefined") {
      this.setState({
        isCompleted: isCompleted
      });
      //get array of attempt
      let temptARR = [];
      let count = 1;
      let maxAttempt = data.answer_records[data.answer_records.length - 1].id;
      while (count <= maxAttempt) {
        let plus = 0;
        let tempt = [];
        for (let i = plus; i < data.answer_records.length; i++) {
          if (data.answer_records[i].id === count) {
            tempt.push(data.answer_records[i]);
            plus++;
          }
        }
        count++;
        temptARR.push(tempt);
      }
      this.setState({
        attemptList: temptARR
      });
      this.calculate(temptARR);
    }
    this.setState({
      data: data
    });
  }
  onClickHandler = () => {
    let question_table_id = this.props.data.id;
    if (this.state.isCompleted)
      history.push(`/join/pre-game/${question_table_id}`);
    else this.togglePopup();
  };
  togglePopup = () => {
    this.setState({
      isShowPopup: !this.state.isShowPopup
    });
  };
  calculate = attemptList => {
    let accuracyArr = [];
    attemptList.forEach(answerRecord => {
      accuracyArr.push(this.calculateAccuracy(answerRecord));
    });
    let accuracy = Math.max(...accuracyArr);
    this.setState({
      accuracy: accuracy
    });
  };

  calculateAccuracy = data => {
    //calculate the accuracy
    let rightAnswer = 0;
    data.forEach(attempt => {
      if (attempt.question.type === 1) {
        if (attempt.question_choice.is_right === 1) rightAnswer++;
      } else if (attempt.question.type === 2) {
        let questionRightTotal = 0;
        let multiRightTotal = 0;
        for (let i = 0; i < attempt.question.question_choices.length; i++)
          if (attempt.question.question_choices[i].is_right)
            questionRightTotal++;
        if (attempt.multi_choice_id !== null) {
          let { question_choices } = attempt.multi_choice;
          for (let i = 0; i < question_choices.length; i++)
            if (question_choices[i].is_right) multiRightTotal++;
        }
        if (multiRightTotal === questionRightTotal) rightAnswer++;
      }
    });
    let accuracy = (rightAnswer / data.length).toFixed(2) * 100;
    return accuracy;
  };
  accuracyColor = accuracy => {
    switch (true) {
      case accuracy <= 10:
        return "#ff0000";
      case accuracy <= 55:
        return "#f5a623";
      case accuracy <= 80:
        return "#99cc00";
      case accuracy <= 100:
        return "#4caf50";
      default:
        return "";
    }
  };
  render() {
    let { data, isCompleted, isRunning, accuracy } = this.state;
    let color = this.accuracyColor(accuracy);
    let userName = this.props.userName;
    return (
      <div className="quiz-thumbnail-wrapper">
        <div
          className="quiz-thumbnail-container"
          style={isCompleted ? { height: "280px" } : { height: "240px" }}
          onClick={this.onClickHandler}
        >
          <div className="crop-thumbnail-img">
            <img
              src={
                data.image !== null
                  ? data.image
                  : require("./images/thumbnail.jpg")
              }
              alt="thumbnail"
            />
          </div>

          <div className="quiz-flat-info">
            <div className="question-number">{data.questions.length} Qs</div>
            <div className="play-number">
              {data.played !== 0 ? data.played : "0"} plays
            </div>
          </div>
          <div className="quiz-name">
            <span>{data.title}</span>
          </div>
          <div className="author-name">
            <span>
              <span>By:</span> {userName}
            </span>
          </div>
          {isRunning ? (
            <div className="progression">
              <div className="pr-ing">
                <div className="pr-bar">3 questions left</div>
              </div>
            </div>
          ) : null}

          {isCompleted ? (
            <div className="accuracy">
              <div className="pr-ing">
                <div className="pr-bar" style={{ background: color }}>
                  {accuracy}% accuracy
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {this.state.isShowPopup ? (
          <QuizDetailTable
            togglePopup={this.togglePopup}
            data={data}
            userName={userName}
          />
        ) : null}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    showListQuestionAnswer: question_table_id => {
      dispatch(actions.showListQuestionAnswer(question_table_id));
    }
  };
};
const mapStateToProps = state => {
  return {
    questionTable: state.questionTable,
    user: state.user
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(QuizThumbnail);
