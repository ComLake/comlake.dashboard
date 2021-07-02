import React, { Component } from 'react';
import FileDataService from '../services/file.service';
import { Link } from 'react-router-dom';
import { DataGrid, GridToolbarExport, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarContainer, GridColDef } from '@material-ui/data-grid';
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from '@material-ui/icons/Add';
import { styles } from '../css-common'
import { Button, IconButton, withStyles } from '@material-ui/core';

class FilesList extends Component {
  constructor(props) {
    super(props);
    this.retrieveFiles = this.retrieveFiles.bind(this);

    this.state = {
      files: [],
    };
  }

  componentDidMount() {
    this.retrieveFiles();
  }

  retrieveFiles() {
    FileDataService.getAll()
      .then(response => {
        this.setState({
          files: response.data
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
        <Button color="primary" startIcon={<AddIcon />} component={Link} to={"/add-files"}>
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
    const { files } = this.state;
    const columns = [
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'owner', headerName: 'Owner', width: 150,
        valueGetter: (params) => {
          return params.row.owner.username;
        }
      },
      { field: 'mimeType', headerName: 'MIME Type', width: 150 },
      { field: 'size', headerName: 'Size', width: 120 },
      { field: 'source', headerName: 'Source', width: 150 },
      { field: 'topics', headerName: 'Topics', width: 150 },
      { field: 'createdDate', headerName: 'Created Date', width: 150, hide: true },
      { field: 'lastModifiedDate', headerName: 'Last Modified Date', width: 150, hide: true },
      { field: 'lastModifiedBy', headerName: 'Last Modified By', width: 150, hide: true },
      {
        field: '',
        headerName: 'Actions',
        width: 170,
        sortable: false,
        renderCell: (params) => (
          <div>
            <Button
              color="primary"
              aria-label="Add File to Folder"
              component={Link} to={"/add-users/" + params.row.id}
              startIcon={<AddIcon />}
            >
              ADD
            </Button>

            <Button
              color="primary"
              aria-label="Edit File"
              component={Link} to={"/files/" + params.row.id}
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
            rows={files}
            pageSize={5}
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

export default withStyles(styles)(FilesList)
