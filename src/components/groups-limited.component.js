import React, { Component } from 'react';
import GroupDataService from '../services/group.service';
import { DataGrid, GridToolbarExport, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarContainer } from '@material-ui/data-grid';
import { styles } from '../css-common'
import {  withStyles } from '@material-ui/core';

class GroupsLimited extends Component {
  constructor(props) {
    super(props);
    this.retrieveGroups = this.retrieveGroups.bind(this);

    this.state = {
      groups: [],
    };
  }

  componentDidMount() {
    this.retrieveGroups();
  }

  retrieveGroups() {
    GroupDataService.getAll()
      .then(response => {
        this.setState({
          groups: response.data
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
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }


  render() {
    const { classes } = this.props
    const { groups } = this.state;
    const checkKeysUnderObject = (obj, result) => {
      for (let key in obj) {
        if (key) {
          result.push(obj[key].username);
        }
      }
    };
    const columns = [
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'users', headerName: 'Users', width: 500,
        valueGetter: (params) => {
          let result = [];
          if (params.row.users) {
            checkKeysUnderObject(params.row.users, result);
          } else {
            result = ["None"];
          }
          return result.join(", ");
        }
      }
    ];
    return (
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
            columns={columns}
            rows={groups}
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

export default withStyles(styles)(GroupsLimited)
