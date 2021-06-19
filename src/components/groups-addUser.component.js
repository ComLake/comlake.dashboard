import React, { Component } from "react";
import GroupDataService from "../services/group.service";

import { styles } from "../css-common"
import { Card, Typography, TextField, CardHeader, CardContent,
  Button, CardActions, Paper, Chip, withStyles } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import FaceIcon from '@material-ui/icons/Face';

class GroupAddUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.getGroup = this.getGroup.bind(this);
        this.addMember = this.addMember.bind(this);

        this.state = {
            currentGroup: {
                id: null,
                users: [],
            },
            groupId: null,
            username: null,
        };
    }

    componentDidMount() {
        this.getGroup(this.props.match.params.id);
    }

    onChangeUsername(e) {
      this.setState({
        username: e.target.value
      });
    }

    getGroup(id) {
        GroupDataService.get(id)
            .then(response => {
                this.setState({
                    currentGroup: response.data,
                    groupId: response.data.id
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    addMember() {
        GroupDataService.addUser(
            this.state.groupId,
            this.state.username
        )
            .then(response => {
                this.props.history.push("/groups");
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { groupId, username, currentGroup } = this.state;
        const { classes } = this.props
        console.log(groupId);
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
                            disabled
                        />
                    </div>
                    <Paper variant="outlined" component="ul" className={classes.chipContainer}>
                      {currentGroup.users.map((data, index) => (
                          <li key={index}>
                            <Chip
                              icon={<FaceIcon />}
                              label={data.username}
                              className={classes.chip}
                            />
                          </li>
                      ))}
                    </Paper>
                    <div>
                        <TextField
                            className={classes.textField}
                            label="Username"
                            name="username"
                            variant="outlined"
                            margin="normal"
                            onChange={this.onChangeUsername}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                     type="submit"
                     variant="contained"
                     color="primary"
                     className={classes.button}
                     startIcon={<AddIcon />}
                     onClick={this.addMember}
                   >
                     Add
                   </Button>
                </CardActions>
                </Card>
            )}
          </div>
        );
    }
}

export default withStyles(styles)(GroupAddUser)
