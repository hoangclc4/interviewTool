import React from "react";
import "./Editor.scss";
import QuizCreatorQuestionInput from "./../QuestionInput/QuestionInput";
import "font-awesome/css/font-awesome.min.css";
//import ToggleBox from '../ToggleBox/ToggleBox';
import { connect } from "react-redux";
import * as actions from "./../../../redux/actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faClock } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Select } from "antd";

const listPrototype = [
  {
    index: 0
  },
  {
    index: 1
  },
  {
    index: 2
  },
  {
    index: 3
  }
];
let listAns = [...listPrototype];
class QuestionCreatePopup extends React.Component {
  constructor() {
    super();
    this.state = {
      questionsArr: listAns,
      isDisplay: "block",
      timeTitle: 30,
      data: {
        id: 0,
        question: "",
        time: 30,
        type: 1
      },
      answers: [],
      checkOneRightAnswer: {
        index: -1,
        isCheck: 0
      },
      temptCheck: {},
      questionType: {
        title: "Single answer",
        typeAnswer: 1,
        isChange: false
      }
    };
  }
  componentDidMount() {
    let { data } = this.props;
    let { questionsArr } = this.state;
    let display = "block";
    //edit
    if (typeof data !== "undefined") {
      //console.log(data);
      let tempt = this.state;
      tempt.answers = data.question_choices;
      let { answers, questionType, temptCheck } = this.state;
      for (let i = 0; i < answers.length; i++) answers[i].index = i;
      this.setState({
        timeTitle: data.time,
        answers: data.question_choices,
        data: {
          ...data,
          id: data.id,
          question: data.question
        }
      });
      let typeTitle = "";
      let typeAnswer = 1;
      if (data.type === 1) typeTitle = "Single answer";
      else if (data.type === 2) {
        typeTitle = "Multi-select";
        typeAnswer = 2;
      } else {
        typeTitle = "Text answer";
        typeAnswer = 3;
      }
      let rightAnswerIndex = -1;
      for (let i = 0; i < data.question_choices.length; i++)
        if (data.question_choices[i].is_right)
          rightAnswerIndex = data.question_choices[i].index;
      this.setState({
        questionType: {
          ...questionType,
          title: typeTitle,
          typeAnswer: typeAnswer
        },
        temptCheck: {
          ...temptCheck,
          index: rightAnswerIndex
        },
        checkOneRightAnswer: {
          index: rightAnswerIndex,
          isCheck: 1
        }
      });
      if (answers.length >= 5) display = "none";
    }
    if (questionsArr.length >= 5) display = "none";
    this.setState({
      isDisplay: display
    });
  }
  handleOnclickDeleteOptions = index => {
    let { data } = this.props;
    if (typeof data === "undefined") {
      listAns.splice(index, 1);
      this.setState({
        questionsArr: listAns
      });
      //console.log("delete", this.state.questionsArr);
    } else {
      listAns = this.state.answers;
      listAns.splice(index, 1);
      this.setState({
        answers: listAns
      });
      //console.log("delete", this.state.answers);
    }
    if (listAns.length < 5) {
      this.setState({
        isDisplay: "block"
      });
    }
  };
  addQuestionOnclick = () => {
    let { questionsArr, answers } = this.state;
    let { data } = this.props;
    let display = "";

    if (typeof data !== "undefined") {
      //console.log(answers);
      let arr = answers;
      let indexTempt = answers[answers.length - 1].index + 1;
      arr.push({ index: indexTempt });
      this.setState({
        answers: arr
      });
      answers.length < 5 ? (display = "block") : (display = "none");
    } else {
      let indexTempt = listAns[listAns.length - 1].index + 1;
      listAns.push({ index: indexTempt });
      //console.log(listAns);
      this.setState({
        questionsArr: listAns
      });
      questionsArr.length < 5 ? (display = "block") : (display = "none");
    }

    this.setState({
      isDisplay: display
    });
  };
  onSubmitHandle = event => {
    event.preventDefault();
    let isCheck = 0;
    for (let i = 0; i < listAns.length; i++)
      if (listAns[i].is_right && listAns[i].answer !== "") isCheck++;
    // text ans dont have an ans so check it to call create QuestionAPI
    if (this.state.questionType.typeAnswer === 3) isCheck++;
    if (isCheck === 0)
      Swal.fire({
        position: "top",
        type: "warning",
        title: "Please check the right answer !!",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false
      });
    else {
      for (let i = 0; i < listAns.length; i++)
        if (
          typeof listAns[i].answer === "undefined" ||
          listAns[i].answer === ""
        ) {
          listAns.splice(i, 1);
          i--;
        }
      if (typeof this.props.data === "undefined") {
        let question_table_id = this.props.match.params.question_table_id;
        this.props.createQuestionAndAnswersAPI(
          question_table_id,
          this.state.data,
          listAns
        );
      } else {
        let index = this.props.index;
        this.props.updateQuestionAndAnswersAPI(
          this.state.data,
          listAns,
          index - 1
        );
        this.setState({
          answers: []
        });
      }

      this.props.closePopup();

      listAns = [...listPrototype];
    }
  };
  onChangeAnswer = (index, answer) => {
    listAns[index] = answer;
    console.log(listAns);
  };
  checkOneRightAnswerHandler = index => {
    let { temptCheck, checkOneRightAnswer } = this.state;
    if (!Object.keys(temptCheck).length) {
      this.setState({
        temptCheck: {
          ...temptCheck,
          index: index
        },
        checkOneRightAnswer: {
          index: index,
          isCheck: 1
        }
      });
    } else {
      let temptIndex = temptCheck;
      if (index === temptIndex.index && checkOneRightAnswer.isCheck === 1) {
        this.setState({
          temptCheck: {},
          checkOneRightAnswer: {
            index: -1,
            isCheck: 0
          }
        });
      } else {
        Swal.fire({
          position: "top-start",
          type: "warning",
          title: "You have to choose 1 right answer!!",
          showConfirmButton: false,
          timer: 1500,
          heightAuto: false
        });
      }
    }

    //console.log(this.state.temptIndex);
  };
  handleOnChangeInput = event => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  };
  onSelectTimeHandler = event => {
    let data = this.state.data;
    data.time = parseInt(event);
    this.setState({
      timeTitle: data.time
    });
  };
  onSelectQuestionTypeHandler = event => {
    var chooseType = parseInt(event);
    let title = "";
    if (chooseType === 1) title = "Single answer";
    else if (chooseType === 2) title = "Multi-select";
    else title = "Text answer";
    this.setState({
      questionType: {
        title: title,
        typeAnswer: chooseType,
        isChange: true
      },
      data: {
        ...this.state.data,
        type: chooseType
      }
    });
  };
  onChangeQuestionType = () => {
    this.setState({
      questionType: {
        ...this.state.questionType,
        isChange: false
      },
      temptCheck: {},
      checkOneRightAnswer: {
        index: -1,
        isCheck: 0
      }
    });
  };
  render() {
    let {
      isDisplay,
      questionsArr,
      answers,
      checkOneRightAnswer,
      timeTitle,
      questionType
    } = this.state;
    const { Option } = Select;
    let { index, data } = this.props;
    console.log("data", this.state.data);

    let list = typeof data === "undefined" ? questionsArr : answers;
    let element = list.map((data, index) => {
      return (
        <QuizCreatorQuestionInput
          key={data.index}
          index={index}
          handleOnclickDeleteOptions={this.handleOnclickDeleteOptions}
          onChangeAnswer={this.onChangeAnswer}
          data={data}
          questionType={questionType}
          checkOneRightAnswer={checkOneRightAnswer}
          checkOneRightAnswerHandler={this.checkOneRightAnswerHandler}
          onChangeQuestionType={this.onChangeQuestionType}
        />
      );
    });

    return (
      <div className="popup">
        <form onSubmit={this.onSubmitHandle}>
          <div className="popup_inner">
            <div className="popup-header">
              <p>
                <img
                  src={require("./images/question.png")}
                  alt="question"
                  placeholder={"Type your question here.."}
                />
                Question {index}
              </p>
              <div className="choose-question-types">
                <Select
                  defaultValue={
                    typeof data !== "undefined" ? `${data.type}` : `1`
                  }
                  onChange={this.onSelectQuestionTypeHandler}
                  style={{ width: 150 }}
                >
                  <Option key={1}>Single answer</Option>
                  <Option key={2}>Multi select</Option>
                  <Option key={3}>Text answer</Option>
                </Select>
              </div>

              <hr />
            </div>
            <div className="popup-body">
              <input
                type="text"
                style={{ width: "80%" }}
                name="question"
                placeholder="add question"
                value={this.state.data.question}
                onChange={this.handleOnChangeInput}
              />
              {questionType.typeAnswer !== 3 ? (
                <div>
                  {element}
                  <button
                    type="button"
                    style={{ display: isDisplay }}
                    onClick={this.addQuestionOnclick}
                  >
                    Add another option
                  </button>
                </div>
              ) : null}

              <hr />
            </div>
            <div className="popup-footer">
              <div className="question-time-container">
                <span>
                  <FontAwesomeIcon icon={faClock} color="gray" />
                </span>
                <div className="question-time">
                  <Select
                    defaultValue={`${timeTitle}`}
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

              <button
                className="b-cancel"
                type="button"
                onClick={() => {
                  this.props.closePopup();
                  listAns = [...listPrototype];
                }}
              >
                CANCEL
              </button>
              <button className="b-save" type="submit">
                <FontAwesomeIcon size="1x" icon={faSave} color="white" />
                <span>SAVE</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    createQuestionAndAnswersAPI: (question_table_id, data, answers) => {
      dispatch(
        actions.createQuestionAndAnswersAPI(question_table_id, data, answers)
      );
    },
    updateQuestionAndAnswersAPI: (data, answers, index) => {
      dispatch(actions.updateQuestionAndAnswersAPI(data, answers, index));
    }
  };
};
const mapStateToProps = state => {
  return {
    answer: state.answer,
    question: state.question
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionCreatePopup);
