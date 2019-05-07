import React from "react";
import "./styles/register.css";
import CreateUser from "./apiClient/userClient";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      role: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    console.log(this.state);
    try {
      let res = await CreateUser(this.state);
      console.log("Success response from Server: ", res);
      return res;
    } catch (e) {
      console.log("Error resposne from Server", e.name);
      return e;
    }
  };

  generateFormItems() {
    let items = [];
    this.list = {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      password: "Password",
      phone: "Phone",
      role: "Role"
    };
    for (let prop in this.list) {
      if (prop !== "role") {
        items.push(
          <div className={"field"} key={this.list[prop]}>
            {/* <label>{this.list[prop]}</label> */}
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
      <div className={"register page"}>
        <div class="ui container segment register">
          <h3 class="ui header">Register</h3>
          <div class="line" />
          <form className={"ui form"} onSubmit={this.handleFormSubmit}>
            {this.generateFormItems()}
            <button className={"ui button"} type={"submit"}>
              Register
            </button>
          </form>
          <span className={"login signup span"}>
            Already have an account?
            <Link to={"/login"}> Sign In</Link>
          </span>
        </div>
      </div>
    );
  }
}

export default Register;
