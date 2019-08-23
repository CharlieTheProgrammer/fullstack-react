import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppIcon from "../assets/images/icon.svg";
import { styles } from "../assets/styles/styles";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {}
    };
  }

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({ loading: true });

    const newUser = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    return;

    axios
      .post("/login", newUser)
      .then(result => {
        console.log(result.data);
      })
      .catch(err => {
        console.log(err.data);
      })
      .finally(() => this.setState({ loading: false }));
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    const { loading, errors } = this.state;
    const { classes } = this.props; // This is being passed in by the HOC

    return (
      <div>
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <img src={AppIcon} alt="App Icon Bro" className={classes.image} />
            <Typography variant="h2" gutterBottom>
              Log In
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                className={classes.textField}
                id="email"
                name="email"
                type="email"
                label="Email"
                helperText={
                  errors.email ||
                  "We won't share your email address with any third parties."
                }
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                className={classes.textField}
                id="userHandle"
                name="userHandle"
                type="text"
                label="Social Handle"
                helperText={
                  errors.userHandle ||
                  "This will be the username everyone will see!"
                }
                value={this.state.userHandle}
                onChange={this.handleChange}
                fullWidth
              />

              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                m={4}
              >
                Log In
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>

              <br />
              <small>
                Forgot your password?{" "}
                <Link to="/password-reset-request">
                  Request a password reset.
                </Link>
              </small>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
