import React from "react";
import "./Page.scss";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faSearch,
  faFileAlt,
  faChartBar,
  faFolder,
  faUserAlt,
  faCogs,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import MyQuizzes from './MyQuizzes/MyQuizzes';
import MyQuizControl from './MyQuizzes/MyQuizDetail/MyQuizControl/MyQuizControl';
import QuizControlHostGame from './MyQuizzes/MyQuizDetail/MyQuizControl/QuestionDetail/HostGame/HostGame'
import AdminFind from '../Page/Find/Find';

//import history from "../../../history";
class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="admin-page-container">
        <BrowserRouter>
          <div className="admin-control-container">
            <div className="admin-name-and-ava">
              <div className="admin-ava">
                <img alt="adminava" src={require("../../../utils/QuizThumbnail/images/ava.png")} />
              </div>
              <div className="admin-name">
                Minh Tri
                            <button className="admin-profile">
                  View Profile
                            </button>
              </div>
            </div>
            <div className="admin-create-new-quiz">
              <button>
                <span>
                  <FontAwesomeIcon icon={faPlusCircle} />
                </span>
                Create new quiz
                        </button>
            </div>
            <div className="admin-find-quiz">
              <NavLink className="btn-admin-find-quiz" exact to="/admin" activeStyle={{ borderLeft: '4px solid #fd7e14', fontWeight: 'bold' }} activeClassName="admin-active-tab">
                <span>
                  <FontAwesomeIcon icon={faSearch} size="lg" />
                </span>
                Find a quiz
                        </NavLink>
            </div>
            <div className="admin-my-quizzes" >
              <NavLink className="btn-admin-find-quiz" to="/admin/myquizzes" activeStyle={{ borderLeft: '4px solid #fd7e14', fontWeight: 'bold' }} activeClassName="admin-active-tab">
                <span>
                  <FontAwesomeIcon icon={faFileAlt} size="lg" />
                </span>
                My quizzes
                        </NavLink>
            </div>
            <div className="admin-reports">
              <NavLink className="btn-admin-find-quiz" to="_blank" >
                <span>
                  <FontAwesomeIcon icon={faChartBar} size="lg" />
                </span>
                Reports
                        </NavLink>
            </div>
            <div className="admin-collections">
              <NavLink className="btn-admin-find-quiz" to="_blank">
                <span>
                  <FontAwesomeIcon icon={faFolder} size="lg" />
                </span>
                Collections
                        </NavLink>
            </div>
            <hr />
            <div className="admin-profile">
              <NavLink className="btn-admin-find-quiz" to="_blank">
                <span>
                  <FontAwesomeIcon icon={faUserAlt} size="lg" />
                </span>
                Profile
                        </NavLink>
            </div>
            <div className="admin-settings">
              <NavLink className="btn-admin-find-quiz" to="_blank">
                <span>
                  <FontAwesomeIcon icon={faCogs} size="lg" />
                </span>
                Settings
                        </NavLink>
            </div>
            <div className="admin-log-out">
              <NavLink className="btn-admin-find-quiz" to="_blank">
                <span>
                  <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                </span>
                Log out
                        </NavLink>
            </div>
          </div>
          <div className="admin-tab-select-container">
            <Switch>
              <Route exact path="/admin/myquizzes" render={({ match }) => <MyQuizzes match={match} />} />
              <Route exact
                path="/admin/:question_table_id"
                component={MyQuizControl}
              />

              <Route
                path="/admin/quiz/homework/:question_table_id"
                component={QuizControlHostGame}
              />
              <Route exact path="/admin/" render={({ match }) => <AdminFind match={match} />} />

            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default AdminPage;
