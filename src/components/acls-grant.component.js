import React, { Component } from "react";
import AclDataService from "../services/acl.service";
import ContentDataService from "../services/content.service";
import FileDataService from "../services/file.service";
import FolderDataService from "../services/folder.service";
import UserDataService from "../services/user.service";
import GroupDataService from "../services/group.service";

import { FormHelperText, Select, FormControl, InputLabel, MenuItem, Card, CardHeader, CardContent, CardActions, TextField, Button, Chip, withStyles } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';
import { Autocomplete } from '@material-ui/lab';

import { styles } from "../css-common"

class GrantAcl extends Component {
    constructor(props) {
        super(props);
        this.onChangeSourceType = this.onChangeSourceType.bind(this);
        this.onChangeTargetType = this.onChangeTargetType.bind(this);
        this.onChangePerm = this.onChangePerm.bind(this);
        this.onChangeSourceId = this.onChangeSourceId.bind(this);
        this.onChangeTargetName = this.onChangeTargetName.bind(this);

        this.grantPerm = this.grantPerm.bind(this);

        this.state = {
            perm: "",
            targetType: "",
            sourceType: "",
            sourceId: "",
            targetName: "",
            files: [],
            folders: [],
            users: [],
            groups: []
        };
    }

    componentDidMount() {
        this.retrieveUsers();
        this.retrieveGroups();
        this.retrieveFiles();
        this.retrieveFolders();
    }

    retrieveFiles() {
      FileDataService.getAll()
        .then(response => {
          this.setState({
            files: response.data
          });
        })
        .catch(e => {
          console.log(e);
        });
    }

    retrieveFolders() {
      FolderDataService.getAll()
        .then(response => {
          this.setState({
            folders: response.data
          });
        })
        .catch(e => {
          console.log(e);
        });
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

    grantPerm() {
      const {sourceId, sourceType, targetType, targetName, perm} = this.state;
      if (sourceType == "FILE") {
        if (targetType == "USER"){
          AclDataService.grantFilePermissionForUser(sourceId, targetName, perm)
              .then(response => {
                console.log(response.data);
              })
              .catch(e => {
                  console.log(e);
          });
        } else {
          AclDataService.grantFilePermissionForGroup(sourceId, targetName, perm)
              .then(response => {
                console.log(response.data);
              })
              .catch(e => {
                console.log(e);
          });
        }
      } else {
        if (targetType == "USER"){
          AclDataService.grantFolderPermissionForUser(sourceId, targetName, perm)
              .then(response => {
                console.log(response.data);
              })
              .catch(e => {
                  console.log(e);
          });
        } else {
          AclDataService.grantFolderPermissionForGroup(sourceId, targetName, perm)
              .then(response => {
                console.log(response.data);
              })
              .catch(e => {
                console.log(e);
          });
        }
      }
    }

    onChangeSourceType(e) {
        this.setState({
            sourceType: e.target.value
        });
    }

    onChangeTargetType(e) {
        this.setState({
            targetType: e.target.value
        });
    }

    onChangePerm(e){
      this.setState({
          perm: e.target.value
      });
    }

    onChangeSourceId(event, value) {
        this.setState({
            sourceId: value.id
        });
    }

    onChangeTargetName(event, value) {
        this.setState({
            targetName: value.id
        });
    }

    render() {
        const { files, folders, users, groups, sourceId, targetType, targetName, Type, sourceType, perm } = this.state;
        const { classes } = this.props
        return (
            <React.Fragment>
              <Card>
              <CardHeader
                title="Grant Permission"
                />
              <CardContent>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                      id="select-sourceType"
                      value={targetType}
                      onChange={this.onChangeTargetType}
                    >
                      <MenuItem value={"USER"}>User</MenuItem>
                      <MenuItem value={"GROUP"}>Group</MenuItem>
                    </Select>
                    <FormHelperText>Grant User or Group?</FormHelperText>
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                      id="select-sourceType"
                      value={sourceType}
                      onChange={this.onChangeSourceType}
                    >
                      <MenuItem value={"FILE"}>File</MenuItem>
                      <MenuItem value={"FOLDER"}>Folder</MenuItem>
                    </Select>
                    <FormHelperText>For File or Folder?</FormHelperText>
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                      id="select-sourceType"
                      value={perm}
                      onChange={this.onChangePerm}
                    >
                      <MenuItem value={"READ"}>Can Read</MenuItem>
                      <MenuItem value={"WRITE"}>Can Write</MenuItem>
                    </Select>
                    <FormHelperText>Permission?</FormHelperText>
                  </FormControl>
                  {sourceType == 'FILE' ? (
                    <Autocomplete
                      options={files}
                      getOptionLabel={(files) => files.name}
                      className={classes.formControl}
                      onChange={this.onChangeSourceId}
                      renderInput={(params) =>
                        <TextField {...params} margin="normal" label="Which File?" variant="outlined"/>
                      }
                    />
                  ) : (
                    <Autocomplete
                      options={folders}
                      getOptionLabel={(folders) => folders.name}
                      className={classes.formControl}
                      onChange={this.onChangeSourceId}
                      renderInput={(params) =>
                        <TextField {...params} margin="normal" label="Which Folder?" variant="outlined"/>
                      }
                    />
                  )
                  }
                  {targetType == 'USER' ? (
                    <Autocomplete
                      options={users}
                      getOptionLabel={(users) => users.username}
                      className={classes.formControl}
                      onChange={this.onChangeTargetName}
                      renderInput={(params) =>
                        <TextField {...params} margin="normal" label="For Which User?" variant="outlined"/>
                      }
                    />
                  ) : (
                    <Autocomplete
                      options={groups}
                      getOptionLabel={(groups) => groups.name}
                      className={classes.formControl}
                      onChange={this.onChangeTargetName}
                      renderInput={(params) =>
                        <TextField {...params} margin="normal" label="For Which Group?" variant="outlined"/>
                      }
                    />
                  )
                  }
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={this.grantPerm}>
                        Submit
                    </Button>
                  </CardActions>
              </Card>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(GrantAcl)
