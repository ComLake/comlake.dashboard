import React, { Component } from 'react';
import UserDataService from '../services/user.service';
import { Link } from 'react-router-dom';
import { DataGrid, GridToolbarExport, GridToolbarContainer, GridColDef } from '@material-ui/data-grid';

import { styles } from '../css-common'
import { Button, withStyles } from '@material-ui/core';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.retrieveUsers = this.retrieveUsers.bind(this);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.retrieveUsers();
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

  CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }


  render() {
    const { classes } = this.props
    const { users } = this.state;
    const columns = [
      { field: 'username', headerName: 'Username', width: 150 },
      { field: 'email', headerName: 'Email', width: 200 },
      { field: 'firstname', headerName: 'First Name', width: 150 },
      { field: 'lastname', headerName: 'Last Name', width: 150 },
      { field: 'department', headerName: 'Department', width: 170 },
      { field: 'affiliation', headerName: 'Affiliation', width: 170 },
      {
        field: '',
        headerName: 'Action',
        width: 150,
        sortable: false,
        renderCell: () => (
          <div>
            <Button color="primary">
              Edit
            </Button>
            <Button color="secondary">
              Delete
            </Button>
          </div>
        ),
      }
    ];
    return (
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
            columns={columns}
            rows={users}
            pageSize={10}
            components={{
              Toolbar: this.CustomToolbar,
            }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UsersList)
