import React, { Component } from "react";
import FileDataService from "../services/file.service";
import AclDataService from "../services/acl.service";
import UserDataService from "../services/user.service";
import GroupDataService from "../services/group.service";

import { Link } from 'react-router-dom';
import { styles } from "../css-common"
import { DataGrid } from '@material-ui/data-grid';
import { Divider, Card, CardHeader, CardContent, Button, CardActions, Chip, Paper, Typography, withStyles } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import DeleteIcon from '@material-ui/icons/Delete';
import LabelIcon from '@material-ui/icons/Label';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import LinkIcon from '@material-ui/icons/Link';
import LanguageIcon from '@material-ui/icons/Language';
import GetAppIcon from '@material-ui/icons/GetApp';
import FileDownload from "js-file-download";
import PersonIcon from '@material-ui/icons/Person';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from "@material-ui/icons/Edit";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

class File extends Component {
    constructor(props) {
        super(props);

        this.getFile = this.getFile.bind(this);
        this.getFilePerms = this.getFilePerms.bind(this);
        this.getUsernameById = this.getUsernameById.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);

        this.state = {
            currentFile: {
                id: null,
                name: "",
                source: "",
                language: "",
                owner: "",
                createdBy: "",
                createdDate: null,
                lastModifiedBy: "",
                lastModifiedDate: null,
                topics: [],
            },
            perms: [],
        };
    }

    componentDidMount() {
        this.getFile(this.props.match.params.id);
        this.getFilePerms(this.props.match.params.id);
    }

    getFile(id) {
        FileDataService.get(id)
            .then(response => {
                this.setState({
                    currentFile: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    getUsernameById(userId) {
        UserDataService.get(userId)
            .then(response => {
                console.log(response.data.username);
                return(
                  <p>
                    {response.data.username}
                  </p>
                )
            })
            .catch(e => {
                console.log(e);
            });
    }

    getFilePerms(id) {
        AclDataService.getByFileId(id)
            .then(response => {
                this.setState({
                    perms: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    async downloadFile(id) {
      FileDataService.download(id)
          .then(response => {
            FileDownload(response.data, this.state.currentFile.name);
          })
          .catch(e => {
              console.log(e);
          });
    }

    deleteFile() {
        FileDataService.delete(this.state.currentFile.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/content')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentFile, rowsPerPage, page, perms } = this.state;
        const { classes } = this.props
        const columns = [
          { field: 'targetType', headerName: 'Type', width: 170 },
          { field: 'targetId', headerName: 'For', width: 170,
            renderCell: (params) => (
              <div>
                  {params.row.targetType == 'USER' ? (
                    this.getUsernameById(params.row.targetId)
                  ) : (
                    <Button
                      color="secondary"
                      aria-label="Remove"
                      component={Link} to={"/files/" + params.row.id + "/edit"}
                      startIcon={<RemoveCircleOutlineIcon />}
                    >
                    </Button>
                  )
                  }
              </div>
            )
          },
          { field: 'perm', headerName: 'Permission', width: 170 },
          {
            field: '',
            headerName: 'Action',
            width: 170,
            sortable: false,
            renderCell: (params) => (
              <div>
                  {params.row.targetType == 'USER' ? (
                    <Button
                      color="secondary"
                      aria-label="Remove"
                      component={Link} to={"/folders/" + params.row.id +  + "/edit"}
                      startIcon={<RemoveCircleOutlineIcon />}
                    >
                    </Button>
                  ) : (
                    <Button
                      color="secondary"
                      aria-label="Remove"
                      component={Link} to={"/files/" + params.row.id + "/edit"}
                      startIcon={<RemoveCircleOutlineIcon />}
                    >
                    </Button>
                  )
                  }
              </div>
            )
          }
        ];

        return (
          <div>
            {currentFile && (
                <Card>
                <CardHeader
                  title={"Details of File #" + currentFile.id}
                  />
                <CardContent>
                    <List aria-labelledby="Details">
                      <ListItem>
                       <ListItemAvatar>
                        <Avatar>
                          <FolderOpenIcon />
                        </Avatar>
                      </ListItemAvatar>
                       <ListItemText primary="Name" secondary={currentFile.name} />
                      </ListItem>

                      <ListItem>
                       <ListItemAvatar>
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                       <ListItemText primary="Created By" secondary={currentFile.createdBy} />
                      </ListItem>

                      <ListItem>
                       <ListItemAvatar>
                        <Avatar>
                          <LinkIcon />
                        </Avatar>
                      </ListItemAvatar>
                       <ListItemText primary="Source" secondary={currentFile.source} />
                      </ListItem>

                      <ListItem>
                        <ListItemAvatar>
                         <Avatar>
                          <LanguageIcon />
                         </Avatar>
                       </ListItemAvatar>
                       <ListItemText primary="Language" secondary={currentFile.language} />
                      </ListItem>
                    </List>
                    <Paper variant="outlined" component="ul" className={classes.chipContainer}>
                      {currentFile.topics.map((data, index) => (
                          <li key={index}>
                            <Chip
                              icon={<LabelIcon />}
                              label={data}
                              className={classes.chip}
                            />
                          </li>
                      ))}
                    </Paper>
                    <Typography variant="h5" component="h5">
                      Permissions on this file
                    </Typography>
                    <div style={{ height: 300, width: '100%' }}>
                      <div style={{ display: 'flex', height: '100%' }}>
                        <div style={{ flexGrow: 1 }}>
                        <DataGrid
                          columns={columns}
                          rows={perms}
                          pageSize={10}
                          />
                        </div>
                      </div>
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                     color="primary"
                     type="submit"
                     className={classes.button}
                     startIcon={<GetAppIcon />}
                     onClick={() => this.downloadFile(currentFile.id)}
                   >
                     Download
                   </Button>
                   <Button
                     color="primary"
                     aria-label="Edit File"
                     className={classes.button}
                     component={Link} to={"/files/" + currentFile.id + "/edit"}
                     startIcon={<EditIcon />}
                   >
                    Edit
                   </Button>
                    <Button
                     color="secondary"
                     className={classes.button}
                     startIcon={<DeleteIcon />}
                     onClick={this.deleteFile}
                   >
                     Delete
                   </Button>
                </CardActions>
                </Card>
            )}
          </div>
        );
    }
}

export default withStyles(styles)(File)
