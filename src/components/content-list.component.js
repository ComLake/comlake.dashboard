import React, { Component } from 'react';
import ContentDataService from '../services/content.service';
import { Link } from 'react-router-dom';
import { DataGrid, GridToolbarExport, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarContainer, GridColDef } from '@material-ui/data-grid';
import EditIcon from "@material-ui/icons/Edit";
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { styles } from '../css-common'
import { ButtonGroup, Button, IconButton, Icon, withStyles } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

import VisibilityIcon from '@material-ui/icons/Visibility';

class ContentList extends Component {
  constructor(props) {
    super(props);
    this.retrieveContent = this.retrieveContent.bind(this);

    this.state = {
      content: [],
    };
  }

  componentDidMount() {
    this.retrieveContent();
  }

  retrieveContent() {
    ContentDataService.getFirstNode()
      .then(response => {
        this.setState({
          content: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<CloudUploadIcon />} component={Link} to={"/create-folder"}>
          Upload
        </Button>
        <Button color="primary" startIcon={<CreateNewFolderIcon />} component={Link} to={"/add-folders"}>
          New Folder
        </Button>
        <ButtonGroup color="primary" aria-label="Move">
          <Button startIcon={<SubdirectoryArrowRightIcon />} component={Link}>Move File to Folder</Button>
          <Button startIcon={<SubdirectoryArrowRightIcon />} component={Link}>Move Subfolder to Folder</Button>
        </ButtonGroup>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  render() {
    const { classes } = this.props
    const { content } = this.state;
    const columns = [
      {
        field: 'type',
        headerName: 'Type',
        width: 110,
        renderCell: (params) => (
          <div>
            {params.row.type == 'Folder' ? (
              <Icon className="fas fa-folder" color="primary" />
            ) : (
              <Icon className="fas fa-file" color="primary" />
            )
            }
          </div>
        ),
      },
      { field: 'name', headerName: 'Name', width: 450 },
      { field: 'createdBy', headerName: 'Owner', width: 200},
      { field: 'lastModifiedDate', headerName: 'Last Modified', type: 'dateTime', width: 200},
      {
        field: '',
        headerName: 'Actions',
        width: 170,
        sortable: false,
        renderCell: (params) => (
          <div>
            <Button
              color="primary"
              aria-label="See Details"
              component={Link} to={"/edit-folders/" + params.row.id}
              startIcon={<VisibilityIcon />}
            >
            </Button>
            <Button
              color="primary"
              aria-label="Move To"
              component={Link} to={"/groups/" + params.row.id}
              startIcon={<SubdirectoryArrowLeftIcon />}
            >
            </Button>
          </div>
        )
      }
    ];
    return (
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
          <DataGrid
            columns={columns}
            rows={content}
            pageSize={5}
            components={{
              Toolbar: this.CustomToolbar,
            }}
            onRowSelected={(params) => (
                this.props.history.push("/folders/" + params.data.id)
              )
            }
            isRowSelectable={(params) => params.row.type == 'Folder'}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ContentList)