import React from "react";
import history from "../../../history";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
import "./Nav.scss";
import LoginPopup from "../LoginPopup/LoginPopup";
import SignupPopup from '../SignupPopup/SignupPopup'
class HomeNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      checkLogin: false,
      showSignup: false,
    };
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  toggleSignupPopup = () => {
    this.setState({
      showSignup: !this.state.showSignup
    });
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      checkLogin: nextProps.login.checkLogin,
      token: nextProps.login.token
    });
    console.log(nextProps);
  }
  render() {
    if (this.state.checkLogin || localStorage.getItem("token")) {
      history.push("/join");
    }
    return (
      <div className="home-nav-container">
        <div className="logo">
          <img className="big-logo"
            src={require("../../../utils/images/logo.png")}
            alt="quiz-icon"
          />
        </div>
        <div className="button-group">
          <button className="b-log-in" onClick={this.togglePopup}>
            Login
          </button>
          <button className="b-sign-up" onClick={this.toggleSignupPopup}>Sign up</button>
        </div>

        {this.state.showPopup ? (
          <LoginPopup togglePopup={this.togglePopup} />
        ) : null}

        {this.state.showSignup ? (
          <SignupPopup togglePopup={this.toggleSignupPopup} />
        ) : null}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    loginAPI: state => {
      dispatch(actions.loginAPI(state));
    }
  };
};
const mapStateToProps = state => {
  return {
    login: state.login
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeNav);
