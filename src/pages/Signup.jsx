import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppIcon from "../assets/images/icon.svg";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  form: {
    textAlign: "center"
  },
  image: {
    height: "80px",
    width: "80px",
    margin: "20px auto 20px auto"
  },
  button: {
    margin: "1.75rem 0"
  },
  textField: {
    margin: ".5rem 0"
  },
  progress: {
    position: "fixed"
  }
};

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      userHandle: "",
      password: "",
      confirmPassword: "",
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
      .post("/user", newUser)
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
              Sign Up
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
              <TextField
                className={classes.textField}
                id="password"
                name="password"
                type="password"
                label="Password"
                errors={errors.password}
                helperText={errors.password || "Enter something safe."}
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                className={classes.textField}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                helperText={errors.confirmPassword || "Enter something safe."}
                value={this.state.confirmPassword}
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
                Sign up
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>

              <br />
              <small>
                Alreacy have an account? Login <Link to="/login">here</Link>
              </small>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Signup);
