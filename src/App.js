import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { styles } from "./css-common"
import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";

import AddUser from "./components/users-add.component";
import User from "./components/users-edit.component";
import UsersList from "./components/users-list.component";
import UploadFiles from "./components/upload-files.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    const { classes } = this.props

    return (
      <div>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
          <Link to={"/"} className={classes.link}>
            <Typography className={classes.name} variant="h6">
                Ulake
            </Typography>
          </Link>

          <Link to={"/home"} className={classes.link}>
            <Typography className={classes.name} >
                Home
            </Typography>
          </Link>
          {showAdminBoard && (
            <Link to={"/users"} className={classes.link}>
              <Typography className={classes.name}>
              Users
              </Typography>
            </Link>
          )}
          {showAdminBoard && (
            <Link to={"/add"} className={classes.link}>
              <Typography className={classes.name}>
              Add User
              </Typography>
            </Link>
          )}

          {currentUser && (
            <Link to={"/add-files"} className={classes.link}>
              <Typography className={classes.name}>
              Add File
              </Typography>
            </Link>
          )}

          {currentUser ? (
            <Toolbar>
            <Link to={"/profile"} className={classes.link}>
              <Typography className={classes.name}>
              {currentUser.username}
              </Typography>
            </Link>

            <Link to={"/login"} className={classes.link} onClick={this.logOut}>
              <Typography className={classes.name}>
                Log Out
              </Typography>
            </Link>
            </Toolbar>
          ) : (
            <Toolbar>
              <Link to={"/login"} className={classes.link}>
                <Typography className={classes.name}>
                  Login
                </Typography>
              </Link>
              <Link to={"/register"} className={classes.link}>
                <Typography className={classes.name}>
                  Register
                </Typography>
              </Link>
            </Toolbar>
          )}
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/users" component={UsersList} />
          <Route exact path="/add" component={AddUser} />
          <Route path="/users/:id" component={User} />
          <Route exact path="/add-files" component={UploadFiles} />
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(App);
