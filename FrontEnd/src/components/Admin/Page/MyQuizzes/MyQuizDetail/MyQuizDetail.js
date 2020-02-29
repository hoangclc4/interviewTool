import React from "react";
import "./MyQuizDetail.scss";
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faBook } from "@fortawesome/free-solid-svg-icons";
class MyQuizDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grade_begin: 0,
      grade_end: 0,
      id: 0,
      image: "",
      is_finish: 0,
      is_public: 1,
      level: 0,
      played: 0,
      title: "DOTA",
      questions: []
    };
  }
  componentDidMount() {
    let { data } = this.props;
    this.setState({
      ...data
    });
  }
  suffix = value => {
    switch (value) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  gradeTitlePart = grade => {
    let title = "";
    let suffix = this.suffix(grade);
    if (grade === null) title = null;
    if (grade < 13) title = `${grade}${suffix}`;
    else if (grade === 13) return "University";
    if (grade === 14) return "Professional Development";
    return title;
  };
  gradeTitle = () => {
    let { grade_begin, grade_end } = this.state;
    let gradeBeginTitle = this.gradeTitlePart(grade_begin);
    let gradeEndTitle = this.gradeTitlePart(grade_end);
    let gradeTitle = "";
    if (grade_begin === null) gradeTitle = "N/A";
    else if (grade_begin === grade_end) {
      if (grade_begin < 13) gradeTitle = `${gradeBeginTitle} grade`;
      else gradeTitle = gradeBeginTitle;
    } else {
      if (grade_begin < 13) {
        gradeTitle = `${gradeBeginTitle} - ${gradeEndTitle} grade`;
        if (grade_end > 12)
          gradeTitle = `${gradeBeginTitle} - ${gradeEndTitle}`;
      } else gradeTitle = `${gradeBeginTitle} - ${gradeEndTitle}`;
    }
    return gradeTitle;
  };
  render() {
    let { title, image, played, id, questions, is_finish } = this.state;
    let { history } = this.props;
    let gradeTitle = this.gradeTitle();
    return (
      <div
        className="my-quiz-detail-container"
        onClick={() => {
          localStorage.setItem("gradeTitle", gradeTitle);
          history.push(`/admin/${id}`);
        }}
      >
        <div className="my-quiz-image">
          <img
            alt="myquizimg"
            src={
              image !== null
                ? image
                : require("../../../../../utils/QuizThumbnail/images/thumbnail.jpg")
            }
          />
        </div>

        <div className="my-quiz-info">
          <div className="name-and-status">
            <div className="name">
              {title}
              <span>({questions.length} Qs)</span>
            </div>
            {!is_finish ? <div className="is-drafting">Draft</div> : null}
          </div>
          <div className="play-detail">
            <div className="play">
              <span>
                <FontAwesomeIcon icon={faPlay} color="#6B7C93" />
              </span>
              Played {played} times
            </div>
            <div className="grade">
              <span>
                <FontAwesomeIcon icon={faBook} color="#6B7C93" />
              </span>
              {gradeTitle}
            </div>
          </div>
          <div className="quiz-action"></div>
        </div>
      </div>
    );
  }
}

export default withRouter(MyQuizDetail);
