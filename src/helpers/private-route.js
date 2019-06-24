import React from 'react';
import { Route,  Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authenticate = true;
  return (
    <Route
      {...rest}
      render={props =>
        authenticate ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;