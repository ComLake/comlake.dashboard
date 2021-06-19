import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={props => {
        if (localStorage.getItem('user')) {
          return <Component {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/login',
              state:
              {
                from: props.location
              }
            }} />
        }
      }}
      />
    );
  }
}

export default PrivateRoute;
