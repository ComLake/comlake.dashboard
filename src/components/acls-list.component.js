import React, { Component } from 'react';
import AclDataService from '../services/acl.service';
import { Link } from 'react-router-dom';
import { DataGrid, GridToolbarExport, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarContainer, GridColDef } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { styles } from '../css-common'
import { Button, IconButton, withStyles } from '@material-ui/core';

class AclsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveAcls = this.retrieveAcls.bind(this);

    this.state = {
      acls: [],
    };
  }

  componentDidMount() {
    this.retrieveAcls();
  }

  retrieveAcls() {
    AclDataService.getAll()
      .then(response => {
        this.setState({
          acls: response.data
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
        <Button color="primary" startIcon={<AddIcon />} component={Link} to={"/add-acls"}>
          Grant Permission
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
    const { acls } = this.state;
    const checkKeysUnderObject = (obj, result) => {
      for (let key in obj) {
        if (key) {
          result.push(obj[key].username);
        }
      }
    };
    const columns = [
      { field: 'id', headerName: 'ID', width: 100},
      { field: 'sourceId', headerName: 'Source Id', width: 150},
      { field: 'targetId', headerName: 'Target Id', width: 150},
      { field: 'perm', headerName: 'Permission', width: 170},
      { field: 'targetType', headerName: 'Target Type', width: 170},
      { field: 'sourceType', headerName: 'Source Type', width: 170},
      {
        field: '',
        headerName: 'Actions',
        width: 170,
        sortable: false,
        renderCell: (params) => (
          <div>
            <Button
              color="primary"
              aria-label="Delete Acl"
              component={Link} to={"/acls/" + params.row.id}
              startIcon={<DeleteIcon />}
            >
              DELETE
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
            rows={acls}
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

export default withStyles(styles)(AclsList)
