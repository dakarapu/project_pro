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

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="/login" component={Login} />
            <Route path={"/register"} component={Register} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
