import React, { Component } from "react";
import UserDataService from "../services/user.service";

import { TextField, Button, withStyles } from "@material-ui/core"
import { styles } from "../css-common"

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.onChangeAffiliation = this.onChangeAffiliation.bind(this);

        this.saveUser = this.saveUser.bind(this);
        this.newUser = this.newUser.bind(this);

        this.state = {
            id: null,
            username: "",
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            department: "",
            affiliation: "",

            submitted: false
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
      this.setState({
        password: e.target.value,
      });
    }

    onChangeFirstname(e) {
      this.setState({
        firstname: e.target.value,
      });
    }

    onChangeLastname(e) {
      this.setState({
        lastname: e.target.value,
      });
    }

    onChangeDepartment(e) {
      this.setState({
        department: e.target.value,
      });
    }

    onChangeAffiliation(e) {
      this.setState({
        affiliation: e.target.value,
      });
    }

    saveUser() {
        var data = {
            username: this.state.username,
            email: this.state.email,
            password: this.password,
            firstname: this.firstname,
            lastname: this.lastname,
            department: this.department,
            affiliation: this.affiliation
        };

        UserDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    username: response.data.username,
                    email: response.data.email,
                    password: response.data.password,
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    department: response.data.department,
                    affiliation: response.data.affiliation,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newUser() {
        this.setState({
            id: null,
            username: "",
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            department: "",
            affiliation: "",

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
                            onClick={this.newUser}>
                            Add
                        </Button>
                    </div>
                ) : (
                        <div className={classes.form}>
                            <div className={classes.textField}>
                                <TextField
                                    label="Username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    required
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    required
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    required
                                />
                            </div>

                            <div className={classes.textField}>
                              <TextField
                                label="firstname"
                                value={this.state.firstname}
                                onChange={this.onChangeFirstname}
                                name="firstname"
                              />
                            </div>

                            <div className={classes.textField}>
                              <TextField
                                label="lastname"
                                value={this.state.lastname}
                                onChange={this.onChangeLastname}
                                name="lastname"
                              />
                            </div>

                            <div className={classes.textField}>
                              <TextField
                                label="department"
                                value={this.state.department}
                                onChange={this.onChangeDepartment}
                                name="department"
                              />
                            </div>

                            <div className={classes.textField}>
                              <TextField
                                label="affiliation"
                                value={this.state.affiliation}
                                onChange={this.onChangeAffiliation}
                                name="affiliation"
                              />
                            </div>

                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={this.saveUser}>
                                Submit
                            </Button>
                        </div>
                    )}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddUser)
