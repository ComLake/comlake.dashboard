import React, { Component } from 'react';
import FolderDataService from '../services/folder.service';
import { Link } from 'react-router-dom';
import { DataGrid, GridToolbarExport, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarContainer, GridColDef } from '@material-ui/data-grid';
import { styles } from '../css-common'
import { Button, Icon, IconButton, withStyles } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import VisibilityIcon from '@material-ui/icons/Visibility';


class FoldersList extends Component {
  constructor(props) {
    super(props);
    this.getFolder = this.getFolder.bind(this);

    this.state = {
      id: null,
      folders: [],
    };
  }

  componentDidMount() {
    this.getFolder(this.props.match.params.id);
  }

  getFolder(id) {
    FolderDataService.listContent(id)
      .then(response => {
        this.setState({
          folders: response.data
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
        <Button color="primary" startIcon={<CloudUploadIcon />} component={Link} to={"/upload/files"}>
          Upload
        </Button>
        <Button color="primary" startIcon={<CreateNewFolderIcon />} component={Link} to={"/create/folders"}>
          New Folder
        </Button>
        <Button color="primary" startIcon={<SubdirectoryArrowRightIcon />} component={Link} to={"/move"}>
          Move
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
    const { folders } = this.state;

    const columns = [
      {
        field: 'type',
        headerName: 'Type',
        width: 110,
        renderCell: (params) => (
          <div>
            {params.row.type == 'Folder' ? (
              <Icon className="fas fa-folder orange"/>
            ) : (
              <Icon className="fas fa-file" color="primary" />
            )
            }
          </div>
        ),
      },
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'createdBy', headerName: 'Owner', width: 200},
      { field: 'lastModifiedDate', headerName: 'Last Modified', type: 'dateTime', width: 200},
      {
        field: '',
        headerName: 'Action',
        width: 170,
        sortable: false,
        renderCell: (params) => (
          <div>
              {params.row.type == 'Folder' ? (
                <div>
                  <Button
                    color="primary"
                    aria-label="See Details"
                    component={Link} to={"/folders/" + params.row.id}
                    startIcon={<VisibilityIcon />}
                  >
                  </Button>
                  <Button
                    color="primary"
                    aria-label="Edit Folder"
                    component={Link} to={"/folders/" + params.row.id +  + "/edit"}
                    startIcon={<EditIcon />}
                  >
                  </Button>
                  <Button
                    color="primary"
                    aria-label="See Subdirectory"
                    component={Link} to={"/content/folders/" + params.row.id}
                    startIcon={<SubdirectoryArrowLeftIcon />}
                  >
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    color="primary"
                    aria-label="See Details"
                    component={Link} to={"/files/" + params.row.id}
                    startIcon={<VisibilityIcon />}
                  >
                  </Button>
                  <Button
                    color="primary"
                    aria-label="Edit File"
                    component={Link} to={"/files/" + params.row.id + "/edit"}
                    startIcon={<EditIcon />}
                  >
                  </Button>
                </div>
              )
              }
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
            rows={folders}
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

export default withStyles(styles)(FoldersList)
