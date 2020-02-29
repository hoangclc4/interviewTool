import React from "react";
import "./MyQuizzes.scss";

import MyQuizDetail from "./MyQuizDetail/MyQuizDetail";

import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
class MyQuizzes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question_tables: []
    };
  }

  componentDidMount() {
    this.props.getListQuestionTable();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.user[0]
    });
  }
  render() {
    let { question_tables } = this.state;
    let element = question_tables.map((data, index) => {
      return <MyQuizDetail key={index} data={data} index={index} />;
    });
    return (
      <div className="my-quizzes-container">
        <div className="my-quizzes-header">
          <div className="quizzes-count">All quizzes ({question_tables.length})</div>
        </div>
        <div className="all-my-quizzes-and-collections">
          <div className="all-my-quizzes-container">{element}</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    getListQuestionTable: () => {
      dispatch(actions.getListQuestionTable());
    }
  };
};
const mapStateToProps = state => {
  return {
    questionTable: state.questionTable,
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyQuizzes);
