import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { HomeScreen } from "../components/home/HomeScreen";
import { NavBar } from "../components/NavBar/NavBar";

export const PoolRouter = () => {
  return (
    <div>
      <NavBar />
      <div className="container">
        <Switch>
          <Route exact path="/home" component={HomeScreen} />

          <Redirect to="/home" />
        </Switch>
      </div>
    </div>
  );
};
