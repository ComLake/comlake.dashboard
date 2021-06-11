import React, { Component } from "react";
import { connect } from "react-redux";
import { createUser } from "../actions/users";

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

      submitted: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
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
    const { username, email, password, firstname, lastname, department, affiliation } = this.state;

    this.props
      .createUser(username, email, password, firstname, lastname, department, affiliation)
      .then((data) => {
        this.setState({
          id: data.id,
          username: data.username,
          email: data.email,
          password: data.password,
          firstname: data.firstname,
          lastname: data.lastname,
          department: data.department,
          affiliation: data.affiliation,

          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
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

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                required
                value={this.state.username}
                onChange={this.onChangeUsername}
                name="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
                name="password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                value={this.state.firstname}
                onChange={this.onChangeFirstname}
                name="firstname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                value={this.state.lastname}
                onChange={this.onChangeLastname}
                name="lastname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                className="form-control"
                id="department"
                required
                value={this.state.department}
                onChange={this.onChangeDepartment}
                name="department"
              />
            </div>

            <div className="form-group">
              <label htmlFor="affiliation">Affiliation</label>
              <input
                type="text"
                className="form-control"
                id="affiliation"
                required
                value={this.state.affiliation}
                onChange={this.onChangeAffiliation}
                name="affiliation"
              />
            </div>

            <button onClick={this.saveUser} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createUser })(AddUser);
