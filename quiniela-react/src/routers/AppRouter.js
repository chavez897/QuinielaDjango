import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { AuthRouter } from "./AuthRouter";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { loginAction } from "../actions/auth";
import { PoolRouter } from "./PoolRouter";
import { getUserData } from "../actions/user";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { getCurrentWeek } from "../actions/currentWeek";
import { AdminRoute } from "./AdminRoute";
import { AdminRouter } from "./AdminRouter";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    if (access !== null && access !== undefined) {
      dispatch(loginAction(access, refresh));
      dispatch(getCurrentWeek())
        .then(() => {})
        .catch(() => {
          setChecking(false);
        });
      dispatch(getUserData())
        .then(() => {
          setChecking(false);
        })
        .catch(() => {
          setChecking(false);
        });
    } else {
      setChecking(false);
    }
  }, [dispatch, setChecking]);

  if (checking) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Router>
        <div>
          <Switch>
            <PublicRoute
              isAuthenticated={!!user.username}
              path="/auth"
              component={AuthRouter}
            />

            <AdminRoute
              role={
                user.userprofile === undefined ||
                user.userprofile.role === undefined
                  ? ""
                  : user.userprofile.role
              }
              path="/admin"
              component={AdminRouter}
            />

            <PrivateRoute
              path="/"
              component={PoolRouter}
              isAuthenticated={!!user.username}
            />

            <Redirect to="/auth/login" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
