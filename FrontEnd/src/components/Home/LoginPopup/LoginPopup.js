import React from "react";
import "./LoginPopup.scss";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
import { Link } from "react-router-dom";

class LoginPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      isDisplay: "block",
      checkLogin: false,
      token: ""
    };
  }
  onSubmitHandler = event => {
    event.preventDefault();
    this.setState({
      isLoading: true
    });
    this.props.loginAPI(this.state);
  };
  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      isLoading: nextProps.login.isLoading
    });
    console.log(nextProps);
  }
  render() {
    let { email, password, isLoading } = this.state;

    return (
      <div className="login-popup">
        <div className="login-popup_inner">
          <form onSubmit={this.onSubmitHandler} className="form-info">
            <div className="login-popup-header">
              <p>LOGIN</p>
            </div>
            <div className="login-popup-body">
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>
            <div className="login-popup-footer">
              <div className="form-field">
                <div className="button-group">
                  <button type="submit" className="btn-login">
                    <div
                      className={isLoading ? "fa fa-spinner fa-spin" : ""}
                    ></div>
                    LOGIN
                </button>


                  <button
                    className="b-close"
                    type="button"
                    onClick={this.props.togglePopup}
                  >
                    Close
                </button>
                </div>
              </div>
              <div className="create-new-acc">
                <Link to="/signup" className="link">
                  Create an account
                </Link>
              </div>
            </div>
          </form>
        </div>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPopup);
