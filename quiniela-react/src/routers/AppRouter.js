import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { AuthRouter } from "./AuthRouter";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { loginAction } from "../actions/auth";
import { PoolRouter } from "./PoolRouter";
import { getUserData } from "../actions/user";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoaggedIn] = useState(false);
  useEffect(() => {
    const tokens = localStorage.getItem("tokens");
    if (tokens !== null && tokens !== undefined) {
      dispatch(loginAction(JSON.parse(tokens)));
      dispatch(getUserData()).then(() => {
        setIsLoaggedIn(true);
        setChecking(false);
      });
    } else {
      setIsLoaggedIn(false);
      setChecking(false);
    }
  }, [dispatch, setChecking, setIsLoaggedIn]);

  if (checking) {
    return <h1>Esperando...</h1>;
  }

  return (
    <div>
      <Router>
        <div>
          <Switch>
            <PublicRoute
              isAuthenticated={isLoggedIn}
              path="/auth"
              component={AuthRouter}
            />

            <PrivateRoute
              path="/"
              component={PoolRouter}
              isAuthenticated={isLoggedIn}
            />

            <Redirect to="/auth/login" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
