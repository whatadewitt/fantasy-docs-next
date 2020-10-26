import React from "react";
import Link from "next/link";

import appStyles from "../../Layout/Layout.module.scss";

import cx from "classnames";

const Game = () => (
  <>
    <div>
      <h2>Roster</h2>
      <p>
        Players on a team are organized into rosters corresponding to certain
        weeks, in NFL, or certain dates, in MLB, NBA, and NHL. Each player on a
        roster will be assigned a position if they're in the starting lineup, or
        will be on the bench. You can only receive credit for stats accumulated
        by players in your starting lineup.
      </p>
      <p>
        <em>
          <strong>TODO:</strong> PUT functionality to update rosters
        </em>
      </p>

      <h3>Methods</h3>

      <div className={appStyles.table}>
        <div className={cx(appStyles.header, appStyles.row)}>
          <div>Method</div>
          <div>Description</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/roster/players">roster.players</Link>
          </div>
          <div>Retrieve the list of players on a specific team.</div>
        </div>
      </div>
    </div>
  </>
);

export default Game;
