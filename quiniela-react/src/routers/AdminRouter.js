import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { GamesScreen } from "../components/games/GamesScreen";

import { NavBar } from "../components/NavBar/NavBar";

export const AdminRouter = () => {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto">
        <Switch>
          <Route exact path="/admin/games-score" component={GamesScreen} />

          <Redirect to="/home" />
        </Switch>
      </div>
    </div>
  );
};
