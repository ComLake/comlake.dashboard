import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserDataService from "../services/user.service";
// import clsx from 'clsx';
import { styles } from "../css-common";
import { Button, Typography, Container, Paper, TextField, Grid, Box, withStyles } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeAffiliation = this.onChangeAffiliation.bind(this);
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: {
                      firstname: "",
                      lastname: "",
                      department: "",
                      affiliation: "",
                    }
    };
  }

  componentDidMount() {
    const currentUser = UserDataService.getCurrentUser()
      .then(response => {
          this.setState({
              currentUser: response.data
          });
          console.log(response.data);
      })
      .catch(e => {
          console.log(e);
      });

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
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

  updateUser() {
      UserDataService.update(
          this.state.currentUser.id,
          this.state.currentUser
      )
          .then(response => {
              console.log(response.data);
              window.location.reload();
          })
          .catch(e => {
              console.log(e);
          });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const { currentUser } = this.state;
    const { classes } = this.props;
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <Container maxWidth="lg" className={classes.container}>
        {(this.state.userReady) ?
        <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Edit Profile
            </Typography>

            <TextField
                fullWidth
                label="Username"
                name="username"
                variant="outlined"
                margin="normal"
                value={currentUser.username}
                disabled
            />
            <TextField
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                margin="normal"
                value={currentUser.email}
                disabled
            />
            <TextField
                label="First Name"
                name="firstname"
                variant="outlined"
                margin="normal"
                fullWidth
                value={currentUser.firstname}
                onChange={this.onChangeFirstname}
            />
            <TextField
                fullWidth
                label="Last Name"
                name="lastname"
                variant="outlined"
                margin="normal"
                value={currentUser.lastname}
                onChange={this.onChangeLastname}
            />
            <TextField
                fullWidth
                label="Department"
                name="department"
                variant="outlined"
                margin="normal"
                value={currentUser.department}
                onChange={this.onChangeDepartment}
            />
            <TextField
                fullWidth
                label="Affiliation"
                name="affiliation"
                variant="outlined"
                margin="normal"
                value={currentUser.affiliation}
                onChange={this.onChangeAffiliation}
            />
            <Box textAlign='center'>
              <Button
               type="submit"
               variant="contained"
               color="primary"
               className={classes.button}
               startIcon={<SaveIcon />}
               onClick={this.updateUser}
             >
               Update Profile
             </Button>
             </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>:
        null}
      </Container>
    );
  }
}

export default withStyles(styles)(Profile);
