import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUser, deleteUser } from "../actions/users";
import UserDataService from "../services/user.service";

class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeAffiliation = this.onChangeAffiliation.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeUser = this.removeUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
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

  onChangeFirstname(e) {
    const firstname = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        firstname: firstname,
      },
    }));
  }

  onChangeLastname(e) {
    const lastname = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          lastname: lastname,
        },
      };
    });
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
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  value={currentUser.firstname}
                  onChange={this.onChangeFirstname}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  value={currentUser.lastname}
                  onChange={this.onChangeLastname}
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  className="form-control"
                  id="department"
                  value={currentUser.department}
                  onChange={this.onChangeDepartment}
                />
              </div>

              <div className="form-group">
                <label htmlFor="affiliation">Affiliation</label>
                <input
                  type="text"
                  className="form-control"
                  id="affiliation"
                  value={currentUser.affiliation}
                  onChange={this.onChangeAffiliation}
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
