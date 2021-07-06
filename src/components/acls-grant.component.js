import React, { Component } from "react";
import AclDataService from "../services/acl.service";
import ContentDataService from "../services/content.service";
import FileDataService from "../services/file.service";
import FolderDataService from "../services/folder.service";

import { FormHelperText, Select, FormControl, InputLabel, MenuItem, Card, CardHeader, CardContent, CardActions, TextField, Button, Chip, withStyles } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';
import { Autocomplete } from '@material-ui/lab';

import { styles } from "../css-common"

class GrantAcl extends Component {
    constructor(props) {
        super(props);
        this.onChangeFolderId = this.onChangeFolderId.bind(this);
        this.onChangeFileId = this.onChangeFileId.bind(this);
        this.onChangeSubfolderId = this.onChangeSubfolderId.bind(this);
        this.onChangeType = this.onChangeType.bind(this);

        this.move = this.move.bind(this);

        this.state = {
            id: null,
            folderId: "",
            fileId: "",
            subfolderId: "",
            type: "",
            files: [],
            folders: []
        };
    }

    componentDidMount() {
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

    onChangeFolderId(event, value) {
        this.setState({
            folderId: value.id
        });
    }

    onChangeFileId(event, value) {
        this.setState({
            fileId: value.id
        });
    }

    onChangeSubfolderId(event, value) {
        this.setState({
            subfolderId: value.id
        });
    }

    move() {
      if (this.state.type == "FILE") {
        ContentDataService.addFileToFolder(this.state.folderId, this.state.fileId)
            .then(response => {
                this.props.history.push("/content");
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
      } else {
        ContentDataService.addSubfolderToFolder(this.state.folderId, this.state.subfolderId)
            .then(response => {
                this.props.history.push("/content");
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
      }
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        });
    }

    render() {
        const { files, folders, type } = this.state;
        const { classes } = this.props
        return (
            <React.Fragment>
              <Card>
              <CardHeader
                title="Move"
                />
              <CardContent>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                      id="select-type"
                      value={type}
                      onChange={this.onChangeType}
                    >
                      <MenuItem value={"FILE"}>File</MenuItem>
                      <MenuItem value={"FOLDER"}>Folder</MenuItem>
                    </Select>
                    <FormHelperText>Move File or Folder?</FormHelperText>
                  </FormControl>
                  {type == 'FILE' ? (
                    <Autocomplete
                      options={files}
                      getOptionLabel={(files) => files.name}
                      className={classes.formControl}
                      onChange={this.onChangeFileId}
                      renderInput={(params) =>
                        <TextField {...params} margin="normal" label="From File" variant="outlined"/>
                      }
                    />
                  ) : (
                    <Autocomplete
                      options={folders}
                      getOptionLabel={(folders) => folders.name}
                      className={classes.formControl}
                      onChange={this.onChangeSubfolderId}
                      renderInput={(params) =>
                        <TextField {...params} margin="normal" label="From Folder" variant="outlined"/>
                      }
                    />
                  )
                  }
                  <Autocomplete
                    options={folders}
                    getOptionLabel={(folders) => folders.name}
                    className={classes.formControl}
                    onChange={this.onChangeFolderId}
                    renderInput={(params) =>
                      <TextField {...params} margin="normal" label="To Folder" variant="outlined"/>
                    }
                  />
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={this.move}>
                        Submit
                    </Button>
                  </CardActions>
              </Card>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(GrantAcl)
