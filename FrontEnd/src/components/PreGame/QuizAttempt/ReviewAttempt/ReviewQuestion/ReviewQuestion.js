import React from "react";
import "./ReviewQuestion.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
class ReviewQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        question: {
          question: "",
          question_choices: [],
          is_one_right_ans: 1
        },
        question_choice: {
          id: 0,
          is_right: 0
        },
        multi_choice: {
          question_choice: {
            id: 0,
            is_right: 0
          }
        }
      },
      rightQuestionColor: ""
    };
  }
  componentDidMount() {
    let { data, answerColor } = this.props;
    this.setState({
      data: data,
      rightQuestionColor: answerColor
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    let { answerColor } = nextProps;
    // console.log("answerColor", answerColor);
    this.setState({
      rightQuestionColor: answerColor
    });
  }
  render() {
    //console.log(this.state.rightQuestionColor);
    let { index, data } = this.props;
    let answerElm = data.question.question_choices.map(answerList => {
      let choiceColor = "";
      //question unattempt
      if (answerList.is_right === 1) choiceColor = "#00c985";
      if (data.question.is_one_right_ans) {
        if (data.question_choice.id === answerList.id)
          if (data.question_choice.is_right === 1 && answerList.is_right === 1)
            //question right
            choiceColor = "#00c985";
          else if (data.question_choice.is_right !== 1)
            //question wrong
            choiceColor = "#F14D76";
      } else {
        if (data.multi_choice_id !== null)
          for (let i = 0; i < data.multi_choice.question_choices.length; i++) {
            if (data.multi_choice.question_choices[i].id === answerList.id)
              if (data.multi_choice.question_choices[i].is_right !== 1)
                choiceColor = "#F14D76";
          }
      }
      return (
        <div className="review-option-content" key={answerList.id}>
          <span>
            <FontAwesomeIcon icon={faCircle} color={choiceColor} />
            {/*color right #00C985, color false #F14D76 */}
          </span>

          <p>{answerList.answer}</p>
        </div>
      );
    });
    return (
      <div
        className="review-question-container"
        style={{ borderLeft: `10px solid` + this.state.rightQuestionColor }}
      >
        <div className="review-question-content">
          <p>
            {index + 1}. {data.question.question}
          </p>
        </div>
        <hr />
        {data.question.type === 3 ? (
          <label>{data.answer_text}</label>
        ) : (
          <div className="review-question-options">{answerElm}</div>
        )}
      </div>
    );
  }
}

export default ReviewQuestion;
