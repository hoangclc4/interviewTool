import React from "react";
import "./QuestionInput.scss";
import { connect } from "react-redux";
//import * as actions from "./../../../redux/actions/index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faSquareRootAlt,
  faImage,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
class QuizCreatorQuestionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayDelIcon: true,
      is_right: false,
      answer: "",
      question_id: 0,
      index: 0,
      indexCheck: -1
    };
  }

  handleOnclickDeleteOptions = () => {
    this.props.handleOnclickDeleteOptions(this.props.index);
  };
  componentDidMount = () => {
    let display = false;
    let { data, index } = this.props;
    index > 1 ? (display = true) : (display = false);
    if (typeof data.answer !== "undefined") {
      this.setState({
        answer: data.answer,
        is_right: data.is_right,
        question_id: data.question_id
      });

      //if (data.is_right) localStorage.setItem("rightAnswerIndex", index);
    }
    this.setState({
      isDisplayDelIcon: display
    });
  };
  handleOnClickIsTrueAns = () => {
    let is_right = this.state.is_right;
    let { index, data, checkOneRightAnswer, questionType } = this.props;
    let { answer, question_id } = this.state;
    //console.log(this.props.checkOneRightAnswer);
    if (questionType.typeAnswer === 1) {
      this.props.checkOneRightAnswerHandler(index);
      if (checkOneRightAnswer.isCheck === 0) {
        is_right = !this.state.is_right;
        this.setState({
          is_right: is_right
        });
      } else if (
        checkOneRightAnswer.isCheck === 1 &&
        checkOneRightAnswer.index === index
      ) {
        is_right = !this.state.is_right;
        this.setState({
          is_right: is_right
        });
      }
    }
    // multi select
    else {
      is_right = !this.state.is_right;
      this.setState({
        is_right: is_right
      });
    }
    let dataIndex = data.index;

    this.props.onChangeAnswer(index, {
      index: dataIndex,
      answer,
      is_right,
      question_id
    });
  };
  handleOnChangeInput = event => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({
      [name]: value
    });
    let { index, data } = this.props;
    let dataIndex = data.index;

    let { is_right, question_id } = this.state;
    let answer = value;
    this.props.onChangeAnswer(index, {
      index: dataIndex,
      answer,
      is_right,
      question_id
    });
  };
  render() {
    var { isDisplayDelIcon, is_right, answer, question_id } = this.state;
    let { index, data, questionType } = this.props;

    let dataIndex = data.index;
    //console.log("props", this.props.checkOneRightAnswer);
    if (typeof data.id !== "undefined")
      this.props.onChangeAnswer(index, {
        index: dataIndex,
        answer,
        is_right,
        question_id
      });

    if (questionType.typeAnswer === 1 && questionType.isChange) {
      let reset = this.state;
      reset.is_right = false;
      this.props.onChangeAnswer(index, {
        index: dataIndex,
        answer,
        is_right: false,
        question_id
      });
      this.props.onChangeQuestionType();
    }

    return (
      <div className="question-input">
        <FontAwesomeIcon
          icon={faCheckCircle}
          size="2x"
          color={is_right ? "#00C985" : "#CAD2DC"}
          onClick={this.handleOnClickIsTrueAns}
        />
        <div className="input-group">
          <input
            type="text"
            name="answer"
            value={this.state.answer}
            placeholder="add answer"
            onChange={this.handleOnChangeInput}
          />
          <span
            onClick={this.handleOnclickDeleteOptions}
            style={{ display: isDisplayDelIcon ? "block" : "none" }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
        </div>
        <FontAwesomeIcon icon={faSquareRootAlt} size="2x" color="#CAD2DC" />
        <FontAwesomeIcon icon={faImage} size="2x" color="#CAD2DC" />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {};
};
const mapStateToProps = state => {
  return {
    quizAnswer: state.quizAnswer
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizCreatorQuestionInput);
