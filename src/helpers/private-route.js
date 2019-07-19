import React,{ useContext } from 'react';
import { Route,  Redirect } from "react-router-dom";
import {AppContext} from "../components/App/AppProvider";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
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