import cartoon from "./cartoon.gif";
import React from "react";
import "./LoadingPage.scss";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";
class LoadingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getListQuestionTable();
    this.props.getListUserDoQuestionTable();
    this.props.getListTableBySubject();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    let { completed, user, subject } = nextProps;
    if (user.isDoneLoading)
      localStorage.setItem(
        "username",
        `${user[0].first_name} ${user[0].last_name}`
      );
    if (completed.isDoneLoading && user.isDoneLoading && subject.isDoneLoading)
      this.props.doneLoading();
  }
  render() {
    return (
      <div className="waiting">
        <header className="waiting-header">
          <img src={cartoon} className="waiting-logo" alt="logo" />
          <p>--Loading--</p>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    getListQuestionTable: () => {
      dispatch(actions.getListQuestionTable());
    },

    getListUserDoQuestionTable: () => {
      dispatch(actions.getListUserDoQuestionTable());
    },
    getListTableBySubject: () => {
      dispatch(actions.getListTableBySubject());
    }
  };
};
const mapStateToProps = state => {
  return {
    user: state.user,
    completed: state.completed,
    subject: state.subject
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage);
