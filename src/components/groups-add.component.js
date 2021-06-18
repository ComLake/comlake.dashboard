import React, { Component } from "react";
import GroupDataService from "../services/user.service";

import { FormControl, Card, CardHeader, CardContent, CardActions, TextField, Button, withStyles } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';

import { styles } from "../css-common"

class AddGroup extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);

        this.saveGroup = this.saveGroup.bind(this);
        this.newGroup = this.newGroup.bind(this);

        this.state = {
            id: null,
            name: "",

            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    saveGroup() {
        var data = {
            name: this.state.name
        };

        GroupDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newGroup() {
        this.setState({
            id: null,
            name: "",

            submitted: false
        });
    }

    render() {
        const { classes } = this.props

        return (
            <React.Fragment>
                {this.state.submitted ? (
                    <div className={classes.form}>
                        <h4>You submitted successfully!</h4>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={this.newGroup}>
                            Add
                        </Button>
                    </div>
                ) : (
                        <Card>
                        <CardHeader
                          title="Create Group"
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
                          </CardContent>
                          <CardActions>
                              <Button
                                  size="small"
                                  color="primary"
                                  variant="contained"
                                  startIcon={<SaveIcon />}
                                  onClick={this.saveGroup}>
                                  Submit
                              </Button>
                            </CardActions>
                        </Card>
                    )}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddGroup)
