import React, { Component } from "react";
import FileDataService from "../services/file.service";
import AclDataService from "../services/acl.service";
import UserDataService from "../services/user.service";
import GroupDataService from "../services/group.service";

import { Link } from 'react-router-dom';
import { styles } from "../css-common"
import { DataGrid } from '@material-ui/data-grid';
import { TextField, Select, FormControl, InputLabel, MenuItem, Card, CardHeader, CardContent, Button, CardActions, Chip, Paper, Typography, withStyles } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Autocomplete from '@material-ui/lab/Autocomplete';

import AddIcon from '@material-ui/icons/Add';
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
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.retrieveGroups = this.retrieveGroups.bind(this);

        this.downloadFile = this.downloadFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.grantPerm = this.grantPerm.bind(this);
        this.removePerm = this.removePerm.bind(this);
        this.newPerm = this.newPerm.bind(this);

        this.onChangeTargetType = this.onChangeTargetType.bind(this);
        this.onChangePerm = this.onChangePerm.bind(this);
        this.onChangeTargetName = this.onChangeTargetName.bind(this);

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
            users: [],
            groups: [],
            targetType: "",
            targetName: "",
            perm: "",
            submitted: false
        };
    }

    componentDidMount() {
        this.getFile(this.props.match.params.id);
        this.getFilePerms(this.props.match.params.id);
        this.retrieveUsers();
        this.retrieveGroups();
    }

    retrieveUsers() {
      UserDataService.getAll()
        .then(response => {
          this.setState({
            users: response.data
          });
        })
        .catch(e => {
          console.log(e);
        });
    }

    retrieveGroups() {
      GroupDataService.getAll()
        .then(response => {
          this.setState({
            groups: response.data
          });
        })
        .catch(e => {
          console.log(e);
        });
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

    newPerm(){
      this.setState({
          targetType: "",
          targetName: "",
          submitted: false
      });
    }

    grantPerm(){
      const targetType = this.state.targetType;
      const targetName = this.state.targetName;
      const fileId = this.state.currentFile.id;
      const perm = this.state.perm;

      if (targetType == "USER"){
        AclDataService.grantFilePermissionForUser(fileId, targetName, perm)
            .then(response => {
              this.setState({
                  submitted: true
              });
              console.log(response.data);
            })
            .catch(e => {
                console.log(e);
        });
      } else {
        AclDataService.grantFilePermissionForGroup(fileId, targetName, perm)
            .then(response => {
              this.setState({
                  submitted: true
              });
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
        });
      }
    }

    removePerm(targetType, targetName, perm){
      const fileId = this.state.currentFile.id;
      if (targetType == "USER"){
        AclDataService.removeFilePermissionForUser(fileId, targetName, perm)
            .then(response => {
              console.log(response.data);
            })
            .catch(e => {
                console.log(e);
        });
      } else {
        AclDataService.removeFilePermissionForGroup(fileId, targetName, perm)
            .then(response => {
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
        });
      }
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

    onChangeTargetType(e) {
        this.setState({
            targetType: e.target.value
        });
    }

    onChangeTargetName(event, value) {
      if (this.state.targetType == "USER"){
        this.setState({
          targetName: value.username
        });
      } else {
        this.setState({
          targetName: value.name
        });
      }
    }

    onChangePerm(e) {
        this.setState({
            perm: e.target.value
        });
    }

    render() {
        const { currentFile, users, groups, perm, perms, targetName, targetType } = this.state;
        const { classes } = this.props
        const columns = [
          { field: 'targetType', headerName: 'Type', width: 170 },
          { field: 'targetId', headerName: 'For', width: 170},
          { field: 'perm', headerName: 'Permission', width: 170 },
          {
            field: '',
            headerName: 'Action',
            width: 170,
            sortable: false,
            renderCell: (params) => (
              <div>
                  <Button
                    color="secondary"
                    aria-label="Remove"
                    startIcon={<RemoveCircleOutlineIcon />}
                    onClick={() => this.removePerm(params.row.targetType, params.row.targetId, params.row.perm)}
                  >
                  REMOVE
                  </Button>
              </div>
            )
          }
        ];

        return (
          <div>
            {currentFile && (
                <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="filename">
                      <FolderOpenIcon />
                    </Avatar>
                  }
                  title={currentFile.name}
                  action={
                    <div>
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
                     component={Link} to={"/edit/files/" + currentFile.id}
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
                    </div>
                  }
                  />
                <CardContent>
                    <List aria-labelledby="Details">
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
                    <div style={{ height: 300, width: '100%', margin: 20 }}>
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
                    {this.state.submitted ? (
                        <div>
                            <h4>You grant permission successfully!</h4>
                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={this.newPerm}>
                                Grant More
                            </Button>
                        </div>
                    ) : (
                      <div>
                        <Typography variant="h5" component="h5">
                          Add a permission
                        </Typography>
                        <div>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel id="select-targetType-label" variant="outlined">Target Type</InputLabel>
                          <Select
                            labelId="select-targetType-label"
                            id="select-targetType"
                            value={targetType}
                            onChange={this.onChangeTargetType}
                          >
                            <MenuItem value={"USER"}>User</MenuItem>
                            <MenuItem value={"GROUP"}>Group</MenuItem>
                          </Select>
                        </FormControl>
                        </div>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel id="select-permission-label">Permission</InputLabel>
                          <Select
                            labelId="select-permission-label"
                            id="select-permission"
                            value={perm}
                            onChange={this.onChangePerm}
                          >
                            <MenuItem value={"READ"}>Can Read</MenuItem>
                            <MenuItem value={"WRITE"}>Can Write</MenuItem>
                          </Select>
                        </FormControl>
                        {targetType == 'USER' ? (
                          <Autocomplete
                            options={users}
                            getOptionLabel={(users) => users.username}
                            getOptionDisabled={(option) => option === users[0]}
                            className={classes.formControl}
                            onChange={this.onChangeTargetName}
                            renderInput={(params) =>
                              <TextField {...params} margin="normal" label="Username" variant="outlined"/>
                            }
                          />
                        ) : (
                          <Autocomplete
                            options={groups}
                            getOptionLabel={(groups) => groups.name}
                            className={classes.formControl}
                            onChange={this.onChangeTargetName}
                            renderInput={(params) =>
                              <TextField {...params} margin="normal" label="Group" variant="outlined"/>
                            }
                          />
                        )
                        }
                        <Button
                          color="primary"
                          aria-label="Add Permission"
                          variant="contained"
                          startIcon={<AddIcon />}
                          onClick={this.grantPerm}
                        >
                        ADD
                        </Button>
                      </div>
                    )
                  }
                </CardContent>
                </Card>
            )}
          </div>
        );
    }
}

export default withStyles(styles)(File)
