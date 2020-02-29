import React from "react";
import "./PreGame.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import history from "../../history";
import QuizAttempt from "./QuizAttempt/QuizAttempt";
class PreGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    let question_table_id = this.props.match.params.question_table_id;
    this.props.getListUserAttempt(question_table_id);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    this.setState({
      data: nextProps.attempt
    });
  }
  render() {
    let { data } = this.state;
    let question_table_id = this.props.match.params.question_table_id;

    let quizAttemptElm = data.map((attempt, index) => {
      return <QuizAttempt key={index} data={attempt} index={index} />;
    });
    return (
      <div className="pre-game-container">
        <div className="pre-game-nav">
          <button onClick={() => history.push(`/join`)}>
            <span>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </button>
        </div>
        <div className="pre-game-show-container">
          <div className="quiz-info-done">
            <div className="quiz-basic-info-container">
              <div className="quiz-basic-info">
                <img
                  className="quiz-image-sm"
                  alt="QuizImageSmall"
                  src={require("./images/thumbnail.jpg")}
                />
                <div className="quiz-title-and-number">
                  <div className="quiz-title">basic english</div>
                  <div className="quiz-number-ques">5 questions</div>
                </div>
              </div>
            </div>

            <div className="attempt-group-container">{quizAttemptElm}</div>
          </div>
          <div className="player-config">
            <div className="practice-btn-group">
              <button
                onClick={() => history.push(`/join/game/${question_table_id}`)}
              >
                Play
              </button>
            </div>
            <img style={{ width: '100%', margin: '30px auto' }} src={require("./images/no-settings.png")} alt="no-settings" />
            <h3 style={{ textAlign: 'center', color: 'white' }}>Setting comming soon</h3>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    getListUserAttempt: question_table_id => {
      dispatch(actions.getListUserAttempt(question_table_id));
    }
  };
};
const mapStateToProps = state => {
  return {
    attempt: state.attempt
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PreGame);
