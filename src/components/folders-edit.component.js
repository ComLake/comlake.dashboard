import React, { Component } from "react";
import FolderDataService from "../services/folder.service";

import { styles } from "../css-common"
import { Card, TextField, CardHeader, CardContent,
  Button, CardActions, Chip, Paper, withStyles } from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import LabelIcon from '@material-ui/icons/Label';

class Folder extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSource = this.onChangeSource.bind(this);
        this.onChangeLanguage = this.onChangeLanguage.bind(this);
        this.onChangeTopics = this.onChangeTopics.bind(this);

        this.getFolder = this.getFolder.bind(this);
        this.updateFolder = this.updateFolder.bind(this);
        this.deleteFolder = this.deleteFolder.bind(this);

        this.state = {
            currentFolder: {
                id: null,
                name: "",
                source: "",
                language: "",
                topics: []
            },
            sampleTopics: [
              "Image Classfication", "Cancer", "Wine", "GPU", "pandas", "Classfication", "Education", "Data Visualization", "numpy", "bussiness", "JSON", "CSV", "Image", "CT Scan", "X-ray", "DCOM"
            ]
        };
    }

    componentDidMount() {
        this.getFolder(this.props.match.params.id);
    }

    onChangeName(e) {
      const name = e.target.value;

      this.setState((prevState) => ({
        currentFolder: {
          ...prevState.currentFolder,
          name: name,
        },
      }));
    }

    onChangeSource(e) {
      const source = e.target.value;

      this.setState((prevState) => ({
        currentFolder: {
          ...prevState.currentFolder,
          source: source,
        },
      }));
    }

    onChangeLanguage(e) {
      const language = e.target.value;

      this.setState((prevState) => ({
        currentFolder: {
          ...prevState.currentFolder,
          language: language,
        },
      }));
    }

    onChangeTopics(e, value) {
      const topics = value;

      this.setState((prevState) => ({
        currentFolder: {
          ...prevState.currentFolder,
          topics: topics,
        },
      }));
    }

    getFolder(id) {
        FolderDataService.get(id)
            .then(response => {
                this.setState({
                    currentFolder: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateFolder() {
        var data = {
            name: this.state.currentFolder.name,
            source: this.state.currentFolder.source,
            language: this.state.currentFolder.language,
            topics: this.state.currentFolder.topics,
        };
        FolderDataService.update(
            this.state.currentFolder.id,
            data
        )
            .then(response => {
                console.log(response.data);
                this.props.history.push("/content");
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteFolder() {
        FolderDataService.delete(this.state.currentFolder.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/content')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentFolder, sampleTopics } = this.state;
        const { classes } = this.props
        console.log(currentFolder);

        return (
          <div>
            {currentFolder && (
                <Card>
                <CardHeader
                  title={"Edit Folder #" + currentFolder.id}
                  />
                <CardContent>
                    <div>
                        <TextField
                            className={classes.textField}
                            label="Name"
                            name="name"
                            variant="outlined"
                            margin="normal"
                            value={currentFolder.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Source"
                            name="source"
                            variant="outlined"
                            margin="normal"
                            className={classes.textField}
                            value={currentFolder.source}
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
                            value={currentFolder.language}
                            onChange={this.onChangeLanguage}
                        />
                    </div>
                    <Paper variant="outlined" component="ul" className={classes.chipContainer}>
                      {currentFolder.topics.map((data, index) => (
                          <li key={index}>
                            <Chip
                              icon={<LabelIcon />}
                              label={data}
                              className={classes.chip}
                            />
                          </li>
                      ))}
                    </Paper>
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
                     type="submit"
                     variant="contained"
                     color="primary"
                     className={classes.button}
                     startIcon={<SaveIcon />}
                     onClick={this.updateFolder}
                   >
                     Save
                   </Button>
                    <Button
                     color="secondary"
                     className={classes.button}
                     startIcon={<DeleteIcon />}
                     onClick={this.deleteFolder}
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

export default withStyles(styles)(Folder)
