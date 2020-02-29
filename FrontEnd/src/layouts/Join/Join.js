import React from "react";
import "./Join.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import JoinNav from "../../components/Join/Nav/Nav";
import Activity from "../../components/Join/Activity/Activity";
import Join from "../../components/Join/Join";
import history from "../../history";
import LoadingPage from "../../utils/LoadingPage/LoadingPage";

class JoinLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadDataDone: false
    };
  }
  componentDidMount() {
    document.title = "Join a quiz"
  }
  doneLoading = () => {
    this.setState({
      isLoadDataDone: true
    });
  };
  render() {
    let { match } = this.props;
    let { isLoadDataDone } = this.state;
    if (!localStorage.getItem("token")) history.push("/");
    if (!isLoadDataDone) return <LoadingPage doneLoading={this.doneLoading} />;
    else
      return (
        <BrowserRouter>
          <div className="join-layout-container">
            <JoinNav />
            <br></br>
            <Switch>
              <Route exact path={`${match.url}`}>
                <Join match={match} />
              </Route>
              <Route
                path={`${match.url}/activity`}
                render={({ match }) => <Activity match={match} />}
              />
            </Switch>
          </div>
        </BrowserRouter>
      );
  }
}

export default JoinLayout;
