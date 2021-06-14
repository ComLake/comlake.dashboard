import React, { Component } from "react";
import UserDataService from "../services/user.service";
import { Link } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';

import { styles } from "../css-common"
import { TextField, Button, Grid, ListItem, withStyles } from "@material-ui/core";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.findByUsername = this.findByUsername.bind(this);

    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
      findByUsername: ""
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  onChangeSearchUsername(e) {
    const findByUsername = e.target.value;

    this.setState({
      findByUsername: findByUsername
    });
  }

  retrieveUsers() {
    UserDataService.getAll()
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

  findByUsername() {
    UserDataService.findByUsername(this.state.findByUsername)
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { classes } = this.props
    const { findByUsername, users, currentUser, currentIndex } = this.state;
    const columns = [
      { field: "id", headerName: "ID", width: 10 },
      { field: "username", headerName: "Username", width: 170 },
      { field: "email", headerName: "Email", width: 70 },
      { field: "firstname", headerName: "First Name", width: 70 },
      { field: "lastname", headerName: "Last Name", width: 70 },
      { field: "department", headerName: "Department", width: 70 },
      { field: "affiliation", headerName: "Affiliation", width: 70 },
    ];
    return (
      <div className={classes.form}>
        <Grid container>
          <Grid className={classes.search} item sm={12} xs={12} md={12} xl={12} lg={12}>
            <TextField
              label="Search by username"
              value={findByUsername}
              onChange={this.onChangeSearchUsername}
            />
            <Button
              size="small"
              variant="outlined"
              className={classes.textField}
              onClick={this.findByUsername}>
              Search
            </Button>
          </Grid>
          <Grid item md={4}>
            <h2>Users List</h2>

            <div className="list-group">
              {users &&
                users.map((user, index) => (
                  <ListItem
                    selected={index === currentIndex}
                    onClick={() => this.setActiveUser(user, index)}
                    divider
                    button
                    key={index}>
                    {user.username}
                  </ListItem>
                ))}
            </div>
          </Grid>
          <Grid item md={8}>
            {currentUser ? (
              <div className={classes.user}>
                <h4>User</h4>
                <div className={classes.detail}>
                  <label>
                    <strong>Username:</strong>
                  </label>{" "}
                  {currentUser.username}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Email:</strong>
                  </label>{" "}
                  {currentUser.email}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>firstname:</strong>
                  </label>{" "}
                  {currentUser.firstname}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>lastname:</strong>
                  </label>{" "}
                  {currentUser.lastname}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>department:</strong>
                  </label>{" "}
                  {currentUser.department}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>affiliation:</strong>
                  </label>{" "}
                  {currentUser.affiliation}
                </div>
                <Link
                  to={"/users/" + currentUser.id}
                  className={classes.edit}
                >
                  Edit
              </Link>
              </div>
            ) : (
                <div>
                  <br />
                  <p className={classes.user}>Please click on a User...</p>
                </div>
              )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(UsersList)
