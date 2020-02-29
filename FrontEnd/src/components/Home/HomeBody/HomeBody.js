import React from "react";
import "./HomeBody.scss";

class HomeBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="home-container">
        <video className="video-intro" src={require("../images/outlanders_header.webm")} autoPlay={true} loop={true}></video>
      </div>
    );
  }
}

export default HomeBody;
