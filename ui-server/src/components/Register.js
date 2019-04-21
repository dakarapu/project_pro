import React from "react";
//import ReactDOM from "react-dom";
// import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import FormLabel from "@material-ui/core/FormLabel";
import "./styles/register.css";
import CreateUser from "./apiClient/createUserClient";

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
    try {
      console.log(this.state);
      let res = await CreateUser(this.state);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <div>
        <form
          className={"ui form registerForm"}
          onSubmit={this.handleFormSubmit}
        >
          <div className={"field focus"}>
            <label>First Name</label>
            <input
              type={"text"}
              value={this.state.firstName}
              onChange={this.handleChange}
              name={"firstName"}
              placeholder={"First Name"}
            />
          </div>
          <div className={"field"}>
            <label>Last Name</label>
            <input
              type={"text"}
              value={this.state.lastName}
              onChange={this.handleChange}
              name={"lastName"}
              placeholder={"Last Name"}
            />
          </div>

          <div className={"field"}>
            <label>Email</label>
            <input
              type={"text"}
              value={this.state.email}
              onChange={this.handleChange}
              name={"email"}
              placeholder={"Email"}
            />
          </div>
          <div className={"field"}>
            <label>Password</label>
            <input
              type={"password"}
              value={this.state.password}
              onChange={this.handleChange}
              name={"password"}
              placeholder={"Password"}
            />
          </div>
          <div className={"field"}>
            <label>Phone</label>
            <input
              type={"text"}
              value={this.state.phone}
              onChange={this.handleChange}
              name={"phone"}
              placeholder={"Phone"}
            />
          </div>
          <button className={"ui button"} type={"submit"}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
