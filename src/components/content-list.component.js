import React, { Component } from 'react';
import ContentDataService from '../services/content.service';
import { Link } from 'react-router-dom';
import { DataGrid, GridToolbarExport, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarContainer, GridColDef } from '@material-ui/data-grid';
import EditIcon from "@material-ui/icons/Edit";
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { styles } from '../css-common'
import { ButtonGroup, Button, IconButton, Icon, withStyles } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import VisibilityIcon from '@material-ui/icons/Visibility';

class ContentList extends Component {
  constructor(props) {
    super(props);
    this.retrieveContent = this.retrieveContent.bind(this);

    this.state = {
      content: []
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
        <Button color="primary" startIcon={<CloudUploadIcon />} component={Link} to={"/add-files"}>
          Upload
        </Button>
        <Button color="primary" startIcon={<CreateNewFolderIcon />} component={Link} to={"/add-folders"}>
          New Folder
        </Button>
        <Button color="primary" startIcon={<SubdirectoryArrowRightIcon />} component={Link} to={"/add-folders"}>
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
    const { content } = this.state;
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
      { field: 'name', headerName: 'Name', width: 450 },
      { field: 'createdBy', headerName: 'Owner', width: 200},
      { field: 'lastModifiedDate', headerName: 'Last Modified', type: 'dateTime', width: 200}
    ];
    return (
      <div>
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
      </div>
    );
  }
}

export default withStyles(styles)(ContentList)
