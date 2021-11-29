import React from "react";
import PropTypes from "prop-types";

import { Route, Redirect } from "react-router-dom";

export const AdminRoute = ({ role, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        role === "admin" ? <Component {...props} /> : <Redirect to="/home" />
      }
    />
  );
};

AdminRoute.propTypes = {
  role: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};
