import React from "react";
import "./Nav.scss";
import history from "../../../history";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
class AdminNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="admin-nav">
        <div className="logo">
          <img
            src={require("../../../utils/images/logo.png")}
            alt="quiz-icon"
          />
        </div>
        <div className="admin-nav-btn">
          <button
            onClick={() => {
              history.push("/join");
            }}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
            Join a game
          </button>
        </div>
      </div>
    );
  }
}

export default AdminNav;
