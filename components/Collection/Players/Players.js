import React from "react";
import Link from "next/link";

import appStyles from "../../Layout/Layout.module.scss";

import cx from "classnames";

const Players = () => (
  <>
    <div>
      <h2>Players</h2>
      <p>
        With the Players Collection API, you can obtain information about a
        collection of players simultaneously.
      </p>
      <p>
        The players collection can be qualified in by a particular game, league
        or team. Each element beneath the Players Collection will be a Player
        Resource.
      </p>

      <h3>Methods</h3>

      <div className={appStyles.table}>
        <div className={cx(appStyles.header, appStyles.row)}>
          <div>Method</div>
          <div>Description</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/collection/players/fetch">players.fetch</Link>
          </div>
          <div>Retrieve information about multiple players simultaneously</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/collection/players/leagues">players.leagues</Link>
          </div>
          <div>
            Retrieve information about multiple players across multiple leagues
            simultaneously
          </div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/collection/players/team">players.team</Link>
          </div>
          <div>
            Retrieve information about multiple players across multiple teams
            simultaneously
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Players;
