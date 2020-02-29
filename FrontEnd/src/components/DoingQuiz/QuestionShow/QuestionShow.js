import React from "react";
import "./QuestionShow.scss";
import TimeBar from "../Timebar/TimeBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faAngleRight,
  faPause,
  faCheck,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
class QuestionShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      question: "",
      question_choices: [],
      time: 0,
      answer_text: "",
      type: 1,
      disableButton: false,
      clicked: false,
      mutiCheckArr: []
    };
  }
  componentDidMount() {
    let { question } = this.props;
    this.setState({
      ...question,
      clicked: false
    });
  }
  componentWillUnmount() {
    let { question_choices, type, mutiCheckArr, answer_text } = this.state;
    if (type === 1) {
      let index = localStorage.getItem("choiceIndex");
      if (index === null) {
        let questionChoice = {
          id: 0
        };
        this.props.recordAnswer(this.state.id, questionChoice, {}, null, type);
      } else
        this.props.recordAnswer(
          this.state.id,
          question_choices[index],
          {},
          null,
          type
        );
      localStorage.removeItem("choiceIndex");
    } else if (type === 2) {
      let multiArr = { question_choices: [] };
      for (let i = 0; i < mutiCheckArr.length; i++)
        multiArr.question_choices[i] = {
          id: question_choices[mutiCheckArr[i]].id
        };
      console.log("multiArr", multiArr);
      this.props.recordAnswer(this.state.id, { id: 0 }, multiArr, null, type);
    } else {
      this.props.recordAnswer(this.state.id, { id: 0 }, {}, answer_text, type);
    }
  }
  onClickCheckAnswer = index => {
    //let { index, question } = this.props;
    let { question_choices, disableButton, type, mutiCheckArr } = this.state;
    if (type === 1) {
      if (disableButton === false) {
        this.setState({
          clicked: true
        });
        if (question_choices[index].is_right) {
          this.setState(preState => ({
            question_choices: preState.question_choices.map((qChoice, i) => {
              return i === index ? { ...qChoice, check: true } : qChoice;
            })
          }));
        } else {
          this.setState(preState => ({
            question_choices: preState.question_choices.map((qChoice, i) => {
              return i === index ? { ...qChoice, check: false } : qChoice;
            })
          }));
          this.setState(preState => ({
            question_choices: preState.question_choices.map(qChoice => {
              return qChoice.is_right ? { ...qChoice, check: true } : qChoice;
            })
          }));
        }
        this.props.doneQuestionHandler();
        this.setState({
          disableButton: true
        });
      }
    } else {
      let unCheck = false;
      let Arr = mutiCheckArr;
      for (let i = 0; i < mutiCheckArr.length; i++)
        if (mutiCheckArr[i] === index) {
          Arr.splice(i, 1);
          this.setState({
            mutiCheckArr: [...Arr]
          });
          unCheck = true;
          break;
        }
      if (!unCheck) {
        Arr.push(index);
        this.setState({
          mutiCheckArr: [...Arr]
        });
      }
    }
  };
  onSubmitMutiSelect = () => {
    let { question_choices, mutiCheckArr } = this.state;
    let rightNumber = 0;
    for (let i = 0; i < question_choices.length; i++)
      if (question_choices[i].is_right) rightNumber++;
    //if (mutiCheckArr.length === rightNumber)
    this.setState({
      clicked: true
    });
    for (let index = 0; index < mutiCheckArr.length; index++)
      if (question_choices[mutiCheckArr[index]].is_right) {
        this.setState(preState => ({
          question_choices: preState.question_choices.map((qChoice, i) => {
            return i === mutiCheckArr[index]
              ? { ...qChoice, check: true }
              : { ...qChoice };
          })
        }));
      } else {
        this.setState(preState => ({
          question_choices: preState.question_choices.map((qChoice, i) => {
            return i === mutiCheckArr[index]
              ? { ...qChoice, check: false }
              : { ...qChoice };
          })
        }));
        this.setState(preState => ({
          question_choices: preState.question_choices.map(qChoice => {
            return qChoice.is_right
              ? { ...qChoice, check: true }
              : { ...qChoice };
          })
        }));
      }
    if (mutiCheckArr.length !== rightNumber)
      this.setState(preState => ({
        question_choices: preState.question_choices.map(qChoice => {
          return qChoice.is_right
            ? { ...qChoice, check: true }
            : { ...qChoice };
        })
      }));

    this.props.doneQuestionHandler();
  };
  onChangeTextHandler = event => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({
      [name]: value
    });
  };
  render() {
    const {
      time,
      question,
      question_choices,
      disableButton,
      clicked,
      type,
      mutiCheckArr,
      answer_text
    } = this.state;
    let { questionsLength, index } = this.props;
    console.log("questonchoices", question_choices);
    const textAnswer = () => {
      return (
        <div>
          <input
            type="text"
            name="answer_text"
            placeholder="add the answer for this question"
            value={answer_text}
            onChange={this.onChangeTextHandler}
          />
        </div>
      );
    };
    let colorButtons = ["#2F6DAE", "#2C9CA6", "#ECA82C", "#D4546A", "#5cd65c"];
    const element = question_choices.map((answer, index) => {
      let color = () => {
        if (answer.check === false) return "#F14D76";
        if (answer.check === true) return "#00c985";
        return colorButtons[index];
      };
      let opacity = () => {
        if (clicked && typeof answer.check === "undefined") return "0.2";
        return "1";
      };

      let tick = () => {
        if (answer.check && clicked)
          return (
            <div className="doing-quiz-show-result-check">
              <FontAwesomeIcon icon={faCheck} size="4x" />
            </div>
          );
        else {
          if (!answer.check && clicked) {
            return (
              <div className="doing-quiz-show-result-check">
                <FontAwesomeIcon icon={faTimes} size="4x" />
              </div>
            );
          }
        }
      };
      let mutiCheck = () => {
        for (let i = 0; i < mutiCheckArr.length; i++)
          if (mutiCheckArr[i] === index)
            return (
              <FontAwesomeIcon size="lg" color="#008000" icon={faCheckSquare} />
            );
        return <FontAwesomeIcon size="lg" color="#008000" icon={faSquare} />;
      };
      return (
        <div
          className="question-answer-wrapper"
          key={index}
          style={{ opacity: opacity() }}
        >
          <button
            onClick={() => {
              this.onClickCheckAnswer(index);
              localStorage.setItem("choiceIndex", index);
            }}
            disabled={disableButton}
            style={{ background: color() }}
            className="question-answer"
          >
            {type === 2 ? (
              <div className="doing-quiz-check-ans-multi">{mutiCheck()}</div>
            ) : null}
            {tick()}
            {answer.answer}
          </button>
        </div>
      );
    });

    return (
      <div className="question-show-container">
        <TimeBar TimeOut={time} />
        <div className="question-show-actions">
          <button className="action-pause">
            <span>
              <FontAwesomeIcon icon={faPause} />
            </span>
          </button>
          <div className="question-process-num">
            <span>{index + 1}</span>/{questionsLength}
          </div>
        </div>
        <div className="question-detail-container">
          <div className="question-detail-body">
            <div className="question-content">
              <h5> {question}</h5>
            </div>

            <div className="question-answers-container">
              {type !== 3 ? (
                element
              ) : (
                <div>
                  <input
                    type="text"
                    name="answer_text"
                    placeholder="add the answer for this question"
                    value={answer_text}
                    onChange={this.onChangeTextHandler}
                  />
                </div>
              )}
            </div>
          </div>
          <div
            className="question-detail-footer"
            style={type === 1 ? { display: "none" } : null}
          >
            <div className="change-question-group">
              <button onClick={this.onSubmitMutiSelect}>
                Submit
                <span>
                  <FontAwesomeIcon icon={faAngleRight} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionShow;
