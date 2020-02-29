import React from "react";
import "./ReviewAttempt.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
import ReviewQuestion from "./ReviewQuestion/ReviewQuestion";
import history from "../../../../history";
class ReviewAttempt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 0,
          question_id: 0,
          choice_id: 0,
          multi_choice_id: 0,
          multi_choice: {
            question_choices: []
          },
          question: {
            type: 1,
            question_choices: []
          },
          question_choice: {
            is_right: false
          }
        }
      ]
    };
  }

  componentDidMount() {
    let attempt_id = parseInt(localStorage.getItem("attempt_id"));
    let question_table_id = parseInt(this.props.match.params.question_table_id);
    this.props.getAttempt(question_table_id, attempt_id);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps.attempt);
    this.setState({
      data: nextProps.attempt
    });
  }
  calculateAccuracy = () => {
    let { data } = this.state;
    let rightAnswer = this.correctAnswer();
    let textQuestion = 0;
    data.forEach(sub => {
      if (sub.question.type === 3) textQuestion++;
    });
    let accuracy =
      (rightAnswer / (data.length - textQuestion)).toFixed(2) * 100;
    return accuracy;
  };
  correctAnswer = () => {
    let { data } = this.state;
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

    return rightAnswer;
  };
  inCorrectAnswer = () => {
    let { data } = this.state;
    let inCorrectAnswer =
      data.length -
      (this.correctAnswer() + this.unAttemptAnswer() + this.textAnswer());

    return inCorrectAnswer;
  };
  textAnswer = () => {
    let { data } = this.state;
    let textAnswer = 0;
    data.forEach(attempt => {
      if (attempt.question.type === 3) textAnswer++;
    });
    return textAnswer;
  };
  unAttemptAnswer = () => {
    let { data } = this.state;
    let unAttemptAnswer = 0;
    //   data.length - (this.correctAnswer() + this.inCorrectAnswer());
    data.forEach(attempt => {
      if (attempt.question.type === 1) {
        if (attempt.question_choice.is_right === 2) unAttemptAnswer++;
      } else if (attempt.question.type === 2) {
        let { multi_choice_id } = attempt;
        if (multi_choice_id === null) unAttemptAnswer++;
      }
    });
    return unAttemptAnswer;
  };
  getQuestionBorderColor = data => {
    let answerColor = [];
    let multiRightCount = 0;
    let questionRightTotal = 0;
    let choiceColor = "";
    let { question_choices, type } = data.question;
    if (type === 3) choiceColor = " #ffc107 ";
    else {
      for (let i = 0; i < question_choices.length; i++)
        if (data.question.question_choices[i].is_right === 1)
          questionRightTotal++;
      for (let i = 0; i < question_choices.length; i++) {
        if (type === 1) {
          if (
            data.question_choice.id === question_choices[i].id &&
            data.question_choice.is_right === 1 &&
            question_choices[i].is_right === 1
          ) {
            //question right border
            choiceColor = " #00995c ";
          } else if (data.question_choice.is_right === 0) {
            //question wrong border
            choiceColor = " #ec0b43 ";
          }
        } else if (type === 2) {
          if (data.multi_choice_id !== null) {
            for (
              let j = 0;
              j < data.multi_choice.question_choices.length;
              j++
            ) {
              if (
                data.multi_choice.question_choices[j].id ===
                question_choices[i].id
              )
                if (
                  data.multi_choice.question_choices[j].is_right === 1 &&
                  question_choices[i].is_right === 1
                )
                  multiRightCount++;
                else multiRightCount--;
            }
            if (multiRightCount === questionRightTotal)
              choiceColor = " #00995c ";
            else choiceColor = " #ec0b43 ";
          }
        }
      }
    }

    answerColor.push(choiceColor);
    console.log("answerColor", answerColor);
    return answerColor;
  };
  render() {
    let { data } = this.state;
    let question_table_id = parseInt(this.props.match.params.question_table_id);
    let accuracy = 0;
    accuracy = this.calculateAccuracy();
    let progressBar = `${accuracy}%`;
    let userName = localStorage.getItem("username");
    let correctAnswer = this.correctAnswer();
    let unAttemptAnswer = this.unAttemptAnswer();
    let inCorrectAnswer = this.inCorrectAnswer();
    let questionAttempt = data.map((question, index) => {
      let answerColor = this.getQuestionBorderColor(question);
      console.log("question", question);
      return (
        <ReviewQuestion
          key={index}
          data={question}
          index={index}
          answerColor={answerColor}
        />
      );
    });

    let accuracyStyle = `@keyframes progressAnimation{
      0% {
        width: 5%;background-color: #F9BCCA;
      }
      100%{
        width: ${accuracy}%;
        background-color: #00C985;
      }
    }`;
    return (
      <div className="review-attempt-container">
        <div className="review-attempt-nav">
          <button
            onClick={() => history.push(`/join/pre-game/${question_table_id}`)}
          >
            <span>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </button>
        </div>
        <div className="review-attempt-show-container">
          <div className="review-sumary">
            <div className="stick-top-action-container">
              <button
                onClick={() => history.push(`/join/game/${question_table_id}`)}
              >
                Play again
              </button>
            </div>

            <h4 className="review-section-title">Game Sumary</h4>

            <div className="attempt-result-container">
              <div className="attempt-result">
                <img
                  src={require("./images/Review.png")}
                  className="review-camera"
                  alt="reviewCamera"
                />
                <div className="review-name-and-point">
                  <div className="review-name">{userName}</div>
                  <div className="review-point">
                    <span>Point:</span> {accuracy}/100
                  </div>
                </div>
              </div>
            </div>

            <h4 className="review-section-title">Accuracy</h4>

            <div className="review-accuracy-container">
              <div
                className="review-progress-container"
                style={{ accuracyStyle }}
              >
                <div className="review-progress review-progress-moved">
                  <div
                    className="review-progress-bar"
                    style={
                      accuracy >= 95
                        ? {
                            borderTopRightRadius: "30px",
                            borderBottomRightRadius: "30px",
                            width: progressBar
                          }
                        : { width: progressBar }
                    }
                  >
                    <span>{accuracy}%</span>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="review-section-title">Performance</h4>

            <div className="review-performance-group-container">
              <div className="review-performance-container">
                <img
                  src={require("./images/Correct.png")}
                  className="review-blur-image"
                  alt="blurImage"
                />
                <div className="review-detail-correct">
                  <h2>{correctAnswer}</h2>
                  <h4>Correct</h4>
                </div>
              </div>
              <div className="review-performance-container">
                <img
                  src={require("./images/incorrect.png")}
                  className="review-blur-image"
                  alt="blurImage"
                />
                <div className="review-detail-correct">
                  <h2>{inCorrectAnswer}</h2>
                  <h4>Incorrect</h4>
                </div>
              </div>
              <div className="review-performance-container">
                <img
                  src={require("./images/unattempt.png")}
                  className="review-blur-image"
                  alt="blurImage"
                />
                <div className="review-detail-correct">
                  <h2>{unAttemptAnswer}</h2>
                  <h4>Unattempt</h4>
                </div>
              </div>
            </div>

            <h4 className="review-section-title">Review questions</h4>

            <div className="review-questions-container">{questionAttempt}</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    getAttempt: (question_table_id, attempt_id) => {
      dispatch(actions.getAttempt(question_table_id, attempt_id));
    }
  };
};
const mapStateToProps = state => {
  return {
    attempt: state.attempt
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewAttempt);
