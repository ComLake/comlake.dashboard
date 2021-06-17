import React, { Component } from 'react';
import UserDataService from '../services/user.service';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import SearchIcon from '@material-ui/icons/Search';

import { styles } from '../css-common'
import { TextField, Button, Grid, ListItem, InputBase, withStyles } from '@material-ui/core';

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
      findByUsername: ''
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
      { field: 'username', headerName: 'Username', width: 150 },
      { field: 'email', headerName: 'Email', width: 200 },
      { field: 'firstname', headerName: 'First Name', width: 150 },
      { field: 'lastname', headerName: 'Last Name', width: 150 },
      { field: 'department', headerName: 'Department', width: 150 },
      { field: 'affiliation', headerName: 'Affiliation', width: 150 },
    ];
    return (
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
            columns={columns}
            rows={users}
            pageSize={10}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UsersList)
