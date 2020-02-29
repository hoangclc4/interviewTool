import React from "react";
import "./Nav.scss";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faSearch,
  faHome,
  faHistory
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Menu, Dropdown, Button, Icon } from "antd";
import history from "../../../history";

class JoinNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenUserActions: false,
      myWidth: 0,
    };

    window.addEventListener("resize", this.updateWidth);
  }
  // componentDidMount() {
  //   //get data API from backend

  // }

  componentDidMount() {
    this.updateWidth();
  }


  userActionsHandleClick = () => {
    this.setState({
      isOpenUserActions: true
    });
  }
  onLogoutHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then(result => {
      if (result.value) {
        localStorage.clear();
        history.push("/");
      }
    });
  };

  updateWidth = () => {
    this.setState({
      myWidth: window.innerWidth,
    });
  };
  render() {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username");



    let { myWidth } = this.state;
    const userActions = (
      <Menu style={{ padding: "5px 0px", width: "fit-content" }}>
        <Menu.Item style={{ borderBottom: "1px solid #e6e6e6" }}>
          <div target="_blank" rel="noopener noreferrer">
            {username}
          </div>
        </Menu.Item>
        <Menu.Item>
          <div
            onClick={() => {
              history.push("/admin");
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Icon type="setting" style={{ marginRight: "10px" }}></Icon>Manage
          </div>
        </Menu.Item>
        <Menu.Item>
          <div
            onClick={this.onLogoutHandler}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Icon type="logout" style={{ marginRight: "10px" }}></Icon>Log out
          </div>
        </Menu.Item>
      </Menu>
    );


    // console.log(myWidth);
    return (
      <div className="join-nav-container">
        <div className="logo">
          <img className="big-logo"
            src={require("../../../utils/images/logo.png")}
            alt="quiz-icon"

            style={myWidth <= 600 ? { display: 'none' } : { display: 'block' }}
          />

          <img className="small-logo"
            src={require("../../../utils/images/icon.png")}
            alt="sm-icon"
            style={myWidth <= 600 ? { display: 'block', marginLeft: '3px' } : { display: 'none' }}
          />
        </div>

        <div className="input-field">
          <input placeholder="Search for a quiz" />
          <div className="search-icon">
            <FontAwesomeIcon icon={faSearch} size="lg" color="gray" />
          </div>
        </div>

        <div className="tab-field">
          <div className="tab-link">
            <NavLink exact to="/join" activeClassName="active-link">
              <span>
                <FontAwesomeIcon icon={faHome} />
              </span>
              <span className="tab-name"> Home</span>
            </NavLink>
          </div>
          <div className="tab-link">
            <NavLink to="/join/activity" activeClassName="active-link">
              <span>
                <FontAwesomeIcon icon={faHistory} />
              </span>

              <span className="tab-name"> Activity</span>
            </NavLink>
          </div>
        </div>

        <div className="button-group">
          <button
            className="b-sign-up"
            onClick={() => history.push(`/admin/quiz/${token}`)}
          >
            <FontAwesomeIcon icon={faPlusCircle} /> Create new Quiz
          </button>
          <Dropdown
            overlay={userActions}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Button style={{ top: 0 }}>
              <Icon
                style={{ fontSize: "14px" }}
                type={this.state.isOpenUserActions ? "close" : "menu"}
              ></Icon>
            </Button>
          </Dropdown>
        </div>
        <br />
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
    }
  };
};
const mapStateToProps = state => {
  return {
    questionTable: state.questionTable,
    user: state.user
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(JoinNav);
