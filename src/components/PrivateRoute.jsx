import React from "react";
import { Route, Redirect } from "react-router-dom";
import { tokenInLocalStorage } from "../util/tokenInLocalStorage";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return tokenInLocalStorage() ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};
