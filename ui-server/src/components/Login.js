import React from "react";
import "./styles/register.css";
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
      <div>
        <form
          className={"ui form registerForm"}
          onSubmit={this.handleFormSubmit}
        >
          {this.generateFormItems()}
          <button className={"ui button registerFormButton"} type={"submit"}>
            Login
          </button>
        </form>
        {ls.get("x-auth-token") ? <Redirect to="/courses" /> : null}
        <Link to={"/register"}>Register</Link>
      </div>
    );
  }
}

export default Register;
