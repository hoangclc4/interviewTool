import React from "react";
import "./QuestionDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPencilAlt,
  faTrashAlt,
  faCircle,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import { Select } from "antd";

//
import { connect } from "react-redux";
import * as actions from "./../../../redux/actions/index";

//
class QuizCreatorQuestionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      question: "",
      time: 0
    };
  }
  onSelectTimeHandler = event => {
    let question = this.state;
    question.time = parseInt(event);
    this.setState({
      time: question.time
    });
    let { data } = this.props;
    let questionData = {
      id: data.id,
      question: data.question,
      time: question.time
    };
    this.props.updateQuestion(questionData, this.props.index);
  };
  onClickDeleteHandler = () => {
    let { index } = this.props;
    this.props.onClickDeleteHandler(index);
  };
  onClickEditHandler = () => {
    let { index, data } = this.props;
    this.props.onClickEditHandler(index + 1, data);
  };
  render() {
    let { time } = this.state;
    const { Option } = Select;
    let { disabledIfFinished } = this.props;
    return (
      <div className="question-detail-container">
        <div className="question-detail-header">
          <span>
            <FontAwesomeIcon icon={faBars} color="#DFDFDF" size="lg" />
          </span>
          <p>Question {this.props.index + 1}</p>
          <div className="question-button-group">
            <button
              disabled={disabledIfFinished}
              style={disabledIfFinished ? { opacity: "0.6" } : null}
              onClick={this.onClickDeleteHandler}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            <button
              disabled={disabledIfFinished}
              style={disabledIfFinished ? { opacity: "0.6" } : null}
              onClick={this.onClickEditHandler}
            >
              <span>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
              Edit
            </button>
          </div>
        </div>
        <div className="question-detail-body">
          <div className="question-content">
            <h5> {this.props.data.question}</h5>
          </div>
          <div className="answers-divider">
            <div className="divider-name">
              <p>answer choices</p>
            </div>
            <hr />
          </div>
          <div className="question-answers-container">
            {this.props.data.question_choices.map(answer => {
              return (
                <div className="question-answer" key={answer.id}>
                  <span>
                    <FontAwesomeIcon
                      icon={faCircle}
                      color={answer.is_right ? "#00C985" : "#F14D76"}
                      size="lg"
                    />
                    <span>{answer.answer}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="question-detail-footer">
          <span>
            <FontAwesomeIcon icon={faClock} color="gray" />
          </span>
          <div className="question-time">
            <Select
              defaultValue={time === 0 ? `${this.props.data.time}` : "30"}
              onChange={this.onSelectTimeHandler}
              style={{ width: 120 }}
            >
              <Option key="15">15 seconds</Option>
              <Option key="30">30 seconds</Option>
              <Option key="45">45 seconds</Option>
              <Option key="60">60 seconds</Option>
            </Select>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateQuestion: (data, index) => {
      dispatch(actions.updateQuestion(data, index));
    }
  };
};
const mapStateToProps = state => {
  return {
    question: state.question,
    questionTable: state.questionTable
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizCreatorQuestionDetail);
