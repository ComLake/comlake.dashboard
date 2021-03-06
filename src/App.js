import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import PrivateRoute from "./views/PrivateRoute";

import "./App.css";
import { styles } from "./css-common"
import { AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, IconButton, Drawer, Menu, MenuItem, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import FolderIcon from '@material-ui/icons/Folder';
import LockIcon from '@material-ui/icons/Lock';
import SearchIcon from '@material-ui/icons/Search';

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";

import AddUser from "./components/users-add.component";
import UsersList from "./components/users-list.component";
import User from "./components/users-edit.component";

import AddGroup from "./components/groups-add.component";
import GroupsList from "./components/groups-list.component";
import GroupsLimited from "./components/groups-limited.component";
import Group from "./components/groups-edit.component";
import GroupAddUser from "./components/groups-addUser.component";

import AddFolder from "./components/folders-add.component";
import FolderEdit from "./components/folders-edit.component";
import FoldersList from "./components/folders-list.component";
import Folder from "./components/folders-details.component";

import UploadFiles from "./components/files-upload.component";
import FilesList from "./components/files-list.component";
import FileEdit from "./components/files-edit.component";
import File from "./components/files-details.component";

import ContentList from "./components/content-list.component";
import ContentSearch from "./components/content-search.component";
import ContentMove from "./components/content-move.component";

import AclsList from "./components/acls-list.component";
import GrantAcl from "./components/acls-grant.component";

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
      open: false,
      setOpen: false,
      anchorEl: null,
    };
  }

  componentDidMount() {
    const user = AuthService.getJwtResponse();

    if (user) {
      this.setState({
        isAdmin: user.roles.includes("ROLE_ADMIN"),
        authenticated: true,
      });
      this.forceLogOut();
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      authenticated: false
    });
  }

  forceLogOut(){
    const expirationTime = new Date(localStorage.getItem('expirationTime'));
    console.log(expirationTime);
    if (Date.now() >= expirationTime) {
      this.logOut();
    }
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
    const { isAdmin, anchorEl, open, authenticated } = this.state;
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
          {isAdmin && (
          <List>
            <ListItem button key="Users" component={Link} to="/users">
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button key="Groups" component={Link} to="/admin/groups">
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItem>
            <ListItem button key="Security" component={Link} to="/acls">
              <ListItemIcon><LockIcon /></ListItemIcon>
              <ListItemText primary="ACLs" />
            </ListItem>
          </List>
          )}
          <Divider />
          <List>
            <ListItem button key="Files" component={Link} to="/content">
              <ListItemIcon><FolderIcon /></ListItemIcon>
              <ListItemText primary="Files" />
            </ListItem>
            <ListItem button key="Groups" component={Link} to="/groups">
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItem>
            <ListItem button key="Search" component={Link} to="/search">
              <ListItemIcon><SearchIcon /></ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <PrivateRoute authenticated={this.state.authenticated}
              exact path='/profile' component={Profile} />
            <PrivateRoute authenticated={this.state.authenticated}
              exact path='/users' component={UsersList} />
            <PrivateRoute authenticated={this.state.authenticated}
              exact path='/create/users' component={AddUser} />
            <PrivateRoute authenticated={this.state.authenticated}
              path='/users/:id' component={User} />
            <PrivateRoute authenticated={this.state.authenticated}
                exact path='/admin/groups' component={GroupsList} />
            <PrivateRoute authenticated={this.state.authenticated}
                exact path='/groups' component={GroupsLimited} />
            <PrivateRoute authenticated={this.state.authenticated}
              exact path='/create/groups' component={AddGroup} />
            <PrivateRoute authenticated={this.state.authenticated}
              path='/groups/:id' component={Group} />
            <PrivateRoute authenticated={this.state.authenticated}
              path='/add/groups/:id' component={GroupAddUser} />
            <PrivateRoute authenticated={this.state.authenticated}
              exact path='/files' component={FilesList} />
            <PrivateRoute authenticated={this.state.authenticated}
              path='/files/:id' component={File} />
            <PrivateRoute authenticated={this.state.authenticated}
              exact path='/upload/files' component={UploadFiles} />
            <PrivateRoute authenticated={this.state.authenticated}
              path='/folders/:id' component={Folder} />
            <PrivateRoute authenticated={this.state.authenticated}
              path='/edit/files/:id' component={FileEdit} />
            <PrivateRoute authenticated={this.state.authenticated}
              exact path='/create/folders' component={AddFolder} />
            <PrivateRoute authenticated={this.state.authenticated}
              path='/edit/folders/:id' component={FolderEdit} />
            <PrivateRoute authenticated={this.state.authenticated}
              path='/content/folders/:id' component={FoldersList} />
            <PrivateRoute authenticated={this.state.authenticated}
              exact path='/content' component={ContentList} />
            <PrivateRoute authenticated={this.state.authenticated}
              exact path='/move' component={ContentMove} />
            <PrivateRoute authenticated={this.state.authenticated}
              exact path='/search' component={ContentSearch} />
            <PrivateRoute authenticated={this.state.authenticated}
              exact path='/acls' component={AclsList} />
            <PrivateRoute authenticated={this.state.authenticated}
              exact path='/grant/acls' component={GrantAcl} />
          </Switch>
        </main>
      </div>
    ) : (
      <div>
          <Route exact path={["/","/login"]} component={Login} />
          <Route exact path='/register' component={Register} />
      </div>
    )}
    </div>
    );
  }
}

export default withStyles(styles)(App);
