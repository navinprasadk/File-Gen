import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Notfound from "./Components/NotFound/NotFound";
import JenkinsFileInitializer from "./Screens/LandingPage";
import JenkinsFileCreator from "./Screens/Home";
import history from "./history";

class App extends Component {
  render = () => {
    return (
      <Router history={history}>
        <Switch>
          {/* <Route path="/" component={Home} exact /> */}
          <Route path="/initJenkinsFile" component={JenkinsFileInitializer} />
          <Route path="/createJenkinsFile" component={JenkinsFileCreator} />
          <Route component={Notfound} />
        </Switch>
      </Router>
    );
  };
}

export default App;
