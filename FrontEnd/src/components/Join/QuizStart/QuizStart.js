import React from "react";
import history from "../../../history";
import "./QuizStart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
class QuizStart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      questions: []
    };
  }
  componentDidMount() {
    let question_table_id = parseInt(this.props.match.params.question_table_id);
    this.props.showListQuestionAnswer(question_table_id);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.questionTable
    });
  }
  render() {
    let question_table_id = this.props.match.params.question_table_id;
    let { title, questions } = this.state;
    return (
      <div className="quiz-start-container">
        <div className="quiz-start-nav">
          <button onClick={() => history.push(`/join`)}>
            <span>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </button>
        </div>
        <div className="quiz-start-show-container">
          <div className="quiz-basic-info-and-start-btn">
            <div className="quiz-basic-info-container">
              <div className="quiz-basic-info">
                <img
                  className="quiz-image-md"
                  alt="QuizImageSmall"
                  src={require("./images/thumbnail.jpg")}
                />
                <div className="quiz-title-and-number">
                  <div className="quiz-title">{title}</div>
                  <div className="quiz-number-ques">
                    {questions.length} questions
                  </div>
                </div>
              </div>
              <button
                onClick={() => history.push(`/join/game/${question_table_id}`)}
              >
                Start Game
              </button>
            </div>
            <img style={{ width: '550px' }} src={require("../../PreGame/images/no-settings.png")} alt="no-settings" />
            <h3 style={{ textAlign: 'center', color: 'white' }}>Setting comming soon</h3>
          </div>
        </div>
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
    questionTable: state.questionTable
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(QuizStart);
