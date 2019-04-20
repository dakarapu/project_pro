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
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  gridFields = () => {
    let list = [];
    let fields = {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      password: "Password",
      phone: "Phone"
    };
    for (let prop in fields) {
      // always use an array for a list of item to render
      // react supports only array of tiems but not regular way of appending as string
      list.push(
        <Grid item xs={12}>
          <TextField
            id={prop}
            label={fields[prop]}
            className={""}
            fullWidth={true}
            value={this.state[prop]}
            onChange={this.handleChange(prop)}
            margin="normal"
          />
        </Grid>
      );
    }
    return list;
  };

  render() {
    return (
      <div>
        <Grid container={true} spacing={24} wrap={"wrap"} justify={"center"}>
          <form id={"registerForm"}>
            {this.gridFields()}
            <Grid item xl={12}>
              <Button
                variant="contained"
                color="primary"
                disableRipple
                disabled={false}
              >
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
