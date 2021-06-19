import React, { Component } from "react";
import GroupDataService from "../services/group.service";

import { styles } from "../css-common"
import { Card, Typography, TextField, CardHeader, CardContent,
  Button, CardActions, withStyles } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

class GroupAddUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.getGroup = this.getGroup.bind(this);

        this.state = {
            currentGroup: {
                id: null,
                name: "",
            }
        };
    }

    componentDidMount() {
        this.getGroup(this.props.match.params.id);
    }

    onChangeName(e) {
      const name = e.target.value;

      this.setState((prevState) => ({
        currentGroup: {
          ...prevState.currentGroup,
          name: name,
        },
      }));
    }

    getGroup(id) {
        GroupDataService.get(id)
            .then(response => {
                this.setState({
                    currentGroup: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateGroup() {
        GroupDataService.update(
            this.state.currentGroup.id,
            this.state.currentGroup
        )
            .then(response => {
                console.log(response.data);
                this.props.history.push("/groups");
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentGroup } = this.state;
        const { classes } = this.props

        return (
          <div>
            {currentGroup && (
                <Card>
                <CardHeader
                  title={"Add Member to Group #" + currentGroup.id}
                  />
                <CardContent>
                    <div>
                        <TextField
                            className={classes.textField}
                            label="Name"
                            name="name"
                            variant="outlined"
                            margin="normal"
                            value={currentGroup.name}
                            onChange={this.onChangeName}
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
                     onClick={this.updateGroup}
                   >
                     Save
                   </Button>
                </CardActions>
                </Card>
            )}
          </div>
        );
    }
}

export default withStyles(styles)(GroupAddUser)
