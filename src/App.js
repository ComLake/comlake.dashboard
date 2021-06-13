import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import "./App.css";
import { styles } from "./css-common"
import { AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, IconButton, Drawer, Menu, MenuItem, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FolderIcon from '@material-ui/icons/Folder';

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
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      showAdmin: false,
      currentUser: undefined,
      open: false,
      setOpen: false,
      anchorEl: null,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdmin: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
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
    const { currentUser, showAdmin, anchorEl, open } = this.state;
    const openMenu = Boolean(anchorEl);
    const { classes } = this.props;

    return (
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
              Ulake
            </Typography>
            {currentUser && (
            <div>
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
            </div>
            )}

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
            {showAdmin && (
            <ListItem button key="Users" component={Link} to="/users">
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            )}
            <ListItem button key="Groups" component={Link} to="/">
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItem>
            <ListItem button key="Files" component={Link} to="/add-files">
              <ListItemIcon><FileCopyIcon /></ListItemIcon>
              <ListItemText primary="Files" />
            </ListItem>
            <ListItem button key="Folders" component={Link} to="/files">
              <ListItemIcon><FolderIcon /></ListItemIcon>
              <ListItemText primary="Folders" />
            </ListItem>
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
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
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);
