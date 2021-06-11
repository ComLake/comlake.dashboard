import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUser, deleteUser } from "../actions/users";
import UserDataService from "../services/user.service";

class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeUser = this.removeUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        department: "",
        affiliation: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeUser(e) {
    const username = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          username: username,
        },
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        email: email,
      },
    }));
  }

  getUser(id) {
    UserDataService.get(id)
      .then((response) => {
        this.setState({
          currentUser: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // updateStatus(status) {
  //   var data = {
  //     id: this.state.currentUser.id,
  //     username: this.state.currentUser.username,
  //     email: this.state.currentUser.email,
  //     firstname: this.state.currentUser.firstname,
  //     lastname: this.state.currentUser.lastname,
  //     department:	this.state.currentUser.department,
  //     affiliation: this.state.currentUser.affiliation,
  //   };
  //
  //   this.props
  //     .updateUser(this.state.currentUser.id, data)
  //     .then((reponse) => {
  //       console.log(reponse);
  //
  //       this.setState((prevState) => ({
  //         currentUser: {
  //           ...prevState.currentUser,
  //           published: status,
  //         },
  //       }));
  //
  //       this.setState({ message: "The status was updated successfully!" });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  updateContent() {
    this.props
      .updateUser(this.state.currentUser.id, this.state.currentUser)
      .then((reponse) => {
        console.log(reponse);

        this.setState({ message: "The user was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeUser() {
    this.props
      .deleteUser(this.state.currentUser.id)
      .then(() => {
        this.props.history.push("/users");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User</h4>
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={currentUser.username}
                  onChange={this.onChangeUser}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentUser.email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  value={currentUser.firstname}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  value={currentUser.lastname}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  className="form-control"
                  id="department"
                  value={currentUser.department}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label htmlFor="affiliation">Affiliation</label>
                <input
                  type="text"
                  className="form-control"
                  id="affiliation"
                  value={currentUser.affiliation}
                  onChange={this.onChangeEmail}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeUser}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
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

export default connect(null, { updateUser, deleteUser })(User);
