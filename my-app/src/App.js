import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import Notfound from './Components/NotFound/NotFound';
import LandingPage from './Screens/LandingPage';
import Create from  './Screens/Home';
import history from "./history";


class App extends Component {
  render = () => {
    return (
      <Router history={history}>
        <Switch>
          {/* <Route path="/" component={Home} exact /> */}
          <Route path="/landing" component={LandingPage}/>
          <Route path="/create" component={Create}/>
          <Route component={Notfound} />

        </Switch>
      </Router>
    );
  }
}

export default App;

