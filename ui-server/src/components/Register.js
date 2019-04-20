import React from "react";
//import ReactDOM from "react-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
    //this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
  }

  //   handleFirstNameChange(value) {
  //     this.setState({ firstName: value });
  //   }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <div>
        <Grid container spacing={24} wrap={"wrap"} justify={"center"}>
          <form>
            <Grid item xs={12}>
              <TextField
                id="firstName"
                label="First Name"
                className={""}
                value={this.state.firstName}
                onChange={this.handleChange("firstName")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="lastName"
                label="Last Name"
                className={""}
                value={this.state.lastName}
                onChange={this.handleChange("lastName")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                label="Email"
                className={""}
                value={this.state.email}
                onChange={this.handleChange("email")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                label="Password"
                className={""}
                value={this.state.password}
                onChange={this.handleChange("password")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="phone"
                label="Phone"
                className={""}
                value={this.state.phone}
                onChange={this.handleChange("phone")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" disableRipple>
                Register
              </Button>
            </Grid>
          </form>
        </Grid>
      </div>
    );
  }
}

export default Register;
