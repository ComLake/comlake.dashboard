import React, { Component } from "react";
import UserDataService from "../services/user.service";

import { styles } from "../css-common"
import { Card, TextField, CardHeader, CardContent,
  Button, CardActions, withStyles } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

class User extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.onChangeAffiliation = this.onChangeAffiliation.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            currentUser: {
                id: null,
                firstname: "",
                lastname: "",
                department: "",
                affiliation: "",
            }
        };
    }

    componentDidMount() {
        this.getUser(this.props.match.params.id);
    }

    onChangeFirstname(e) {
        const firstname = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    firstname: firstname
                }
            };
        });
    }

    onChangeLastname(e) {
        const lastname = e.target.value;

        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                lastname: lastname
            }
        }));
    }

    onChangeDepartment(e) {
      const department = e.target.value;

      this.setState((prevState) => ({
        currentUser: {
          ...prevState.currentUser,
          department: department,
        },
      }));
    }

    onChangeAffiliation(e) {
      const affiliation = e.target.value;

      this.setState((prevState) => ({
        currentUser: {
          ...prevState.currentUser,
          affiliation: affiliation,
        },
      }));
    }

    getUser(id) {
        UserDataService.get(id)
            .then(response => {
                this.setState({
                    currentUser: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateUser() {
        UserDataService.update(
            this.state.currentUser.id,
            this.state.currentUser
        )
            .then(response => {
                console.log(response.data);
                this.props.history.push("/users");
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteUser() {
        UserDataService.delete(this.state.currentUser.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/users')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentUser } = this.state;
        const { classes } = this.props

        return (
          <div>
            {currentUser && (
                <Card>
                <CardHeader
                  title={"Edit User #" + currentUser.id}
                  />
                <CardContent>
                    <div>
                      <TextField
                          className={classes.textField}
                          name="username"
                          variant="outlined"
                          margin="normal"
                          value={currentUser.username}
                          disabled
                      />
                    </div>
                    <div>
                      <TextField
                          className={classes.textField}
                          name="email"
                          variant="outlined"
                          margin="normal"
                          value={currentUser.email}
                          disabled
                      />
                    </div>
                    <div>
                        <TextField
                            className={classes.textField}
                            label="First Name"
                            name="firstname"
                            variant="outlined"
                            margin="normal"
                            value={currentUser.firstname}
                            onChange={this.onChangeFirstname}
                        />
                    </div>
                    <div>
                        <TextField
                            className={classes.textField}
                            label="Last Name"
                            name="lastname"
                            variant="outlined"
                            margin="normal"
                            value={currentUser.lastname}
                            onChange={this.onChangeLastname}
                        />
                    </div>
                    <div>
                        <TextField
                            className={classes.textField}
                            label="Department"
                            name="department"
                            variant="outlined"
                            margin="normal"
                            value={currentUser.department}
                            onChange={this.onChangeDepartment}
                        />
                    </div>
                    <div>
                        <TextField
                            className={classes.textField}
                            label="Affiliation"
                            name="affiliation"
                            variant="outlined"
                            margin="normal"
                            value={currentUser.affiliation}
                            onChange={this.onChangeAffiliation}
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
                     onClick={this.updateUser}
                   >
                     Save
                   </Button>
                    <Button
                     color="secondary"
                     className={classes.button}
                     startIcon={<DeleteIcon />}
                     onClick={this.deleteUser}
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

export default withStyles(styles)(User)
