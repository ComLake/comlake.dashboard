import React, { Component } from 'react';
import GroupDataService from '../services/group.service';
import { Link } from 'react-router-dom';
import { DataGrid, GridToolbarExport, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarContainer, GridColDef } from '@material-ui/data-grid';
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from '@material-ui/icons/Add';
import { styles } from '../css-common'
import { Button, IconButton, withStyles } from '@material-ui/core';

class GroupsList extends Component {
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
        <Button color="primary" startIcon={<AddIcon />} component={Link} to={"/create/groups"}>
          Create
        </Button>
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
      { field: 'users', headerName: 'Users', width: 200,
        valueGetter: (params) => {
          let result = [];
          if (params.row.users) {
            checkKeysUnderObject(params.row.users, result);
          } else {
            result = ["None"];
          }
          return result.join(", ");
        }
      },
      { field: 'createdDate', headerName: 'Created Date', width: 200 },
      { field: 'lastModifiedDate', headerName: 'Last Modified Date', width: 200 },
      {
        field: '',
        headerName: 'Actions',
        width: 170,
        sortable: false,
        renderCell: (params) => (
          <div>
            <Button
              color="primary"
              aria-label="Add Member to Group"
              component={Link} to={"/groups/" + params.row.id + "/add"}
              startIcon={<AddIcon />}
            >
              ADD
            </Button>

            <Button
              color="primary"
              aria-label="Edit Group"
              component={Link} to={"/groups/" + params.row.id}
              startIcon={<EditIcon />}
            >
              EDIT
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

export default withStyles(styles)(GroupsList)
