import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserDataService from "../services/user.service";
import clsx from 'clsx';
import { styles } from "../css-common";
import { Avatar, Button, Typography, Container, Paper, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, withStyles } from '@material-ui/core';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = UserDataService.getCurrentUser()
      .then(response => {
          this.setState({
              currentUser: response.data
          });
          console.log(response.data);
      })
      .catch(e => {
          console.log(e);
      });

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const { currentUser } = this.state;
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <Container maxWidth="lg" className={classes.container}>
        {(this.state.userReady) ?
        <div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                User Profile
              </Typography>
              <Typography component="p">
                {currentUser.username}
              </Typography>
              <Typography component="p">
                {currentUser.email}
              </Typography>
              <Typography component="p">
                {currentUser.firstname} {currentUser.lastname}
              </Typography>
              <Typography component="p">
                {currentUser.department}
              </Typography>
              <Typography component="p">
                {currentUser.affiliation}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Edit Profile
            </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Team Member of
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>:
        null}
      </Container>
    );
  }
}

export default withStyles(styles)(Profile);
