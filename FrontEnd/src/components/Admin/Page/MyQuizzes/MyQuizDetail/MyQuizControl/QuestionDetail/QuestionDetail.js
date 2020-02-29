import React from "react";
import "./QuestionDetail.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faClock } from "@fortawesome/free-solid-svg-icons";
class QuizControlQuestionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      time: 0,
      question_choices: [{ id: 0, answer: "", is_right: false }]
    };
  }
  componentDidMount() {
    let { data } = this.props;
    console.log(data);
    this.setState({
      ...data
    });
  }
  render() {
    let { index } = this.props;
    let { question, time, question_choices } = this.state;
    let element = question_choices.map(data => {
      return (
        <div className="q-content" key={data.id}>
          <span>
            <FontAwesomeIcon
              icon={faCircle}
              color={data.is_right ? "#00c985" : "#F14D76"}
              size="lg"
            />
            <span>{data.answer}</span>
          </span>
        </div>
      );
    });
    return (
      <div className="quiz-control-question-container">
        <div className="quiz-control-question-header">
          <div className="question-ordinal">Question {index + 1}</div>

          <div className="question-tick">
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>
            {time} seconds
          </div>
        </div>
        <div className="quiz-control-question-body">
          <div className="question-content">
            <h5> Q. {question}</h5>
          </div>

          <div className="answers-divider">
            <div className="divider-name">
              <p>answer choices</p>
            </div>
            <hr />
          </div>

          <div className="question-content-list">{element}</div>
        </div>
        <div className="quiz-control-question-footer"></div>
      </div>
    );
  }
}

export default QuizControlQuestionDetail;
