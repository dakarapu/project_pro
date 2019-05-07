import React from "react";
import "./styles/login.css";
import AuthenticateUser from "./apiClient/authenticateUserClient";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import ls from "local-storage";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    console.log(this.state);
    try {
      let res = await AuthenticateUser(this.state);
      console.log("Login server Response: ", res);
      ls("x-auth-token", res.headers["x-auth-token"]);
      window.location.reload();
      return;
      //console.log("Success response from Server: ", ls.get("x-auth-token"));
      //return <Redirect to={"/courses"} />;
      //return res;
    } catch (e) {
      console.log("Error resposne from Server", e.name);
      return e;
    }
  };

  generateFormItems() {
    let items = [];
    this.list = {
      email: "Email",
      password: "Password"
    };
    for (let prop in this.list) {
      if (prop !== "role") {
        items.push(
          <div className={"field"} key={this.list[prop]}>
            <input
              type={this.list[prop] === "Password" ? "password" : "text"}
              value={this.state[prop]}
              onChange={this.handleChange}
              name={prop}
              placeholder={this.list[prop]}
            />
          </div>
        );
      }
    }
    return items;
  }

  render() {
    return (
      <div className={"login page"}>
        <div class="ui container segment login">
          <h3 class="ui header">Log In to Your Portal Account!</h3>
          <div class="line" />
          <form className={"ui form"} onSubmit={this.handleFormSubmit}>
            {this.generateFormItems()}
            <button className={"ui button"} type={"submit"}>
              Login
            </button>
            <span className={"login forgot password span"}>
              {ls.get("x-auth-token") ? <Redirect to="/courses" /> : null}
              or
              <Link to={"/register"}> Forgot Password</Link>
            </span>
          </form>
          <span className={"login signup span"}>
            {ls.get("x-auth-token") ? <Redirect to="/courses" /> : null}
            Don't have an account?
            <Link to={"/register"}> Sign up</Link>
          </span>
        </div>
      </div>
    );
  }
}

export default Register;
