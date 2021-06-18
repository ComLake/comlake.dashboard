import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";

import "./App.css";
import { styles } from "./css-common"
import { AppBar, Toolbar, List, ListItem, ListItemIcon, Button, ListItemText, Divider, Typography, IconButton, Drawer, Menu, MenuItem, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FolderIcon from '@material-ui/icons/Folder';

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";

import AddUser from "./components/users-add.component";
import User from "./components/users-edit.component";
import UsersList from "./components/users-list.component";

import AddGroup from "./components/groups-add.component";
import GroupsList from "./components/groups-list.component";

import UploadFiles from "./components/upload-files.component";

function PrivateRoute ({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      authenticated: false,
      isAdmin: false,
      currentUser: undefined,
      open: false,
      setOpen: false,
      anchorEl: null,
    };
  }

  componentDidMount() {
    const user = AuthService.getJwtResponse();

    if (user) {
      this.setState({
        currentUser: user,
        isAdmin: user.roles.includes("ROLE_ADMIN"),
        authenticated: true,
      });
    }

    const expirationTime = localStorage.getItem('expirationTime');
    if (Date.now() >= expirationTime) {
      this.logOut();
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      authenticated: false
    });
  }

  handleDrawerOpen() {
    this.setState({
      open: true
    });
  };

  handleDrawerClose() {
    this.setState({
      open: false
    });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { currentUser, isAdmin, anchorEl, open, authenticated } = this.state;
    const openMenu = Boolean(anchorEl);
    const { classes } = this.props;

    return (
      <div>
      {authenticated ? (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar className={classes.appBar} position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} noWrap>
              Dashboard
            </Typography>
            <IconButton
              aria-owns={openMenu ? 'menu-appbar' : null}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={openMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              onClose={this.handleClose}
            >
              <MenuItem component={Link} to="/profile" onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem component={Link} to="/login" onClick={this.logOut}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {isAdmin && (
            <ListItem button key="Users" component={Link} to="/users">
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            )}
          </List>
          <Divider />
          <List>
            <ListItem button key="Groups" component={Link} to="/groups">
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItem>
            <ListItem button key="Files" component={Link} to="/add-files">
              <ListItemIcon><FileCopyIcon /></ListItemIcon>
              <ListItemText primary="Files" />
            </ListItem>
            <ListItem button key="Folders" component={Link} to="/">
              <ListItemIcon><FolderIcon /></ListItemIcon>
              <ListItemText primary="Folders" />
            </ListItem>
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <PrivateRoute authenticated={this.state.authenticated}
              exact path='/register' component={Register} />
            <PrivateRoute authenticated={this.state.authenticated}
              exact path='/profile' component={Profile} />
            <PrivateRoute authenticated={this.state.authenticated}
              exact path='/users' component={UsersList} />
            <PrivateRoute authenticated={this.state.authenticated}
              exact path='/add-users' component={AddUser} />
            <PrivateRoute authenticated={this.state.authenticated}
              path='/users/:id' component={User} />
            <PrivateRoute authenticated={this.state.authenticated}
                exact path='/groups' component={GroupsList} />
            <PrivateRoute authenticated={this.state.authenticated}
              exact path='/add-groups' component={AddGroup} />
            <PrivateRoute authenticated={this.state.authenticated}
              exact path={['/','/add-files']} component={UploadFiles} />
          </Switch>
        </main>
      </div>
    ) : (
      <div>
            <Route exact path="/login" component={Login} />
      </div>
    )}
    </div>
    );
  }
}

export default withStyles(styles)(App);
