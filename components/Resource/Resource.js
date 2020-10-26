import React from "react";
import { Switch, Route } from "react-router-dom";
import Changelog from "../Changelog/Changelog";
import Game from "./Game/Game";

const Resource = () => {
  return (
    <Switch>
      <Route path="/resource/game">
        <Game />
      </Route>

      <Route path="/resource/league">
        <Changelog />
      </Route>

      <Route path="/resource/player">
        <Changelog />
      </Route>

      <Route path="/resource/roster">
        <Changelog />
      </Route>

      <Route path="/resource/team">
        <Changelog />
      </Route>

      <Route path="/resource/transaction">
        <Changelog />
      </Route>

      <Route path="/resource/user">
        <Changelog />
      </Route>
    </Switch>
  );
};

export default Resource;
