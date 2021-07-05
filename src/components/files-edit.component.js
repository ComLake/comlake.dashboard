import React, { Component } from "react";
import FileDataService from "../services/file.service";

import { styles } from "../css-common"
import { Card, TextField, CardHeader, CardContent,
  Button, CardActions, Chip, Paper, withStyles } from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import LabelIcon from '@material-ui/icons/Label';

class FileEdit extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSource = this.onChangeSource.bind(this);
        this.onChangeLanguage = this.onChangeLanguage.bind(this);
        this.onChangeTopics = this.onChangeTopics.bind(this);

        this.getFile = this.getFile.bind(this);
        this.updateFile = this.updateFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);

        this.state = {
            currentFile: {
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
        this.getFile(this.props.match.params.id);
    }

    onChangeName(e) {
      const name = e.target.value;

      this.setState((prevState) => ({
        currentFile: {
          ...prevState.currentFile,
          name: name,
        },
      }));
    }

    onChangeSource(e) {
      const source = e.target.value;

      this.setState((prevState) => ({
        currentFile: {
          ...prevState.currentFile,
          source: source,
        },
      }));
    }

    onChangeLanguage(e) {
      const language = e.target.value;

      this.setState((prevState) => ({
        currentFile: {
          ...prevState.currentFile,
          language: language,
        },
      }));
    }

    onChangeTopics(e, value) {
      const topics = value;

      this.setState((prevState) => ({
        currentFile: {
          ...prevState.currentFile,
          topics: topics,
        },
      }));
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

    updateFile() {
        var data = {
            name: this.state.currentFile.name,
            source: this.state.currentFile.source,
            language: this.state.currentFile.language,
            topics: this.state.currentFile.topics,
        };
        FileDataService.update(
            this.state.currentFile.id,
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
        const { currentFile, sampleTopics } = this.state;
        const { classes } = this.props
        console.log(currentFile);

        return (
          <div>
            {currentFile && (
                <Card>
                <CardHeader
                  title={"Edit File #" + currentFile.id}
                  />
                <CardContent>
                    <div>
                        <TextField
                            className={classes.textField}
                            label="Name"
                            name="name"
                            variant="outlined"
                            margin="normal"
                            value={currentFile.name}
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
                            value={currentFile.source}
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
                            value={currentFile.language}
                            onChange={this.onChangeLanguage}
                        />
                    </div>
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
                     onClick={this.updateFile}
                   >
                     Save
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

export default withStyles(styles)(FileEdit)
