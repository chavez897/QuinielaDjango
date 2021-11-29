import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { EnrolledLeagueScreen } from "../components/EnrolledLeague/EnrolledLeagueScreen";

import { HomeScreen } from "../components/home/HomeScreen";
import { LeaguesScreen } from "../components/league/LeaguesScreen";
import { NavBar } from "../components/NavBar/NavBar";

export const PoolRouter = () => {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto">
        <Switch>
          <Route exact path="/home" component={HomeScreen} />
          <Route exact path="/leagues" component={LeaguesScreen} />
          <Route
            exact
            path="/league/:league"
            component={EnrolledLeagueScreen}
          />

          <Redirect to="/home" />
        </Switch>
      </div>
    </div>
  );
};
