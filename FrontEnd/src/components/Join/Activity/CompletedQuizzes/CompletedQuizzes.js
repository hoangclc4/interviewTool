import React from "react";
import "./CompletedQuizzes.scss";
import QuizThumbnail from "../../../../utils/QuizThumbnail/QuizThumbnail";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";

class CompletedQuizzes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    this.props.showListUserDoQuestionTable();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("completed", nextProps.completed);
    let { completedQuiz } = nextProps.completed;
    this.setState({
      data: completedQuiz
    });
  }

  render() {
    let { data } = this.state;
    let quizthumb = data.map((table, index) => {
      let userName = `${table.user.first_name} ${table.user.last_name}`;

      return (
        <QuizThumbnail
          key={index}
          data={table}
          isCompleted={true}
          userName={userName}
        />
      );
    });
    return (
      <div className="quiz-list">
        {quizthumb}
        {quizthumb.length === 0 ? <img style={{ width: '30%', margin: '30px auto' }} src={require("../images/no-quiz.png")} alt="no-quiz" /> : null}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    showListUserDoQuestionTable: () => {
      dispatch(actions.showListUserDoQuestionTable());
    }
  };
};
const mapStateToProps = state => {
  return {
    questionTable: state.questionTable,
    user: state.user,
    completed: state.completed
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CompletedQuizzes);
