import React from "react";
//import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Course from "./Course";
import Home from "./Home";
import ls from "local-storage";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path={"/home"} component={Home} />
            <Route path={"/login"} component={Login} />
            <Route path={"/register"} component={Register} />
            <Route path={"/courses"} component={Course} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
