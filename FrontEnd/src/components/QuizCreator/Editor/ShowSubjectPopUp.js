import React from "react";
import "./Editor.scss";
import { connect } from "react-redux";
import * as actions from "./../../../redux/actions/index";
class ShowSubjectPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      subjects: [],
      subject: {
        id: 0,
        title: ""
      }
    };
  }
  componentDidMount() {
    let { data } = this.props;
    this.props.showListSubject();
    this.setState({
      ...data
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      subjects: nextProps.subject.subjects
    });
  }
  onChangeHandler = event => {
    let { subjects } = this.state;
    let { name, value } = event.target;
    let tempt = 0;
    //set type = Integer
    if (event.target.type === "button") {
      tempt = parseInt(value);
      for (let i = 0; i < subjects.length; i++)
        if (subjects[i].id === tempt)
          this.setState({
            subject: subjects[i]
          });
    } else tempt = value;
    this.setState({
      [name]: tempt
    });
  };
  onSubmitHandler = event => {
    event.preventDefault();
    console.log(this.state);
    this.props.updateTable(this.state);
    this.props.closePopup();
  };

  render() {
    let { subjects, title, subject_id } = this.state;

    const element = subjects.map(subj => {
      return (
        //active-subject
        <div
          className={
            subject_id === subj.id ? "subject active-subject" : "subject"
          }
          key={subj.id}
        >
          <button
            type="button"
            name="subject_id"
            value={subj.id}
            onClick={this.onChangeHandler}
          >
            {subj.title}
          </button>
        </div>
      );
    });
    return (
      <div className="subject-popup-container">
        <div className="popup">
          <form onSubmit={this.onSubmitHandler}>
            <div className="popup_inner">
              <div className="popup-header">
                <p>
                  <img src={require("./images/grade.png")} alt="quiz-icon" />
                  Update quiz
                </p>
                <hr />
              </div>
              <div className="popup-body">
                <div className="init-quiz-name-quiz">
                  <p>1. Name the quiz </p>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div className="init-quiz-choose-subject">
                  <p>2. Choose the consistent subject</p>

                  <div className="subject-clouds">{element}</div>
                </div>
                {/* <p>sub id: {this.state.data.subject_id}</p> */}
                <hr />
              </div>
              <div className="popup-footer">
                <button
                  className="b-cancel"
                  type="button"
                  onClick={this.props.closePopup}
                >
                  Cancel
                </button>
                <button className="b-create" type="submit">
                  Update
                </button>
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
    showListSubject: () => {
      dispatch(actions.showListSubject());
    },
    updateTable: data => {
      dispatch(actions.updateTable(data));
    }
  };
};
const mapStateToProps = state => {
  return {
    questionTable: state.questionTable,
    subject: state.subject
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShowSubjectPopUp);
