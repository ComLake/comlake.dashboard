import React, { Component } from "react";
import FolderDataService from "../services/folder.service";

import { Card, CardHeader, CardContent, CardActions, TextField, Button, withStyles } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';

import { styles } from "../css-common"

class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSource = this.onChangeSource.bind(this);
        this.onChangeTopics = this.onChangeTopics.bind(this);
        this.onChangeLanguage = this.onChangeLanguage.bind(this);
        this.addNewItem = this.addNewItem.bind(this);

        this.saveFolder = this.saveFolder.bind(this);
        this.newFolder = this.newFolder.bind(this);

        this.state = {
            id: null,
            name: "",
            source: "",
            topics: [],
            language: "",

            submitted: false
        };
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

    onChangeTopics(e) {
        this.setState({
            topics: e.target.value
        });
    }

    onChangeLanguage(e) {
        this.setState({
            language: e.target.value
        });
    }

    addNewItem() {
      this.setState((prevState) => ({
        topics: [...prevState.topics, this.inputElement.value],
      }));
    };

    saveFolder() {
        var data = {
            name: this.state.name,
            source: this.state.source,
            topics: this.state.topics,
            language: this.state.language
        };

        FolderDataService.create(data)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    source: response.data.source,
                    topics: response.data.topics,
                    language: response.data.language,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newFolder() {
        this.setState({
            id: null,
            name: "",
            source: "",
            topics: [""],
            language: "",

            submitted: false
        });
    }

    render() {
        const { classes } = this.props
        console.log(this.state.topics);
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
                            Add
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
                              <input type="text" ref={(el) => (this.inputElement = el)} />
                              <button onClick={this.addNewItem}> Add Item </button>
                              <ol>
                                {this.state.topics.map((subItems, sIndex) => {
                                  return <li key={subItems + sIndex}> {subItems}</li>;
                                })}
                              </ol>

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
