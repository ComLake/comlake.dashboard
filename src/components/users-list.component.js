import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveUsers,
  findUsersByUsername,
} from "../actions/users";
import { Link } from "react-router-dom";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.findByUsername = this.findByUsername.bind(this);

    this.state = {
      currentUser: null,
      currentIndex: -1,
      searchUsername: "",
    };
  }

  componentDidMount() {
    this.props.retrieveUsers();
  }

  onChangeSearchUsername(e) {
    const searchUsername = e.target.value;

    this.setState({
      searchUsername: searchUsername,
    });
  }

  refreshData() {
    this.setState({
      currentUser: null,
      currentIndex: -1,
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index,
    });
  }

  findByUsername() {
    this.refreshData();

    this.props.findUsersByUsername(this.state.searchUsername);
  }

  render() {
    const { searchUsername, currentUser, currentIndex } = this.state;
    const { users } = this.props;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchUsername}
              onChange={this.onChangeSearchUsername}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByUsername}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Users List</h4>

          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                  key={index}
                >
                  {user.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <h4>User</h4>
              <div>
                <label>
                  <strong>Username:</strong>
                </label>{" "}
                {currentUser.title}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentUser.email}
              </div>
              <div>
                <label>
                  <strong>First name:</strong>
                </label>{" "}
                {currentUser.firstname}
              </div>
              <div>
                <label>
                  <strong>Last name:</strong>
                </label>{" "}
                {currentUser.lastname}
              </div>
              <div>
                <label>
                  <strong>Department:</strong>
                </label>{" "}
                {currentUser.department}
              </div>
              <div>
                <label>
                  <strong>Affiliation:</strong>
                </label>{" "}
                {currentUser.affiliation}
              </div>
              <Link
                to={"/users/" + currentUser.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a User...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps, {
  retrieveUsers,
  findUsersByUsername,
})(UsersList);
