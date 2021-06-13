import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import AddUser from "./components/users-add.component";
import User from "./components/users-edit.component";
import UsersList from "./components/users-list.component";
import UploadFiles from "./components/upload-files.component";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <Router history={history}>
        <div>
          <Navbar collapseOnSelect bg="primary" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="/">Ulake</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                {showAdminBoard && (
                  <Nav.Link href="/users">Users</Nav.Link>
                )}
                {showAdminBoard && (
                  <Nav.Link href="/add">Add User</Nav.Link>
                )}
                {currentUser && (
                  <Nav.Link href="/add-files">Add File</Nav.Link>
                )}
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <Nav.Link href="/profile">{currentUser.username}</Nav.Link>
                <Nav.Link href="/login" onClick={this.logOut}>Logout</Nav.Link>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Sign Up</Nav.Link>
              </div>
            )}
          </Navbar>

          <div className="container mt-3">
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
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
