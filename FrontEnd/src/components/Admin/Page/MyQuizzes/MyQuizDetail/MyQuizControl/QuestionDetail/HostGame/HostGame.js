import React from "react";
import "./HostGame.scss";
import { Menu, Dropdown, Button, Icon } from "antd";
import "antd/dist/antd.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../../../../../../redux/actions/index";
class QuizControlHostGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null,
      title: "",
      questions: [],
      listDay: [
        {
          key: "",
          name: ""
        }
      ],
      selectDay: {
        key: "",
        name: ""
      },
      selectHour: "12",
      selectMinute: "00"
    };
  }
  componentDidMount() {
    let question_table_id = parseInt(this.props.match.params.question_table_id);
    this.props.showListQuestionAnswer(question_table_id);
    let listDay = this.getDay();
    this.setState({
      listDay: listDay,
      selectDay: listDay[1]
    });
  }
  onClickGenerateCodeHandler = () => {
    let question_table_id = parseInt(this.props.match.params.question_table_id);
    this.props.generateCode(question_table_id);
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.questionTable
    });
  }
  orderNumber = number => {
    switch (number) {
      case 1:
        return `${number}st`;
      case 2:
        return `${number}nd`;
      case 3:
        return `${number}rd`;
      default:
        return `${number}th`;
    }
  };
  getHour = () => {
    let listHour = [];
    for (let i = 1; i <= 24; i++) listHour.push(`${i}`);
    return listHour;
  };
  getDay = () => {
    const monthNames = [
      0,
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let select = [];
    let d = new Date();
    let begin = d.getDate();
    for (let i = begin; i < begin + 10; i++) {
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let daysInMonth = new Date(year, month, 0).getDate();
      if (i <= daysInMonth)
        select.push({
          key: `${monthNames[month]}-${this.orderNumber(i)}`,
          name: `${monthNames[month]} ${this.orderNumber(i)}`
        });
      else {
        let j = i - daysInMonth;
        if (month === 12) {
          year++;
          month = 1;
        } else month++;
        select.push({
          key: `${monthNames[month]}-${this.orderNumber(j)}`,
          name: `${monthNames[month]} ${this.orderNumber(j)}`
        });
      }
    }
    return select;
  };
  handleMenuDayClick = event => {
    let { listDay, selectDay } = this.state;
    let selectName = listDay.find(item => item.key === event.key).name;
    this.setState({
      selectDay: {
        ...selectDay,
        name: selectName
      }
    });
  };
  handleMenuHourClick = (event, listHour) => {
    let selectName = listHour.find(item => item === event.key);
    this.setState({
      selectHour: selectName
    });
  };
  handleMenuMinuteClick = (event, listMinute) => {
    let selectName = listMinute.find(item => item === event.key);
    this.setState({
      selectMinute: selectName
    });
  };
  render() {
    let {
      code,
      selectDay,
      listDay,
      selectHour,
      selectMinute,
      title,
      questions
    } = this.state;
    let listHour = this.getHour();
    let listMinute = ["00", "15", "30", "45"];
    let day = (
      <Menu onClick={this.handleMenuDayClick}>
        {listDay.map(item => {
          return <Menu.Item key={item.key}>{item.name}</Menu.Item>;
        })}
      </Menu>
    );
    const hour = (
      <Menu onClick={event => this.handleMenuHourClick(event, listHour)}>
        {listHour.map(hour => {
          return <Menu.Item key={hour}>{hour}</Menu.Item>;
        })}
      </Menu>
    );
    const minute = (
      <Menu onClick={event => this.handleMenuMinuteClick(event, listMinute)}>
        {listMinute.map(minute => {
          return <Menu.Item key={minute}>{minute}</Menu.Item>;
        })}
      </Menu>
    );
    return (
      <div className="quiz-control-host-game-container">
        <div className="quiz-name">{title}</div>
        <div className="quiz-num">{questions.length} questions</div>
        <div className="quiz-step-text">
          Students should complete the quiz by:
        </div>
        <div className="quiz-end-day">
          <Dropdown overlay={day} trigger={["click"]}>
            <Button>
              <Icon type="calendar" /> {selectDay.name} <Icon type="down" />
            </Button>
          </Dropdown>
        </div>

        <div className="quiz-end-hour-minute">
          <div className="hour">
            <Dropdown overlay={hour} trigger={["click"]}>
              <Button style={{ width: '100px' }}>
                {selectHour} <Icon type="down" />
              </Button>
            </Dropdown>
          </div>
          <div className="minute">
            <Dropdown overlay={minute} trigger={["click"]}>
              <Button style={{ width: '100px' }}>
                {selectMinute} <Icon type="down" />
              </Button>
            </Dropdown>
          </div>
        </div>

        <div className="quiz-time-left">
          <span>1</span> day, <span>1</span> hour, <span>1</span> minute from
          now
        </div>

        <div className="quiz-hosting-btn">
          <button onClick={this.onClickGenerateCodeHandler}>Host Game</button>
        </div>

        <div className="generated-code-container">
          {code !== null ? code : "------"}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    generateCode: question_table_id => {
      dispatch(actions.generateCode(question_table_id));
    },
    showListQuestionAnswer: question_table_id => {
      dispatch(actions.showListQuestionAnswer(question_table_id));
    }
  };
};
const mapStateToProps = state => {
  return {
    questionTable: state.questionTable,
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(QuizControlHostGame));
