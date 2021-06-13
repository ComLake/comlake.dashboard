import React, { Component } from "react";
import UserDataService from "../services/user.service";

import { styles } from "../css-common"
import { TextField, Button, withStyles } from "@material-ui/core";

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
            },
            message: ""
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
                this.setState({
                    message: "The user was updated successfully!"
                });
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
                {currentUser ? (
                    <div className={classes.form}>
                        <h2>User</h2>
                        <form>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="First Name"
                                    name="firstname"
                                    value={currentUser.firstname}
                                    onChange={this.onChangeFirstname}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Last Name"
                                    name="lastname"
                                    value={currentUser.lastname}
                                    onChange={this.onChangeLastname}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Department"
                                    name="department"
                                    value={currentUser.department}
                                    onChange={this.onChangeDepartment}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Affiliation"
                                    name="affiliation"
                                    value={currentUser.affiliation}
                                    onChange={this.onChangeAffiliation}
                                />
                            </div>
                        </form>
                        <div className={classes.buttonWrapper}>
                            <Button
                                className={`${classes.delete} ${classes.button}`}
                                onClick={this.deleteUser}
                            >
                                Delete
                            </Button>

                            <Button
                                type="submit"
                                className={`${classes.update} ${classes.button}`}
                                onClick={this.updateUser}
                            >
                                Update
                            </Button>
                        </div>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a User...</p>
                        </div>
                    )}
            </div>
        );
    }
}

export default withStyles(styles)(User)
