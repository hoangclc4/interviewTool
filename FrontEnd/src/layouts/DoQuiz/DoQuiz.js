import React from "react";
import "./DoQuiz.scss";
import DoingQuiz from "../../components/DoingQuiz/DoingQuiz";
class DoQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = "Join a quiz"
  }
  render() {
    return (
      <div className="do-quiz-container">
        <div className="question-show-field">
          <DoingQuiz match={this.props.match} />
        </div>
      </div>
    );
  }
}

export default DoQuiz;
