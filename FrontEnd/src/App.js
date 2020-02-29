import React from "react";
//import Create from './layouts/Quiz/Create/Create';
import "./App.scss";
import QuizCreator from "./layouts/Quiz/QuizCreator/QuizCreator";
import QuizCreateModal from "./layouts/Quiz/QuizCreateModal/QuizCreateModal";

import DoQuiz from "./layouts/DoQuiz/DoQuiz";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import Join from "./layouts/Join/Join";
import Home from "./layouts/Home/Home";
import PreGame from "./components/PreGame/PreGame";
import ReviewAttempt from "./components/PreGame/QuizAttempt/ReviewAttempt/ReviewAttempt";
import AdminLayout from "./layouts/Admin/Admin";
import QuizStart from "./components/Join/QuizStart/QuizStart";
import UserSettings from './components/Join/UserSettings/Settings'

import RecruitSignup from './components/Recruit/Recruit'
class App extends React.Component {
  render() {
    return (
      <div className="page-container">
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/quiz/:question_table_id"
              render={({ match }) => <QuizCreator match={match} />}
            />

            <Route
              exact
              path="/join"
              render={({ match }) => <Join match={match} />}
            />

            <Route
              exact
              path="/admin/quiz/:admin"
              render={({ match }) => <QuizCreateModal match={match} />}
            />
            <Route
              exact
              path="/admin"
              render={({ match }) => <AdminLayout match={match} />}
            />

            <Route
              path="/join/game/:question_table_id"
              render={({ match }) => <DoQuiz match={match} />}
            />

            <Route
              path="/join/:question_table_id/start"
              render={({ match }) => <QuizStart match={match} />}
            />

            <Route
              exact
              path="/join/pre-game/:question_table_id"
              render={({ match }) => <PreGame match={match} />}
            />
            <Route
              path="/join/pre-game/:question_table_id/review"
              render={({ match }) => <ReviewAttempt match={match} />}
            />

            <Route
              path="/join/settings"
              render={({ match }) => <UserSettings match={match} />}
            />

            {/* <Route
              path="/signup"
              component = {SignUp}
            /> */}

            <Route
              path="/recruit_signup"
              render={({ match }) => <RecruitSignup match={match} />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
