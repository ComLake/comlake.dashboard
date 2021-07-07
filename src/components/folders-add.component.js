import React, { Component } from "react";
import FolderDataService from "../services/folder.service";
import ContentDataService from "../services/content.service";

import { Card, CardHeader, CardContent, CardActions, TextField, Button, Chip, withStyles } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';
import { Autocomplete } from '@material-ui/lab';

import { styles } from "../css-common"

class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSource = this.onChangeSource.bind(this);
        this.onChangeLanguage = this.onChangeLanguage.bind(this);
        this.onChangeTopics = this.onChangeTopics.bind(this);
        this.onChangeFolder = this.onChangeFolder.bind(this);

        this.saveFolder = this.saveFolder.bind(this);
        this.newFolder = this.newFolder.bind(this);
        this.retrieveFolders = this.retrieveFolders.bind(this);

        this.state = {
            id: null,
            name: "",
            source: "",
            topics: null,
            language: "",
            folders: [],
            folderId: "",
            subfolderId: "",
            sampleTopics: [
              "Image Classfication", "Cancer", "Wine", "GPU", "pandas", "Classfication", "Education", "Data Visualization", "numpy", "bussiness", "JSON", "CSV", "Image", "CT Scan", "X-ray", "DCOM"
            ],
            submitted: false
        };
    }

    componentDidMount() {
        this.retrieveFolders();
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

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeSource(e) {
        this.setState({
            source: e.target.value
        });
    }

    onChangeLanguage(e) {
        this.setState({
            language: e.target.value
        });
    }

    onChangeTopics(event, value) {
      this.setState({
        topics: value
      });
    }

    onChangeFolder(event, value) {
      if (value != null){
        this.setState({
          folderId: value.id
        })
      };
    }

    saveFolder() {
        var data = {
            name: this.state.name,
            source: this.state.source,
            topics: this.state.topics,
            language: this.state.language
        };
        const folderId = this.state.folderId;

        FolderDataService.create(data)
            .then(response => {
                this.setState({
                    subfolderId: response.data.id,
                    name: response.data.name,
                    source: response.data.source,
                    topics: response.data.topics,
                    language: response.data.language,

                    submitted: true
                });
                console.log(response.data);
                console.log("folderId " + this.state.folderId);
                console.log("subfolderId " + this.state.subfolderId);
                // if (folderId != null && this.state.subfolderId != null){
                //   ContentDataService.addSubfolderToFolder(folderId, this.state.subfolderId)
                //   .then(response => {
                //     console.log(response.data);
                //   })
                //   .catch(e => {
                //     console.log(e);
                //   });
                // }
            })
            .catch(e => {
                console.log(e);
            });

        this.props.history.push("/content");
    }

    newFolder() {
        this.setState({
            name: "",
            source: "",
            topics: null,
            language: "",
            subfolderId: "",
            folderId: "",

            submitted: false
        });
    }

    render() {
        const { classes } = this.props
        const { sampleTopics, folders } = this.state;
        return (
            <React.Fragment>
                {this.state.submitted ? (
                    <div className={classes.form}>
                        <h4>You created successfully!</h4>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={this.newFolder}>
                            Add More
                        </Button>
                    </div>
                ) : (
                        <Card>
                        <CardHeader
                          title="Create Folder"
                          />
                        <CardContent>
                            <div>
                                <TextField
                                    label="Name"
                                    name="name"
                                    variant="outlined"
                                    margin="normal"
                                    className={classes.textField}
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Source"
                                    name="source"
                                    variant="outlined"
                                    margin="normal"
                                    className={classes.textField}
                                    value={this.state.source}
                                    onChange={this.onChangeSource}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Language"
                                    name="language"
                                    variant="outlined"
                                    margin="normal"
                                    className={classes.textField}
                                    value={this.state.language}
                                    onChange={this.onChangeLanguage}
                                />
                            </div>
                            <div>
                              <Autocomplete
                                multiple
                                id="topics-filled"
                                options={sampleTopics.map((option) => option)}
                                freeSolo
                                onChange={this.onChangeTopics}
                                renderTags={(value, getTagProps) =>
                                  value.map((option, index) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                  ))
                                }
                                renderInput={(params) => (
                                  <TextField {...params}
                                    margin="normal"
                                    variant="outlined"
                                    label="Topics"
                                    placeholder="Topics"
                                    required
                                  />
                                )}
                              />
                            </div>
                          </CardContent>
                          <CardActions>
                              <Button
                                  size="small"
                                  color="primary"
                                  variant="contained"
                                  startIcon={<SaveIcon />}
                                  onClick={this.saveFolder}>
                                  Submit
                              </Button>
                            </CardActions>
                        </Card>
                    )}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddFolder)
