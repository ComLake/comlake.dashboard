import React, { Component } from "react";
import GroupDataService from "../services/group.service";
import UserDataService from "../services/user.service";

import { styles } from "../css-common"
import { Card, TextField, CardHeader, CardContent,
  Button, CardActions, Paper, Chip, withStyles } from "@material-ui/core";
  import Autocomplete from '@material-ui/lab/Autocomplete';
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
            users:[],
            username: null,
        };
    }

    componentDidMount() {
        this.getGroup(this.props.match.params.id);
        this.retrieveUsers();
    }

    onChangeUsername(event, value) {
      this.setState({
        username: value.username
      });
    }

    getGroup(id) {
        GroupDataService.get(id)
            .then(response => {
                this.setState({
                    currentGroup: response.data
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

    addMember() {
        GroupDataService.addUser(
            this.state.currentGroup.id,
            this.state.username
        )
            .then(response => {
                this.props.history.push("/admin/groups");
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { users, username, currentGroup } = this.state;
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
                        <Autocomplete
                          options={users}
                          getOptionLabel={(users) => users.username}
                          style={{ width: 300 }}
                          onChange={this.onChangeUsername}
                          renderInput={(params) =>
                            <TextField {...params} margin="normal" label="Username" variant="outlined"/>
                          }
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
